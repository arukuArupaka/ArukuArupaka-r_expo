// import { Keyboard, KeyboardAvoidingView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
// import { HeaderforTextbook2 } from '../../../../component/Textbook/HeaderforTextbook2';
// import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
// import TalkRoom from '../../../../component/Textbook/Chat/TalkRoom';
// import React, { useState ,useEffect, useRef} from 'react';
// import {ScrollView, TextInput, TouchableOpacity, Image,Platform, Settings} from 'react-native';
// //import ActionSheet from '@yfuks/react-native-action-sheet';
// import * as ImagePicker from 'expo-image-picker';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth ,db,storage} from '../../../../../firebase';
// import { connect } from 'react-redux'
// import {useDispatch, useSelector} from 'react-redux';
// import {Dispatch} from 'redux';
// import State from '../../../../redux/states/userState';
// import { handleLoginAfterPageName } from '../../../../redux/actions/commonAction';
// import { arrayUnion, updateDoc, Timestamp, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
// import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
// import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
// import { UseDispatch } from 'react-redux';
// import { fetchUserObject, setUserObject } from '../../../../redux/actions/userAction';
// import { useTalkContext } from '../../../../component/Textbook/Chat/TalkContext';
// //import { Timestamp } from 'firebase-admin/firestore';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// //import { RootState } from './state';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type TalkRoomProps = {
//     id:string;
//     name:string;
//     type:string;
//     ids:any;
//     //me:string;
//   };

// export const RootTalk = ({id, name, type, ids}) => {
//     //console.log("RootTalk内のidは",id);
//     const { me, setMe, click, setClick,chatmessage, setChatmessage  } = useTalkContext();
//     const [inputValue, setInputValue] = useState('');
//     const [add, setAdd] = useState(false);

//     const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
//     const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
//     const dispatch: Dispatch = useDispatch();
//     const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
//     if(!isLogin||isLoginNotVerificationEmail){
//       //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
//       //console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
//     }

//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });



//     async function createChatroomStructure(content:string) {
//         setInputValue('');
//         const currentUserId = auth.currentUser.uid;

//         const check = collection(db, `${type}/${id}/messages`);
//         const checkd = doc(db, `${type}/${id}`)
//         //const checkmes = checkdoc.data();
//         const timestamp = Timestamp.now(); // Firestoreの現在のタイムスタンプを取得
//         const date = timestamp.toDate();
//         const hours = date.getHours();
//         const minutes = date.getMinutes();
//         const formattedHours = hours.toString(); // 時間を文字列に変換
//         const formattedMinutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString(); // 分が10未満の場合は先頭に0を追加

//         const timeString = `${formattedHours}:${formattedMinutes}`; // "時間:分"の形式の文字列を生成
//         let stname;
//         //const stkey = `${currentUserId}appuser`;

//         console.log('メッセージ作成');
//           await addDoc(check, {
//             name:me,content: content, sentAt: Timestamp.now(), id: currentUserId,  time:timeString, unreaduser: [currentUserId, ids], read: false
//           });

//           //console.log("現在時刻は",Timestamp.now()) ;
//         //console.log("Chatroom structure created");

  
//         //console.log('ids:',usrid);
//         console.log('トークン取得');
//         const tokendocu = await getDoc(doc(db, `tokens/${ids}`));
//         if(tokendocu.exists()){
//           const usertoken = tokendocu.data().token;
//           //console.log('token', usertoken);
    
//           const messages = usertoken.map(token => ({
//             to: `${token}`,
//             sound: 'default',
//             title: `${me}`,
//             body: `${content}`,
//             data: {
//               parentScreen: 'textbook', // 親の Stack Navigator 名
//               screen: 'トーク',
//               //nestedscreen: 'チャットルーム', // 目的の画面（子の Stack Navigator 内）
//               id: `${id}`,
//               name: me,
//               type: 'chat',
//               ids: ids
//             },
//           }));
    
//             try{
//             const response = await fetch('https://exp.host/--/api/v2/push/send', {
//               method: 'POST',
//               headers: {
//                 Accept: 'application/json',
//                 'Accept-encoding': 'gzip, deflate',
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(messages),
//             });
            
//             const responseJson = await response.json();
          
//               // レスポンスからエラーをチェック
//               if (responseJson.data && responseJson.data.status === 'error') {
//                 console.log('Error sending notification:', responseJson.data.message);
                
//                 // ここに無効なトークンに対する処理を追加
//                 if (responseJson.data.details && responseJson.data.details.error === 'DeviceNotRegistered') {
//                   // トークンが無効であることを示す処理
//                   console.log('This token is no longer registered. Removing from database...');
//                   // トークンをデータベースから削除するロジックをここに追加
//                 }
//               } else {
//                 // 通知が成功した場合の処理
//                 //console.log('Notification sent successfully:', responseJson);
//               }
//             } catch (error) {
//               console.error('Error sending notification:', error);
//             }
    
            
//         }

        
//       };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"} 
//       style={styles.keyboardAvoidingView}
//      // keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 100}
//     >
//       <View style={styles.body}>
//         <TextInput 
//           style={styles.input} 
//           placeholder="メッセージを入力"
//           value={inputValue}
//           onChangeText={(text)=>{setInputValue(text);}}
//         />
//         <View style={styles.button}>
//           <TouchableOpacity 
//           onPress={() => {createChatroomStructure(inputValue);   
//            console.log('最終更新時間を更新');         
//            const asyncChange = async(id:string) => {
//             await updateDoc(doc(db, `${type}`, id), {
//                 creationTime: Timestamp.now()
//           });
//         };
//         asyncChange(id);
//         }}
//           >
//             <Text>送信</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   keyboardAvoidingView: {
//     width: '100%'
//   },
//   body: {
//     height: 50,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     flexDirection: 'row',
//     backgroundColor: 'white', // 背景色を追加して視覚的にわかりやすくする
//   },
//   input: {
//     borderRadius: 20,
//     borderWidth: 1,
//     width: 250,
//     paddingLeft: 5,
//     marginRight: 10, // ボタンとの間隔を開ける
//     height: '80%'
//   },
//   button: {
//     borderRadius: 20,
//     borderWidth: 1,
//     width: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 2,
//     paddingBottom: 2,
//     height: '80%'
//   },
// });
