import React, { useState ,useEffect} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View,Image,Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
//import ActionSheet from '@yfuks/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db,storage} from '../../firebase';
import { connect } from 'react-redux'
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import State from '../redux/states/userState';
import { handleLoginAfterPageName } from '../redux/actions/commonAction';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
import { UseDispatch } from 'react-redux';
import { setUserObject } from '../redux/actions/userAction';
import RNPickerSelect from 'react-native-picker-select';


const MAIN_PICTURE_MAX_SIZE:number=10000

const ASettingToPage = (props) => {

  const [isCompress,setIsCompress]=useState(false)
  const [isPictureUpLoad,setIsPictureUpLoad]=useState(false)
  const loginAfterPageName=useSelector((state)=>state.common.loginAfterPageName)
  const [campus,setCanpus]=useState('')

  const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
  console.log(userUUID)

  const [image, setImage] = useState(null);
  const [userName,setUserName]=useState('')
  const [faculty,setFaculty]=useState('')
  const [department,setDepartment]=useState('')
  const [grade,setGrade]=useState('')
  const [profile,setProfile]=useState('')
  const [oldDate,setOldData]=useState({})
  const [effectCounter,setEffectCounter]=useState(0)


  //ログインしてるかチェックするコード探しに来た人へ　ここから

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  const dispatch: Dispatch = useDispatch();
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
  if(!isLogin||isLoginNotVerificationEmail){
    //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
    props.navigation.navigate('login')//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
  }

  //ここまでコピーしてね


  useEffect(()=>{
    console.log('effict')
    const getUserDate=async()=>{
      if (isLogin) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const refFiresrore = doc(db, `users/${userUUID}`);
        console.log("asettingtopage getDoc 64")
        const snap = await getDoc(refFiresrore);

        if (snap.exists()) {
          // ユーザーデータを取得して格納
          // const appUser = (await getDoc(refFiresrore)).data() as User;//appUserがデータベースから取得したオブジェクト
          const appUser = snap.data() as User
          setUserName(appUser.userName)
          setFaculty(appUser.faculty)
          setDepartment(appUser.department)
          setGrade(appUser.grade)
          setProfile(appUser.profile)
          setCanpus(appUser.campus)

          const oldSettingdata= {
            id: appUser.id,
            school:'立命館大学',
            campus:campus,
            userName: appUser.userName,
            faculty:appUser.faculty,
            department:appUser.department,
            grade:appUser.grade,
            profile:appUser.profile,
          };
          setOldData(oldSettingdata)

          getDownloadURL(ref(storage, `users/${userUUID}/mainPicture`)).then((getURI)=>{
            setImage(getURI)
            setIsCompress(true)
          }).
          catch((e)=>{
            console.log(e.message)

            switch (e.message){
              case `Firebase Storage: Object 'users/${userUUID}/mainPicture' does not exist. (storage/object-not-found)`:
                //setImage('https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65ec0b64&is=65d99664&hm=ef893886242657f90f84a93b7de86f6ebe1176f010b0212116a7c91b30d1d789&=&format=webp&width=1012&height=1012')
                setIsCompress(false)
            }
          })
          console.log(await getDownloadURL(ref(storage, `users/${userUUID}/mainPicture`)))
        } else {
         setUserName('未登録')
         setFaculty('未登録')
         setDepartment('未登録')
         setGrade('未登録')
         setProfile('未登録')
        // setImage('https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65ec0b64&is=65d99664&hm=ef893886242657f90f84a93b7de86f6ebe1176f010b0212116a7c91b30d1d789&=&format=webp&width=1012&height=1012')
         setIsCompress(false)
        }
      } else {
      }
    }
    getUserDate()

      // このコンポーネントが不要になったら監視を終了する
  }, [userUUID]);
  
  const sendUserDate=async()=>{
      if (isLogin) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const ref = doc(db, `users/${userUUID}`);

          const appUser: User = {
            id: userUUID,
            school:'立命館大学',
            campus:campus,
            userName: userName,
            faculty:faculty,
            department:department,
            grade:grade,
            profile:profile,
            createdAt: Date.now(),
          };
          const compareDate={
            id: userUUID,
            school:'立命館大学',
            campus:campus,
            userName: userName,
            faculty:faculty,
            department:department,
            grade:grade,
            profile:profile,
          };
          if(JSON.stringify(Object.entries(compareDate).sort())!==JSON.stringify(Object.entries(oldDate).sort())){
            console.log(compareDate)
            console.log(oldDate)
            setOldData(compareDate)
          // // Firestoreにユーザーデータを保存
            setDoc(ref, appUser,{merge:true}).then(() => {
              // 保存に成功したらコンテクストにユーザーデータを格納
              console.log('appUser')
            });
            //dispatch(setUserObject(appUser))
          }
      }
    
      // 画像ファイルが選択された場合
      if (image) {
        uploadImageAsync(image)
      }   
      const reduxDate={
        id: userUUID,
        school:'立命館大学',
        campus:campus,
        userName: userName,
        faculty:faculty,
        department:department,
        grade:grade,
        profile:profile,
        userImage:image
    }
      dispatch(setUserObject(reduxDate))

  }
  const uploadImageAsync = async (uri: string): Promise<string> => {
    console.log('uri:', uri);
  
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const storageRef = ref(storage, `users/${userUUID}/mainPicture`);
    console.log(blob.size)
    if(isCompress||isPictureUpLoad){

    }else if(blob.size<MAIN_PICTURE_MAX_SIZE){
        uploadBytes(storageRef, blob).then((snapshot) => {
          setIsPictureUpLoad(true)
        });
    }else{
       const compressionRatio=MAIN_PICTURE_MAX_SIZE/await blob.size
       console.log(await compressionRatio)

       const resizedImage = await manipulateAsync(uri, [
        {
          resize: { 
            width: 200,
            height: 200,
          },}
       ], {
        compress: compressionRatio,
      });
      //const resizedImage=image
        console.log(image)
        console.log(resizedImage)
        const resizeBlob: any = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', resizedImage.uri, true);
          xhr.send(null);
        });
        setIsCompress(true)
        console.log('圧縮後'+resizeBlob.size)
        setImage(resizedImage.uri)
            uploadBytes(storageRef, resizeBlob).then((snapshot) => {
              setIsPictureUpLoad(true)
    });
    }
    blob.close();
  };


  const onOpenActionSheet=()=> {
    pickImage()

    // if(Platform.OS=='android'){
    //   pickImage()
    //   return
    // }
    // const options = ['写真を選択', 'キャンセル'];
    // const cancelButtonIndex = 1;
    // ActionSheet.showActionSheetWithOptions({
    //   options,
    //   cancelButtonIndex
    // },
    // buttonIndex => {
    //   if(buttonIndex==0){
    //     pickImage()
    //   }
    // })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri);
      setIsCompress(false)
      setIsPictureUpLoad(false)
    }
  }
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        <View style={{height:200}}>
          <View style={{
              backgroundColor:'#D9D9D9',
              height:200,
              width:200,
              borderRadius:100,
              marginLeft:'auto',
              marginRight:'auto',
          }}
          >
          {image&&<Image source={{uri:image}} style={{width: 200, height: 200 ,borderRadius:100,}}/>}
            <TouchableOpacity
            onPress={onOpenActionSheet}
            style={{
              position:'absolute',
              right:20,
              bottom:10,
              height:40,
              width:40,
              borderWidth:1,
              backgroundColor:'white',
              borderRadius:20,
            }}><AntDesign style={{
              textAlign:'center',
              marginTop:'auto',
              marginBottom:'auto',
            }} name="camera" size={24} color="black" /></TouchableOpacity>
          </View>
        </View>
        <View style={{marginHorizontal:10,marginTop:40,}}>
        <Text>学校名</Text>
          <RNPickerSelect
          value={campus}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: '立命館大学', value: '立命館大学' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: '立命館大学', value: '立命館大学' }}
          disabled={true}
          Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789'}}>▼</Text>)}
        />
          <Text>キャンパス</Text>
          <RNPickerSelect
          value={campus}
          onValueChange={(value) => setCanpus(value)}
          items={[
            { label: 'KIC', value: 'KIC' },
            { label: 'BKC', value: 'BKC' },
            { label: 'OIC', value: 'OIC' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: '選択してください', value: 'notSelectCanpans' }}
          Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789'}}>▼</Text>)}
        />
          <Text>ユーザーネーム</Text>
          <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:20,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}
            value={userName}
            onChangeText={setUserName}
            autoCorrect={false}
            autoCapitalize="none"
            ></TextInput>
            <Text>学部</Text>
            <RNPickerSelect
            value={faculty}
            onValueChange={(value) => setFaculty(value)}
            items={[
                { label: '法学部', value: '法学部', key: 'hougaku' },
                { label: '経済学部', value: '経済学部', key: 'keizai' },
                { label: '経営学部', value: '経営学部', key: 'keiei' },
                { label: '産業社会学部', value: '産業社会学部', key: 'sansha' },
                { label: '国際関係学部', value: '国際関係学部', key: 'kokusai' },
                { label: '政策科学部', value: '政策科学部', key: 'seisaku' },
                { label: '文学部', value: '文学部', key: 'bun' },
                { label: '映像学部', value: '映像学部', key: 'eizou' },
                { label: '総合心理学部', value: '総合心理学部', key: 'sougou' },
                { label: '理工学部', value: '理工学部', key: 'rikou' },
                { label: 'グローバル教養学部', value: 'グローバル教養学部', key: 'gurokyou' },
                { label: '食マネジメント学部', value: '食マネジメント学部', key: 'shokumane' },
                { label: '情報理工学部', value: '情報理工学部', key: 'jouri' },
                { label: '生命科学部', value: '生命科学部', key: 'seimei' },
                { label: '薬学部', value: '薬学部', key: 'yakugaku' },
                { label: 'スポーツ健康学部', value: 'スポーツ健康学部', key: 'supoken' }
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: '選択してください', value: 'notSelectCanpans' }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789'}}>▼</Text>)}
            />
            <Text>学科・専攻</Text>
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:20,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}
            value={department}
            onChangeText={setDepartment}
            autoCorrect={false}
            autoCapitalize="none"></TextInput>
            <Text>回生</Text>
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:20,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}
            value={grade}
            onChangeText={setGrade}
            autoCorrect={false}
            autoCapitalize="none"></TextInput>
            <Text>プロフィール</Text>
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:20,
            backgroundColor:'#D9D9D9',
            height:100,
            marginBottom:20}}
            value={profile}
            onChangeText={setProfile}
            autoCorrect={false}
            multiline={true}
            maxLength={100}
            autoCapitalize="none"></TextInput>
            <TouchableOpacity
            onPress={()=>{
              const pagename=loginAfterPageName
              sendUserDate();
              dispatch(handleLoginAfterPageName(''))
              props.navigation.navigate(pagename)
            }}
            style={{
              marginLeft:'80%',
              backgroundColor:'#C8252B',
              borderRadius:5,
              height:30
              }}><Text style={{
                color:'white',
                textAlign:'center',
                fontSize:20,
                fontWeight:'400',
                paddingTop:2,
              }} >次へ</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop:5,
    borderRadius:5,
    fontSize:20,
    backgroundColor:'#D9D9D9',
    marginBottom:20,
    width:'100%'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
    backgroundColor:'#eee'
  },
})
export default ASettingToPage;


