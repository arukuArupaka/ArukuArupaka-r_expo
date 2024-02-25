import React, { useState ,useEffect} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View,Image,Platform, Settings} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import ActionSheet from '@yfuks/react-native-action-sheet';
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
import { setUserObject } from '../redux/actions/userAction';


const MAIN_PICTURE_MAX_SIZE:number=10000

const ASetting = (props) => {

  const [isCompress,setIsCompress]=useState(false)
  const [isPictureUpLoad,setIsPictureUpLoad]=useState(false)

  const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
  console.log(userUUID)

  const [image, setImage] = useState(null);
  const [userName,setUserName]=useState('')
  const [faculty,setFaculty]=useState('')
  const [department,setDepartment]=useState('')
  const [grade,setGrade]=useState('')
  const [profile,setProfile]=useState('')
  const [oldDate,setOldData]=useState({})


  //ログインしてるかチェックするコード探しに来た人へ　ここから

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  const dispatch: Dispatch = useDispatch();
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
  if(!isLogin||isLoginNotVerificationEmail){
    //dispatch(handleLoginAfterPageName('Home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではちゃんと定義してね
    props.navigation.navigate('login')//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
  }

  //ここまでコピーしてね


  useEffect(()=>{
    console.log('effict')
    const getUserDate=async()=>{
      if (isLogin) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const refFiresrore = doc(db, `users/${userUUID}`);
        const snap = await getDoc(refFiresrore);

        if (snap.exists()) {
          // ユーザーデータを取得して格納
          const appUser = (await getDoc(refFiresrore)).data() as User;//appUserがデータベースから取得したオブジェクト
          setUserName(appUser.userName)
          setFaculty(appUser.faculty)
          setDepartment(appUser.department)
          setGrade(appUser.grade)
          setProfile(appUser.profile)

          const oldSettingdata= {
            id: appUser.id,
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
                setImage('https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65ec0b64&is=65d99664&hm=ef893886242657f90f84a93b7de86f6ebe1176f010b0212116a7c91b30d1d789&=&format=webp&width=1012&height=1012')
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
         setImage('https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65ec0b64&is=65d99664&hm=ef893886242657f90f84a93b7de86f6ebe1176f010b0212116a7c91b30d1d789&=&format=webp&width=1012&height=1012')
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
            userName: userName,
            faculty:faculty,
            department:department,
            grade:grade,
            profile:profile,
            createdAt: Date.now(),
          };
          const compareDate={
            id: userUUID,
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
            setDoc(ref, appUser).then(() => {
              // 保存に成功したらコンテクストにユーザーデータを格納
              console.log('appUser')
            });
          }
      }
    
      // 画像ファイルが選択された場合
      if (image) {
        uploadImageAsync(image)
      }   
      const reduxDate={
        id: userUUID,
        userName: userName,
        faculty:faculty,
        department:department,
        grade:grade,
        profile:profile,
        userImage:image
    }
    console.log('asetting')
    console.log(reduxDate)
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
    if(Platform.OS=='android'){
      pickImage()
      return
    }
    const options = ['写真を選択', 'キャンセル'];
    const cancelButtonIndex = 1;
    ActionSheet.showActionSheetWithOptions({
      options,
      cancelButtonIndex
    },
    buttonIndex => {
      if(buttonIndex==0){
        pickImage()
      }
    })
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
        <TouchableOpacity
          onPress={()=>props.navigation.navigate('Home')}
          style={{
            marginTop:0,
            marginLeft:20,
            backgroundColor:'#D9D9D9',
            borderRadius:50,
            height:40,
            width:40,
          }}
        >
          <Ionicons name="arrow-back" style={{marginVertical:6,color:'white',textAlign:'center'}} size={24} color="black" />
        </TouchableOpacity>
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
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:20,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}
            value={faculty}
            onChangeText={setFaculty}
            autoCorrect={false}
            autoCapitalize="none"></TextInput>
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
              sendUserDate();
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
              }} >登録</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ASetting;


