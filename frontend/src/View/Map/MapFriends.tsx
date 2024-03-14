import React ,{useEffect, useState} from 'react';
import {Text, View,StyleSheet,Linking, TouchableOpacity,Image} from 'react-native';
import MapMyselfContainer from '../../component/Map/MapMyselfContainer';
import {useSelector,useDispatch} from 'react-redux';
import { handleLoginAfterPageName } from '../../redux/actions/commonAction';
import MapFriendRegisteContainer from '../../component/Map/mapFriendRegisteContainer';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { doc, getDoc, setDoc,updateDoc } from '@firebase/firestore';
import { db ,storage} from '../../../firebase';
import * as Crypto from 'expo-crypto';
import { setMapUserObject } from '../../redux/actions/mapUserActions';
import QRCode from 'react-native-qrcode-svg';
import {  ref, getDownloadURL } from "firebase/storage";


const MapFriendsView = ({ navigation }) => {

  const userObject=useSelector((state)=>state.user.userObject)
  const mapUserObject =useSelector((state)=>state.map.mapUserObject)

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  const dispatch: Dispatch = useDispatch();
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
  if(!isLogin||isLoginNotVerificationEmail){
    dispatch(handleLoginAfterPageName('Map',{ screen: 'friends' }))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではちゃんと定義してね import { handleLoginAfterPageName } from '../../redux/actions/commonAction';←これいる
    navigation.navigate('login')//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
  }


  const [showCamera,setShowCamera]=useState(false)
  const [showQR,setShowQR]=useState(false)
  const [showFriendRegisterDaialog,setShowFriendRegisterDaialog]=useState(false)
  const [readFriendObject,setReadFriendObject]=useState({})
  const [friendImage,setFriendImage]=useState('')
  const [friendRegistUUID,setfriendRegistUUID]=useState('')

//アプリはQRコードをスキャンしたかどうか

  const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 


  const showQRCode=async()=>{
    if (await isLogin) {
      // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
      const refFiresrore = doc(db, `mapFriendConvert/${mapUserObject.QRUUID}`);
      const snap = await getDoc(refFiresrore);

      if (snap.exists()) {
        setShowQR(true)
      }else{
        const mapUser={
          userUUID:userUUID,
        }
        setDoc(refFiresrore, mapUser).then(() => {
          // 保存に成功したらコンテクストにユーザーデータを格納
          setShowQR(true)
        });
      }
    }
    
  }

  const readQRCode=async(data)=>{


    if(!showQR&&data.length==36){
      if(!await showFriendRegisterDaialog){
        setShowFriendRegisterDaialog(true)
        const refFiresrore = await doc(db, `mapFriendConvert/${data}`);

        const friendUUID = (await getDoc(refFiresrore)).data().userUUID as string;//appUserがデータベースから取得したオブジェクト
        setfriendRegistUUID(friendUUID)
        const refFiresroreMapUser = await doc(db, `mapGPS/${friendUUID}`);
        const friendObject = (await getDoc(refFiresroreMapUser)).data() ;//appUserがデータベースから取得したオブジェクト

        getDownloadURL(ref(storage, `users/${friendUUID}/mainPicture`)).then((getURI)=>{
          setFriendImage(getURI)
        }).
        catch((e)=>{
          console.log(e.message)
        })

        setReadFriendObject(friendObject)
        //console.log('85')


      }else{
      }
    }
  }

useEffect(()=>{//これをホームへ


  const getUserDate=async()=>{
    console.log(await isLogin)
    if (await isLogin) {
      // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
      const refFiresrore = doc(db, `mapGPS/${userUUID}`);
      const snap = await getDoc(refFiresrore);

      if (snap.exists()) {
        const appUser = (await getDoc(refFiresrore)).data() as User;//appUserがデータベースから取得したオブジェクト
        console.log(appUser)
        console.log('exit!')
        dispatch(setMapUserObject(appUser))
      }else{
        const mapUser={
          isLocationShare:true,
          userName:userObject.userName,
          userUUID:userUUID,
          friends:[],
          mapShowFriends:[],
          locationSharingFriends:[],
          QRUUID:Crypto.randomUUID()
        }
        console.log('norExit')
        setDoc(refFiresrore, mapUser).then(() => {
          // 保存に成功したらコンテクストにユーザーデータを格納
          console.log('mapUser')
          dispatch(setMapUserObject(mapUser))
        });
      }
    }
  }
  getUserDate()
},[isLogin])

console.log(mapUserObject.QRUUID)

const friendRegist=async()=>{
  if (await isLogin) {
    // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
    const refFiresrore = doc(db, `mapGPS/${userUUID}`);

      let newFrends=mapUserObject.friends

      newFrends[newFrends.length]={
        QRUUID:readFriendObject.QRUUID,
        imageURI:friendImage,
        userName:readFriendObject.userName,
        userUUID:readFriendObject.userUUID
      }
      console.log(newFrends)
      const uniqueNewFrends = Array.from(
        new Map(newFrends.map((user) => [user.userUUID, user])).values()
      );
      mapUserObject.friends=newFrends

      updateDoc(refFiresrore, {friends:uniqueNewFrends}).then(() => {
        // 保存に成功したらコンテクストにユーザーデータを格納
        console.log('mapUser')
        dispatch(setMapUserObject(mapUserObject))
        setShowFriendRegisterDaialog(false)
        setFriendImage('')
        setfriendRegistUUID('')
        setReadFriendObject({})
      });
    
  }
}
  return (
    <View style={{flex:1}}>
      <View
        style={{
          paddingHorizontal:15,
          flex: 1,
          backgroundColor:'#FFFFFF'
        }}>
        <MapMyselfContainer/>
        <MapFriendRegisteContainer mapUserObject={mapUserObject} onCamera={()=>{setShowCamera(true);}}/>
      </View>
      {showCamera&&
      <View style={{position:'absolute',width:'100%',height:'100%'}}>
          <TouchableOpacity style={{position:'absolute',top:10,right:10,zIndex:10}} onPress={()=>setShowCamera(false)}>
            <MaterialIcons name="cancel" size={30} color="white" />
            </TouchableOpacity>
            <Camera
            style={{height:'100%'}}
            onBarCodeScanned={({ type, data }) => {
              readQRCode(data)
            }}
          />
          <View style={{
            position:'absolute',
            bottom:20,
            width:'100%'}}>
          <TouchableOpacity style={{
            justifyContent:'center',
            borderRadius:20,
            alignItems:'center',
            width:250,
            height:40,
            marginRight:'auto',
            marginLeft:'auto',
            backgroundColor:'#C8252B',
            flexDirection:'row'}}
            onPress={()=>showQRCode()}>
            <AntDesign name="qrcode" size={24} color="white" />
            <Text style={{color:'white'}}>自分のQRコードを表示</Text>
          </TouchableOpacity>
          </View>
          {showFriendRegisterDaialog&&<View style={{position:'absolute',width:'100%',height:'100%',justifyContent:'center'}}>
              <View style={{backgroundColor:'white',width:270,height:200,paddingTop:5,marginRight:'auto',marginLeft:'auto',borderRadius:10}}>
                <Image style={{backgroundColor:'#EEEEEE',width:80,height:80,borderRadius:40,marginLeft:'auto',marginRight:'auto',marginTop:10,marginBottom:20}} source={{uri:friendImage}} />
                <Text style={{textAlign:'center',fontSize:20}}>{readFriendObject.userName?readFriendObject.userName:'ネットワークエラー'}</Text>
                <View style={{flexDirection:'row',marginTop:25}}>
                  <TouchableOpacity onPress={()=>{setShowFriendRegisterDaialog(false);setfriendRegistUUID(''),setFriendImage('')}} style={{flex:1,marginHorizontal:20,height:25,justifyContent:'center',borderRadius:20,}}><Text style={{textAlign:'center',color:'gray'}}>キャンセル</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>friendRegist()} style={{flex:1,backgroundColor:'#C8252B',marginHorizontal:20,height:25,justifyContent:'center',borderRadius:20,}}><Text style={{textAlign:'center',color:'white'}}>登録</Text></TouchableOpacity>
                </View>
              </View>
            </View>}
          {showQR&&<View style={{position:'absolute',width:'100%',height:'100%',justifyContent:'center'}}>
            <View style={{backgroundColor:'white',width:270,height:300,paddingTop:5,marginRight:'auto',marginLeft:'auto',borderRadius:10}}>
              <TouchableOpacity onPress={()=>setShowQR(false)}>
                <MaterialIcons style={{textAlign:'right'}} name="cancel" size={30} color="black" />
              </TouchableOpacity>
                <View
                  style={{marginRight:'auto',marginLeft:'auto',marginTop:5}}
                  >
                  <QRCode
                    value={mapUserObject.QRUUID}
                    size={230}
                    />
                </View>
          </View>
            </View>}
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "cyan",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "whitesmoke",
  },
});
export default MapFriendsView;
