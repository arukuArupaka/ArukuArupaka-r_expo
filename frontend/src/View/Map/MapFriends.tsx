import React ,{useEffect, useState} from 'react';
import {Text, View,StyleSheet,Linking, TouchableOpacity} from 'react-native';
import MapMyselfContainer from '../../component/Map/MapMyselfContainer';
import {useSelector,useDispatch} from 'react-redux';
import { handleLoginAfterPageName } from '../../redux/actions/commonAction';
import MapFriendRegisteContainer from '../../component/Map/mapFriendRegisteContainer';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { db } from '../../../firebase';


const MapFriendsView = ({ navigation }) => {

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  const dispatch: Dispatch = useDispatch();
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
  if(!isLogin||isLoginNotVerificationEmail){
    dispatch(handleLoginAfterPageName('Map',{ screen: 'friends' }))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではちゃんと定義してね import { handleLoginAfterPageName } from '../../redux/actions/commonAction';←これいる
    navigation.navigate('login')//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
  }
  console.log('A')

  const [showCamera,setShowCamera]=useState(false)

  const [hasPermission, setHasPermission] = useState(null);
//アプリはQRコードをスキャンしたかどうか
const [scanned, setScanned] = useState(false);

const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 


useEffect(()=>{//これをホームへ
  console.log('useEffect')
  const getUserDate=async()=>{
    console.log('isLogin')
    if (isLogin) {
      // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
      const refFiresrore = doc(db, `,mapGPS/${userUUID}`);
      const snap = await getDoc(refFiresrore);

      if (snap.exists()) {
        const appUser = (await getDoc(refFiresrore)).data() as User;//appUserがデータベースから取得したオブジェクト
        console.log(appUser)
        console.log('exit!')
      }else{
        console.log('norExit')

      }
    }
  }
  getUserDate()
},[])

const handleBarCodeScanned = ({ data }) => {
  Linking.openURL(data)
    .then(() => setScanned(true))
    .catch((err) => {
      setScanned(true);
      alert("リンクを開く事ができませんでした。");
    });
};

  return (
    <View style={{flex:1}}>
      <View
        style={{
          paddingHorizontal:15,
          flex: 1,
          backgroundColor:'#FFFFFF'
        }}>
        <MapMyselfContainer/>
        <MapFriendRegisteContainer onCamera={()=>{setShowCamera(true);}}/>
      </View>
      {showCamera&&
      <View style={{position:'absolute',width:'100%',height:'100%'}}>
        <TouchableOpacity style={{position:'absolute',top:10,right:10,zIndex:10}} onPress={()=>setShowCamera(false)}>
          <MaterialIcons name="cancel" size={30} color="white" />
          </TouchableOpacity>
          <Camera
          style={{height:'100%'}}
          onBarCodeScanned={({ type, data }) => {
            console.log(data);
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
          flexDirection:'row'}}>
          <AntDesign name="qrcode" size={24} color="white" />
          <Text style={{color:'white'}}>自分のQRコードを表示</Text>
        </TouchableOpacity>
        </View>
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
