import React, { useEffect, useState } from 'react';
import {Alert,Text, View,Image, TouchableOpacity,TextInput, KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,deleteUser } from 'firebase/auth';
import { auth } from '../../firebase';



const ALoginView = (props) => {

  const [isCreateAcount,setIsCreateAcount]=useState(true)
  const [isLogin,setIsLogin]=useState(false)
  const [isResetPass,setIsResetPass]=useState(false)
  const [userInfo,setUserInfo]=useState()
  const [showResendRegisterBotton,setShowResendRegisterBotton]=useState(false)


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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = async () => {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        //console.log(user);
        await setUserInfo(user)
        setShowResendRegisterBotton(true)

        await sendEmailVerification(user.user);

        //props.navigation.navigate('Home')
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error.message);
      }
    };

    const switchLogin=()=>{
      setIsCreateAcount(false);
      setIsResetPass(false)
      setIsLogin(true)
    }

    const switchCreateAccount=()=>{
      setIsResetPass(false)
      setIsLogin(false)
      setIsCreateAcount(true);
    }

    const switchResetPassWord=()=>{
      setIsLogin(false)
      setIsCreateAcount(false);
      setIsResetPass(true)
    }
    const setdRegisterMail=async()=>{
      // try{
      //   await deleteUser(userInfo)
      //   await handleLogin
      // }catch{

      // }
      await sendEmailVerification(userInfo.user);

    }

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
                <Text>パスワードを入力</Text>
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
                <TouchableOpacity disabled={!email || !password} style={{
                  marginTop:20,
                  backgroundColor:(email&&password.length>=6)?'#C8252B':'#FFAFB2',
                  padding:5,
                  borderRadius:5}} onPress={handleRegister}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>確認メールを送信</Text>
                </TouchableOpacity>
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
                <Text>パスワードを入力</Text>
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
                  borderRadius:5}} onPress={handleRegister}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>リセットメールを送信</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            }
    </View>
  );
};
export default ALoginView;