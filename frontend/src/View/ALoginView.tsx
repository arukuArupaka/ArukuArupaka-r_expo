import React, { useEffect, useState } from 'react';
import {Alert,Text, View,Image, TouchableOpacity,TextInput, KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,deleteUser,onAuthStateChanged,signOut,sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { handleLoginAction } from "../redux/actions/userAction";
import { useDispatch ,useSelector} from "react-redux";

const ALoginView = (props) => {

  const [isCreateAcount,setIsCreateAcount]=useState(true)
  const [isLogin,setIsLogin]=useState(false)
  const [isResetPass,setIsResetPass]=useState(false)
  const [userInfo,setUserInfo]=useState()
  const [showResendRegisterBotton,setShowResendRegisterBotton]=useState(false)
  const [showRegisterBotton,setShowRegisterBotton]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')
  const [authMail,setAuthMail]=useState('')
  const [authPass,setAuthPass]=useState('')

  const dispatch = useDispatch();
  const loginAfterPageName=useSelector((state)=>state.common.loginAfterPageName)

    const [showCreateAccount,setShowCreateAccount]=useState(false)

    const onPressBackHome = () => {
        Alert.alert(
            'アカウントは作成されていません', 
            '送られたメールからアカウントを認証してください。',
        [
            {
            text: '登録を続ける',
            onPress: () => {},
            style: 'cancel',
            },
            {text: 'HOME画面に戻る', onPress: () => props.navigation.navigate('Home')},
        ]);
    };

    const pleaseReLogin=()=>{
      Alert.alert(
        'パスワード再設定メールを送信しました。', 
        'パスワードを再設定してログインしてください。',
    [
        {text: 'OK', onPress: () => switchLogin()},
    ]);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = async () => {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        setAuthMail(email)
        setAuthPass(password)
        await setUserInfo(user)
        setShowResendRegisterBotton(true)
        setShowRegisterBotton(true)

        await sendEmailVerification(user.user);

        //props.navigation.navigate('Home')
      } catch (error) {
        console.log(error.message);
        switch (error.message){
          case "Firebase: Error (auth/email-already-in-use).":
            setErrorMessage("このアカウントは登録されいます。ログインしてください。")
            break;
          case "Firebase: Error (auth/invalid-credential).":
            setErrorMessage("メールアドレスまたはパスワードが間違えています。")
            break;
          case "Firebase: Error (auth/invalid-email).":
            setErrorMessage("メールアドレスを入力してください。")
          default:
            break
        }
      }
    };

    const handleLogin = async () => {
      try {
        const user=await signInWithEmailAndPassword(auth, email, password);
        setUserInfo(user)
        if(await isMailVerified()){
          await dispatch(handleLoginAction(await isMailVerified()))
          console.log('ここにだす')
          console.log(await loginAfterPageName)
          if(await loginAfterPageName){
            await props.navigation.navigate('settingsToPage')
          }else{
          await props.navigation.navigate('settings')
          }
        }else{
          pleaseValidateMailDialog()
        }
      } catch (error) {
        console.log(error.message);
        switch (error.message){
          case "Firebase: Error (auth/email-already-in-use).":
            setErrorMessage("このアカウントは登録されいます。ログインしてください。")
            break;
          case "Firebase: Error (auth/invalid-credential).":
            setErrorMessage("メールアドレスまたはパスワードが間違えています。")
            break;
          case "Firebase: Error (auth/invalid-email).":
            setErrorMessage("メールアドレスを入力してください。")
          default:
            break
        }
      }
    };

    const pleaseValidateMailDialog = () => {
      Alert.alert(
          'まだアカウントは作成されていません。', 
          'メールに送付されたリンクをクリックしてください。メールが届かない場合は再送信してください。',
      [
        {text: 'OK', onPress: () =>{}},
        {text:'メールを再送信',onPress:()=>setdRegisterMail()}
      ]);
    };
    
    const changePageDialog = () => {
      Alert.alert(
          'メールアドレスを認証できました。', 
          'ありがとうございます。引き続きご利用ください。',
      [
        {text: 'OK', onPress: () => {
          if(loginAfterPageName){
            props.navigation.navigate('settingsToPage')
          }else{
          props.navigation.navigate('settings')
          }
        }},
      ]);
    };

    const switchLogin=()=>{
      setIsCreateAcount(false);
      setIsResetPass(false)
      setIsLogin(true)
      setErrorMessage('')
    }

    const switchCreateAccount=()=>{
      setIsResetPass(false)
      setIsLogin(false)
      setIsCreateAcount(true);
      setErrorMessage('')

    }

    const switchResetPassWord=()=>{
      setIsLogin(false)
      setIsCreateAcount(false);
      setIsResetPass(true)
      setErrorMessage('')

    }
    const setdRegisterMail=async()=>{
      //console.log(userInfo)
      if(userInfo.user){
        await sendEmailVerification(userInfo.user);
      }else{
        
      }

    }

    const isMailVerified=async()=>{
      let result
      const unsubscribe = await onAuthStateChanged(auth, (user) => {
        result=user.emailVerified
      });
      unsubscribe();
      return result
    }

    const signOUt=()=>{
      signOut(auth)
      .then(() => {
       })
      .catch((error) => {
        console.log(error.message);
      });
    }

    const completeCreateAccount=async()=>{
      try {
        await signOUt()
        await signInWithEmailAndPassword(auth, authMail, authPass);
        const unsubscribe = await onAuthStateChanged(auth, (user) => {
          if (user.emailVerified) {
            changePageDialog()

          }else{
            pleaseValidateMailDialog()
          }
        });
        unsubscribe();
        
      } catch (error) {
          console.log(error)
          setErrorMessage("申し訳ありません。予期しないエラーが発生しました。時間を空けて再度行ってください。")
        }
      }

      const passwordReset = () => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            pleaseReLogin()
          })
          .catch((error) => {
            switch (error.message){
              case "Firebase: Error (auth/email-already-in-use).":
                setErrorMessage("このアカウントは登録されいます。ログインしてください。")
                break;
              case "Firebase: Error (auth/invalid-credential).":
                setErrorMessage("メールアドレスまたはパスワードが間違えています。")
                break;
              case "Firebase: Error (auth/invalid-email).":
                setErrorMessage("メールアドレスを入力してください。")
              default:
                break
            }
          });
      };
    

    
  return (
    <View
      style={{
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center',
        height:'100%',
        backgroundColor:'#FFFFFF'
      }}>
        <TouchableOpacity
          onPress={()=>onPressBackHome()}
          style={{
            position:'absolute',
            top:70,
            left:30,
            backgroundColor:'#D9D9D9',
            borderRadius:50,
            height:40,
            width:40,
          }}
        >
          <Ionicons name="arrow-back" style={{marginVertical:6,color:'white',textAlign:'center'}} size={24} color="black" />
        </TouchableOpacity>
        <View style={{
            marginBottom:30
        }}>
            {isCreateAcount&&<Text style={{textAlign:'center',fontWeight:'800',fontSize:20,paddingBottom:50}}>アカウント作成</Text>}
            {isLogin&&<Text style={{textAlign:'center',fontWeight:'800',fontSize:20,paddingBottom:50}}>ログイン</Text>}
            {isResetPass&&<Text style={{textAlign:'center',fontWeight:'800',fontSize:20,paddingBottom:50}}>パスワードの再設定</Text>}
            <Image style={{height:150,width:150,borderRadius:100}} source={require('../image/logo/icon-1024.png')}></Image>
        </View>
        <View style={{backgroundColor:'#EEEEEE',width:'80%',padding:20,borderRadius:10}}>
            <Text>ログインすることでできること</Text>
            <Text>・マップで友達と位置情報が共有できる</Text>
            <Text>・マップで施設の情報を自由に編集できる</Text>
            <Text>・Ritsu-Matchの機能を利用できる</Text>
            <Text>・教科書フリマが使用できるようになる</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom:20,marginHorizontal:30}}>
        {isCreateAcount&&<TouchableOpacity style={{flex:1}} onPress={switchLogin}><Text style={{textAlign:'center',color:'#C8252B'}}>ログインはこちら</Text></TouchableOpacity>}
        {(isLogin||isResetPass)&&<TouchableOpacity style={{flex:1}} onPress={switchCreateAccount}><Text style={{textAlign:'center',color:'#C8252B'}}>アカウント作成</Text></TouchableOpacity>}
        {(isLogin||isResetPass)&&<TouchableOpacity style={{flex:1}} onPress={switchResetPassWord}><Text style={{textAlign:'center',color:'#C8252B'}}>パスワードのリセット</Text></TouchableOpacity>}
        </View>
        <TouchableOpacity
            onPress={()=>setShowCreateAccount(true)}
        >
            <Text style={{}}>さあ、あなたも！</Text>
            <Fontisto style={{textAlign:'center'}} name="angle-down" size={40} color="black" />
        </TouchableOpacity>
        {errorMessage&&<Text style={{color:'red',fontSize:10}}>{errorMessage}</Text>}
        {showCreateAccount&&isCreateAcount&&<KeyboardAvoidingView style={{width:'80%'}} behavior="padding"><View style={{backgroundColor:'#EEEEEE',borderRadius:10,marginBottom:5,padding:20}}>
                <Text>メールアドレスを入力</Text>
                <View style={{flexDirection:'row'}}>
                  <TextInput style={{
                      flex:1,
                      borderBottomWidth:1,
                      marginTop:5,
                      borderRadius:5,
                      marginBottom:5}}
                      value={email}
                      onChangeText={setEmail}
                      autoCorrect={false}
                      autoCapitalize="none"
                      ></TextInput>
                      <Text style={{width:130}}>@ed.ritsumei.ac.jp</Text>
                    </View>
                <Text>パスワードを入力 (6文字以上)</Text>
                <TextInput style={{
                    borderBottomWidth:1,
                    marginTop:5,
                    borderRadius:5,
                    marginBottom:5}}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    ></TextInput>
            </View>
                {showResendRegisterBotton&&<TouchableOpacity onPress={setdRegisterMail} style={{marginBottom:5}}>
                  <Text style={{textAlign:'center',color:'#C8252B'}}>メールを再送信</Text>
                </TouchableOpacity>}
                {/* {showRegisterBotton&&<TouchableOpacity onPress={setdRegisterMail} style={{marginBottom:5}}>
                  <Text style={{textAlign:'center',color:'#C8252B'}}>メールを認証したらクリック</Text>
                </TouchableOpacity>} */}
                {!showRegisterBotton?<TouchableOpacity disabled={!email || !password} style={{
                  marginTop:20,
                  backgroundColor:(email&&password.length>=6)?'#C8252B':'#FFAFB2',
                  padding:5,
                  borderRadius:5}} onPress={handleRegister}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>確認メールを送信</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={completeCreateAccount} style={{
                  marginTop:20,
                  backgroundColor:(email&&password.length>=6)?'#C8252B':'#FFAFB2',
                  padding:5,
                  borderRadius:5
                }}>
                  <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>メールを認証したらクリック</Text>
                </TouchableOpacity>}
            </KeyboardAvoidingView>
            }
            {showCreateAccount&&isLogin&&<KeyboardAvoidingView style={{width:'80%'}} behavior="padding"><View style={{backgroundColor:'#EEEEEE',borderRadius:10,marginBottom:20,padding:20}}>
                <Text>メールアドレスを入力</Text>
                <View style={{flexDirection:'row'}}>
                  <TextInput style={{
                      flex:1,
                      borderBottomWidth:1,
                      marginTop:5,
                      borderRadius:5,
                      marginBottom:5}}
                      value={email}
                      onChangeText={setEmail}
                      autoCorrect={false}
                      autoCapitalize="none"
                      ></TextInput>
                      <Text style={{width:130}}>@ed.ritsumei.ac.jp</Text>
                    </View>
                <Text>パスワードを入力 (6文字以上)</Text>
                <TextInput style={{
                    borderBottomWidth:1,
                    marginTop:5,
                    borderRadius:5,
                    marginBottom:5}}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    ></TextInput>
            </View>
                <TouchableOpacity disabled={!email || !password} style={{
                  backgroundColor:(email&&password.length>=6)?'#C8252B':'#FFAFB2',
                  padding:5,
                  borderRadius:5
                  }} onPress={handleLogin}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>ログイン</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            }
            {showCreateAccount&&isResetPass&&<KeyboardAvoidingView style={{width:'80%'}} behavior="padding"><View style={{backgroundColor:'#EEEEEE',borderRadius:10,marginBottom:20,padding:20}}>
                <Text>メールアドレスを入力</Text>
                <View style={{flexDirection:'row'}}>
                  <TextInput style={{
                      flex:1,
                      borderBottomWidth:1,
                      marginTop:5,
                      borderRadius:5,
                      marginBottom:5}}
                      value={email}
                      onChangeText={setEmail}
                      autoCorrect={false}
                      autoCapitalize="none"
                      ></TextInput>
                      <Text style={{width:130}}>@ed.ritsumei.ac.jp</Text>
                    </View>
            </View>
                <TouchableOpacity disabled={!email} style={{
                  backgroundColor:email?'#C8252B':'#FFAFB2',
                  padding:5,
                  borderRadius:5}} onPress={passwordReset}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>リセットメールを送信</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            }
    </View>
  );
};
export default ALoginView;