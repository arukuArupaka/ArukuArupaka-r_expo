// import React from 'react';
// import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions } from 'react-native';
// import {SafeAreaView } from 'react-native';
// import { HeaderforTextbook2 } from '../../../component/Textbook/HeaderforTextbook2';
// import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
// import { useState ,useEffect} from 'react';
// import {TextInput, TouchableOpacity, Image, Settings} from 'react-native';
// //import ActionSheet from '@yfuks/react-native-action-sheet';
// import * as ImagePicker from 'expo-image-picker';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth ,db,storage} from '../../../../firebase';
// import { connect } from 'react-redux'
// import {useDispatch, useSelector} from 'react-redux';
// import {Dispatch} from 'redux';
// import State from '../../../redux/states/userState';
// import { handleLoginAfterPageName } from '../../../redux/actions/commonAction';
// import { Timestamp, addDoc, doc, getDoc, setDoc , collection, getDocs } from '@firebase/firestore';
// import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
// import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
// import { UseDispatch } from 'react-redux';
// import { fetchUserObject, setUserObject } from '../../../redux/actions/userAction';
// import { useNavigation } from '@react-navigation/native';
// import { useTalkContext } from './TalkContext';
// import { Foundation } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type TalkRoomProps = {
//     chatroom: string;
//     chatid: string;
//     ids: string;
//     status: boolean;
//     latest: string;
//     navigation;
//      // または chatroom の実際の型に応じて適切な型を指定します
//   };

// const TalkRoom: React.FC<TalkRoomProps> = ({ chatroom, chatid, ids, status, latest }) => {
//     const { click, setClick, nameindi, setNameindi, setChatid, setChatroom, chatmessage, setChatmessage, lasttime, setLasttime} = useTalkContext();
    
//     const navigation = useNavigation();
    
//     const styles = StyleSheet.create({
//         body:{
//             //backgroundColor: 'blue',
//             height: 60,
//             //borderRadius: 20,
//             borderBottomWidth: 0.5,
//             //alignItems: 'center',
//             justifyContent: 'center'
//         }
//     });

//     const [image, setImage] = useState('djJgmj1rweZiL3aORlpYW3OAOYN2');
//     const [check, setCheck] = useState(false);
//     const [urli, setUrli] = useState('');
//     const [latests, setLatests] = useState('');
//     const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
//     const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
//     const dispatch: Dispatch = useDispatch();
//     const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
//     if(!isLogin||isLoginNotVerificationEmail){
//       //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
//       console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
//     }



//     useEffect(()=>{
//         setUrli(ids);
//     },[]);

//     useEffect(()=>{
//         if(urli!=''){
//             if(!isLogin||isLoginNotVerificationEmail){
//                 //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
//                 console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
//             }else{
//                 if(ids == '1qkYVAZr1ke2OdH5srFoBUKbfiK2'){
//                     //const url = 'users/1qkYVAZr1ke2OdH5srFoBUKbfiK2/mainPicture';
//                     getDownloadURL(ref(storage, 'users/1qkYVAZr1ke2OdH5srFoBUKbfiK2/mainPicture.jpg')).then((getURI)=>{
//                             setImage(getURI)//ここに画像のurlが入ります。
//                             console.log('url',getURI);
//                             console.log(`${ids}さん成功`);
//                         }).
//                         catch((e)=>{
//                             console.log(e.message)
//                             console.log('マグロさんエラー');
//                         }).then(()=>{
//                             setCheck(true);
//                         })
//                 }else{
//                     //console.log('マグロさんじゃありません');
//                     getDownloadURL(ref(storage, `users/${ids}/mainPicture`)).then((getURI)=>{
//                             setImage(getURI)//ここに画像のurlが入ります。
//                         }).
//                         catch((e)=>{
//                             console.log(e.message)
//                             console.log(`${ids}さんエラー`);
//                         }).then(()=>{
//                             setCheck(true);
//                         })
//                 }
//             }
//         }



//     },[urli]);

//     const generatetime = async() => {
//         if(!isLogin||isLoginNotVerificationEmail){
//             //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
//             console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
//           }else{
//             const key = `${chatid}`;
//             const timekey = `${ids}time`;
//             const currentUserId = auth.currentUser.uid;
//             const timestamp = Timestamp.now();
//             const timestampString = timestamp.toDate().toISOString();
//           }
//     }


//     return (
//         <TouchableOpacity onPress={async()=>{
//             setNameindi(chatroom);
//             setClick(chatid);
//             generatetime();
//             const timekey = `${chatid}time`;
//                 const timestamp = Timestamp.now();
//                 const timestampString = timestamp.toDate().toISOString();

//             const saveTimestamp = async () => {
//                 try {
//                     await AsyncStorage.setItem(timekey, timestampString);
//                 } catch (e) {
//                     // 保存エラーの処理
//                     console.error("Error saving timestamp", e);
//                 }
//                 };
    
//                 await saveTimestamp();
            
//             const loadTimestamp = async () => {
//                 console.log('uuuuuuuu')
//                 try {
//                   const timestampString = await AsyncStorage.getItem(timekey);
//                   if (timestampString !== null) {
//                     console.log('nullでないです');
//                     // 文字列をDateオブジェクトに変換
//                     const date = new Date(timestampString);
                    
//                     // 必要に応じてFirestoreのTimestampに変換
//                     // const timestamp = Timestamp.fromDate(date);
//                     console.log('setLasttime',setLasttime);
//                     setLasttime(date);
                    
//                   }else{
//                     setLasttime(0);
//                     console.log('nullです');
//                   }
//                 } catch (e) {
//                   // 読み込みエラーの処理
//                   console.error("Error loading timestamp", e);
//                 }
//                 console.log('エラー処理は行われませんでした');
//               };
          
//               await loadTimestamp();
//             //console.log('引き渡す前のclickid',chatid);
//             navigation.navigate('チャットルーム', {id:chatid, name: chatroom, type: 'chat', ids: ids})
//         }}>
//             <View style={styles.body}>
//                 <View style={{flexDirection: 'row', paddingLeft: 8}}>
//                     <View style={{paddingRight: 3}}>
//                         { check == true ? <View style={{height: 50, width: 50, borderRadius: 200, backgroundColor: '#888888'}}><Image source={{uri: image}} style={{height: 50, width: 50, borderRadius: 200}}/></View> : <View style={{height: 50, width: 50, borderRadius: 200, backgroundColor: '#888888'}}></View>}
//                     </View>
//                     <View style={{flexDirection: 'column'}}>
//                         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                             <Text style={{fontSize: 20}}>{chatroom}</Text>
//                             <View style={{justifyContent: 'center'}}>
//                                 {status == false && <Foundation name="burst-new" size={24} color="red" />}
//                             </View>
//                         </View>
//                         <View>
//                             <Text style={{color: '#888888', paddingLeft: 3, width: 300 }} numberOfLines={1} ellipsizeMode='tail'>{latest}</Text>
//                         </View>
                        
//                     </View>

//                 </View>
                
//             </View>
//         </TouchableOpacity>
//     )
// };
// export default TalkRoom;