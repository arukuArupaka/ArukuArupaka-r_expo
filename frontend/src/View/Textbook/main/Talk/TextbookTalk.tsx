// import { View, Text, StyleSheet, SafeAreaView, MatrixTransform } from 'react-native';
// import { HeaderforTextbook2 } from '../../../../component/Textbook/HeaderforTextbook2';
// import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
// import TalkRoom from '../../../../component/Textbook/Chat/TalkRoom';
// import React, { useState ,useEffect} from 'react';
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
// import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
// import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
// import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
// import { UseDispatch } from 'react-redux';
// import { fetchUserObject, setUserObject } from '../../../../redux/actions/userAction';
// //import { RootState } from './state';
// import { useTalkContext } from '../../../../component/Textbook/Chat/TalkContext'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TokenCheck from '../../../../component/Textbook/Chat/TokenCheck';
// import {useRef } from 'react';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';


// export const TextbookTalk = ({navigation}) => {
//   const [image, setImage] = useState([]);
//   const [userName,setUserName]=useState('')
//   const [faculty,setFaculty]=useState('')
//   const [department,setDepartment]=useState('')
//   const [grade,setGrade]=useState('')
//   const [profile,setProfile]=useState('')
//   const [oldDate,setOldData]=useState({})
//   //const [chatroom, setChatroom] = useState([]);
//   const [userInfo, setUserInfo] = useState([]);
//   const [userInfoID, setUserInfoID] = useState([]);
//   const [chatdoc, setChatdoc] = useState('');
//   //const [chatid, setChatid] = useState([]);
//   const [effectCounter,setEffectCounter]=useState(0)
//   const [isCompress,setIsCompress]=useState(false)
//   const [isPictureUpLoad,setIsPictureUpLoad]=useState(false)
//   const [showno, setShowno] = useState(false);
//   const [status, setStatus] = useState([]);
//   const [latest, setLatest] = useState([]);

//   const { me, setMe, lasttime, setLasttime, nameindi, setNameindi, chatid, setChatid, chatroom, setChatroom, chatmessage, setChatmessage} = useTalkContext();

//   const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
//   //let arrayid = [];
  
//   const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
//   const dispatch: Dispatch = useDispatch();
//   const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
//   if(!isLogin||isLoginNotVerificationEmail){
//     useEffect(() =>{
//           //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
//       console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて

//       const loadid = async () => {
//         try {
//           const stringValue = await AsyncStorage.getItem('roomidkey');
//           if(stringValue != null){
//             const value = JSON.parse(stringValue);
//             setChatid(value);
//         }
//         } catch (e) {
//           console.log(e);
//         }
//       };

//       loadid();

//       const loadname = async () => {
//         try {
//           const stringValue = await AsyncStorage.getItem('roomnamekey');
//           if(stringValue != null){
//             const value = JSON.parse(stringValue);
//             setChatroom(value);
//         }
//         } catch (e) {
//           console.log(e);
//         }
//       };

//       loadname();

//     },[]);

//   }else{

//     useEffect(() => {
//       const asyncCheck = async() => {
//         const currentUserId = auth.currentUser.uid;
//         let stuser;
//         //const "appUserkey" = appUserkey;

//         const loadname = async () => {
//           try {
//             const stringValue = await AsyncStorage.getItem("appUserkey");
//             if(stringValue != null){
//               const value = JSON.parse(stringValue);
//               stuser = value;
//           }
//           } catch (e) {
//             console.log(e);
//           }
//         };

//         await loadname();

//         if(stuser == null){
          
//           console.log('stnameがnullです');
//           const asyncSave = async () => {
//             try {
//               const refFirestore = doc(db, `users/${userUUID}`);
//               const docSnapshot = await getDoc(refFirestore);
              
//               if (!docSnapshot.exists()) {
//                 console.log('ドキュメントが存在しません。');
//                 return;
//               }
          
//               const appUser = docSnapshot.data(); // appUserがデータベースから取得したオブジェクト
//               const stringValue = JSON.stringify(appUser);
//               console.log('appuser',stringValue);
          
//               await AsyncStorage.setItem("appUserkey", stringValue);
//               console.log(`データが${userUUID}さんのローカルに保存されました。`);
//             } catch (e) {
//               console.error('データの保存中にエラーが発生しました:', e);
//             }
//           };
          
//           asyncSave();
          

//         }else{
//           console.log('stuserがnullではありません');
//           console.log(stuser);
//           setMe(stuser.userName);
//         }
        
//     };
//     asyncCheck();
//     },[]);

//     async function registerForPushNotificationsAsync() {
//       let token;
    
//       if (Platform.OS === 'android') {
//         Notifications.setNotificationChannelAsync('default', {
//           name: 'default',
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: '#FF231F7C',
//         });
//       }
    
//       if (Device.isDevice) {
//         const { status: existingStatus } = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== 'granted') {
//           const { status } = await Notifications.requestPermissionsAsync();
//           finalStatus = status;
//         }
//         if (finalStatus !== 'granted') {
//           alert('Failed to get push token for push notification!');
//           return;
//         }
//         token = await Notifications.getExpoPushTokenAsync({
//           projectId: Constants.expoConfig.extra.eas.projectId,
//         });
//         console.log(token);
//       } else {
//         alert('Must use physical device for Push Notifications');
//       }
    
//             // token および token.data の存在をチェック
//       if (token && token.data) {
//         return token.data;
//       }

//       // token.dataが存在しない場合はここで何も返さない、または適切な値を返す
//       return null; // または undefined、もしくは何も書かない
//     }

//     const [expoPushToken, setExpoPushToken] = useState('');
//     const [notification, setNotification] = useState(false);
//     const notificationListener = useRef();
//     const responseListener = useRef();
  
//     useEffect(() => {
//       const tokenset = async() =>{
//         const currentUserId = auth.currentUser.uid;
//         const tokendocs = doc(db, `tokens/${currentUserId}`);
//         const tokendoc = await getDoc(tokendocs);
//         const currentToken = await registerForPushNotificationsAsync();
//         let tok = false;
//         console.log('tokenドキュメント作成開始');

//         if(tokendoc.exists()){
//           console.log('tokens内にドキュメントが存在します');
//           const tokendocument = tokendoc.data().token;
//           tokendocument.map((tk, index) => {
//             if(tk != currentToken){
//               console.log('tokenがまだ存在しないので保存します');
//               tok = true;
//             }
//           });
//           await updateDoc(tokendocs, {
//             token: arrayUnion(currentToken)
//           })
//         }else{
//           console.log('tokenドキュメントが存在しません');
//           await setDoc(tokendocs, {
//             token: arrayUnion(currentToken),
//             userid: currentUserId
//           })
//         }
//       }
//       tokenset();
//     }, []);

//       useEffect(()=>{
//       //console.log('effict')
//       const getUserDate=async()=>{
//       if (isLogin) {
//         let stuser;
//         //const "appUserkey" = `${currentUserId}appUser`;
  
//         const loadname = async () => {
//           try {
//             const stringValue = await AsyncStorage.getItem("appUserkey");
//             if(stringValue != null){
//               const value = JSON.parse(stringValue);
//               stuser = value;
//               console.log('value',stuser);
//             }else{
//               console.log("例外処理");
//             }
//           } catch (e) {
//             console.log(e);
//             console.log('eroor!!');
//           }
//         };
  
//         loadname();

//         if (stuser != "") {
//           console.log('userinfo',stuser);

//           // 現在ログインしているユーザーのIDを取得
//           const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

//           async function fetchAllUserIds() {
//             // usersコレクションへの参照を取得
//             const usersCollectionRef = collection(db, "users");
            
//             // コレクションからすべてのドキュメントを取得
//             const querySnapshot = await getDocs(usersCollectionRef);
            
//             // 各ドキュメントのIDを反復処理して表示
//             if(userInfo.length === 0 ){
//               querySnapshot.forEach(doc => {
//                           if(doc.id !== currentUserId){
//                             //console.log(`User Name: ${doc.data().userName}`);
//                             setUserInfo(prev=>[...prev, doc.data().userName]);
//                             //console.log(`User ID: ${doc.id}`);
//                             setUserInfoID(prev=>[...prev, doc.id]);   
//                           }

//                           });
//             }
            
//           }
          
//           // 関数を呼び出してusersコレクション内のドキュメントIDを取得
//           fetchAllUserIds();
//           // ユーザーデータを取得して格納
//           //setUserName(stuser.userName)
//           // setFaculty(stuser.faculty)
//           // setDepartment(stuser.department)
//           // setGrade(stuser.grade)
//           // setProfile(stuser.profile)
          
//           //const count = stuser.chatroomID.length;
//           let i = 0;
//           {/*for(i=0;i<count;i++){
//             setChatroom(prev=>[...prev, stuser.chatroomID[i]]);
//           }*/}
//           //setChatroom(stuser.chatroomID);

//           // const oldSettingdata= {
//           //   id: stuser.id,
//           //   userName: stuser.userName,
//           //   faculty:stuser.faculty,
//           //   department:stuser.department,
//           //   grade:stuser.grade,
//           //   profile:stuser.profile,
//           // };
//           // setOldData(oldSettingdata)

//         } else {
//          setUserName('未登録')
//          setFaculty('未登録')
//          setDepartment('未登録')
//          setGrade('未登録')
//          setProfile('未登録')
//          //setImage('https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65ec0b64&is=65d99664&hm=ef893886242657f90f84a93b7de86f6ebe1176f010b0212116a7c91b30d1d789&=&format=webp&width=1012&height=1012')
//          setIsCompress(false)
//         }
//       } else {
//       }
//     }
//     getUserDate();

//     const currentUserId = auth.currentUser.uid;
//     const refFiresrore = doc(db, `users/${userUUID}`);

//     const chatroomsRef = collection(db, 'chat');
//     getDocs(chatroomsRef).then(async snapshot => {//ここからエラー発生
//     // 各chatroomについて処理
//     for (const doc of snapshot.docs) { 
//     // 各chatroomのusersサブコレクションに対するクエリを実行
//     const usersRef = collection(db, `chat/${doc.id}/users`);
//     const q = query(usersRef, where('id', '==', currentUserId));
//     const userSnapshot = await getDocs(q);
//     const notq = query(usersRef, where('id', '!=', currentUserId));
//     const notuserSnapshot = await getDocs(notq);

//     if (!userSnapshot.empty) {
//       notuserSnapshot.forEach((userDoc) => {
//         const username = userDoc.data().name; // ユーザー名の取得
//         //console.log(`User name in chat: ${username}`);
//       //if(chatroom.length === 0){
//           setChatroom(prev=>[...prev, username]);
//           setChatid(prev=>[...prev, doc.id]);
//       //}
//     });
//     }
//     }
//     }).catch(error => {
//       console.error("Error getting chatrooms:", error);
//     });

//       // このコンポーネントが不要になったら監視を終了する
//   }, [userUUID]);


//   }

//   async function createChatroomStructure(anotherName:string, anotherID:string) {

//     const currentUserId = auth.currentUser.uid;
//     let stuser;
//     //const "appUserkey" = `${currentUserId}appUser`;

//     const loadname = async () => {
//       try {
//         const stringValue = await AsyncStorage.getItem("appUserkey");
//         if(stringValue != null){
//           const value = JSON.parse(stringValue);
//           stuser = value;
//           console.log('value',stuser);
//         }else{
//           console.log("例外処理");
//         }
//       } catch (e) {
//         console.log(e);
//         console.log('eroor!!');
//       }
//     };

//     loadname();
//     const docc = stuser.userName;

//     // chatroomsコレクションに新しいドキュメントを追加し、IDを自動生成させる
//     const chatroomRef = await addDoc(collection(db, "chat"), { creationTime: Timestamp.now(), userid: [currentUserId,anotherID], username: [docc, anotherName]  });
    
//     /*setChatroom(prevChatrooms => [...prevChatrooms, {
//       id: chatroomRef.id,
//       name: "Chatroom", // ここで適切なチャットルーム名を設定
//     }]);*/

//     //console.log("Chatroom created with ID: ", chatroomRef.id);
  

    
//     const refFiresrore = doc(db, `users/${userUUID}`);
//     const snapuser = collection(db, "users");
    
//     // chatroomのusersサブコレクションにドキュメントを追加し、IDを自動生成させる
//     //await addDoc(collection(chatroomRef, "users"), { name: appUser.userName, id: currentUserId });
//     //await addDoc(collection(chatroomRef, "users"), { name: anotherName, id:  anotherID});

//       //await setDoc(doc(db, `chat/${chatroomRef.id}/users`, currentUserId), {
//         //name: appUser.userName, // 現在のユーザー名
//         //id: currentUserId // 現在のユーザーID
//       //});

//       //await setDoc(doc(db, `chat/${chatroomRef.id}/users`, anotherID), {
//         //name: anotherName, // もう一方のユーザー名
//         //id: anotherID // もう一方のユーザーID
//       //});

//     //console.log("Chatroom structure created");

//     //setChatroom(prev => [ ...prev, anotherName]);
//     //setChatid(prev => [...prev, chatroomRef.id]);
//     setChatdoc(chatroomRef.id);
//     //console.log("引き渡す前のidの値は",chatroomRef.id);
//     const iduser = chatroomRef.id;

//     return iduser;

//   };

//   useEffect(()=>{
//     if(isLogin){
//           const currentUserId = auth.currentUser.uid;
//     const usersRef = collection(db, 'chat');
//     //const q = query(usersRef, orderBy("creationTime", "desc"));
//     const q2 = query(usersRef, where("userid", "array-contains", currentUserId),orderBy("creationTime", "desc"));

//     const unsubscribe = onSnapshot(q2, (querySnapshot) => {
//       console.log('オン砂実行');
//       //console.log('onSnapが実行されました');
//       //console.log('ステートフックが初期化されました');
//       setChatroom([]);
//       setChatid([]);
//       setStatus([]);
//       setLatest([]);
//       //let arrayid = new Set();
//       let array = [];
//       let arrayid = [];
//       let arrayids = [];
//       let arraystatus = [];
//       let arraylatest = [];
      
//         querySnapshot.docs.map(doc => {
//           const docData = doc.data();
//             //console.log('メッセージフィールドが存在します');
//             const contentname = doc.data().username;
//             const contentids = doc.data().userid;
//             const contentid = doc.id;
//             arrayid = [...arrayid, contentid];
//             contentname.map((nm, index) =>{
//               if(contentids[index] != currentUserId){
//                 array = [...array, nm];
//                 arrayids = [...arrayids, contentids[index]];
                
//               }
//             });
//         });

//         const contentname = async() => {
//           //console.log('contentnameが呼び出されました');
//           const currentUserId = auth.currentUser.uid;
//           let i = 0;
//           console.log('ids',arrayids);          
//           setChatroom(array);
//           setImage(arrayids);
//           setStatus(arraystatus);
//           setLatest(arraylatest);
//           //console.log('imageは',arrayids);
//           //console.log('statusは',arraystatus);
//           //console.log('latestmessagesは',arraylatest);

//           //const key = currentUserId;

//           //idの保存
//           const removeStorageid = async () => {
//             try {
//               await AsyncStorage.removeItem('roomidkey');
//               //console.log('Storage item removed successfully');
//             } catch (error) {
//               console.error('Error removing storage item: ', error);
//             }
//           };
          
//           // 使用例
//           removeStorageid();

          
          
//           const saveroomid = async () => {
//             try {
//               const stringValue = JSON.stringify(arrayid);
//               await AsyncStorage.setItem('roomidkey', stringValue);
//               //console.log(`メッセージが${currentUserId}さんのローカルに保存されました`);
//             } catch (e) {
//               console.log(e);
//             }
//           };
        
//             saveroomid();
//             //console.log('ルームidの情報の保存が実行され、その値は',arrayid);


//             //roomnameの保存
//             const removeStoragename = async () => {
//               try {
//                 await AsyncStorage.removeItem('roomnamekey');
//                 //console.log('Storage item removed successfully');
//               } catch (error) {
//                 console.error('Error removing storage item: ', error);
//               }
//             };
            
//             // 使用例
//             removeStoragename();
  
            
            
//             const saveroomname = async () => {
//               try {
//                 const stringValue = JSON.stringify(array);
//                 await AsyncStorage.setItem('roomnamekey', stringValue);
//                 //console.log(`メッセージが${currentUserId}さんのローカルに保存されました`);
//               } catch (e) {
//                 console.log(e);
//               }
//             };
          
//               saveroomname();
//               //console.log('ルームidの情報の保存が実行され、その値は',array);


//               const savecurrentid = async (currentUserId:string) => {
//                 try {
//                   const stringValue = JSON.stringify(currentUserId);
//                   await AsyncStorage.setItem('currentid', stringValue);
//                   //console.log(`メッセージが${currentUserId}さんのローカルに保存されました`);
//                 } catch (e) {
//                   console.log(e);
//                 }
//               };
            
//                 savecurrentid(currentUserId);
          

//         };
//         contentname();
//         setChatroom(array);
//         setChatid(arrayid);
//         setImage(arrayids);
//         setStatus(arraystatus);
//         setLatest(arraylatest);

        
//     });
//     return () => unsubscribe();
//     }
    
//   },[]);




      
//   return (
//     <ScrollView>
//       <View>
//         <HeaderforTextbook2 />
//           <View style={styles.List}>
//             { userInfo.map((info, index) => 
//             <TouchableOpacity key={index} style={styles.userList}
//               onPress={async() => {
                
//                 const idcode = await createChatroomStructure(info, userInfoID[index]);
//                 //console.log("引き渡すまじの直前のid",idcode);
//                 setNameindi(info);
//                 const timekey = `${idcode}time`;
//                 const timestamp = Timestamp.now();
//                 const timestampString = timestamp.toDate().toISOString();
    
//                 // async-storageに保存
//                 const saveTimestamp = async () => {
//                 try {
//                     await AsyncStorage.setItem(timekey, timestampString);
//                 } catch (e) {
//                     // 保存エラーの処理
//                     console.error("Error saving timestamp", e);
//                 }
//                 };
    
//                 await saveTimestamp();

//                 const loadTimestamp = async () => {
//                   console.log('uuuuuuuu')
//                   try {
//                     const timestampString = await AsyncStorage.getItem(timekey);
//                     if (timestampString !== null) {
//                       console.log('nullでないです');
//                       // 文字列をDateオブジェクトに変換
//                       const date = new Date(timestampString);
                      
//                       // 必要に応じてFirestoreのTimestampに変換
//                       // const timestamp = Timestamp.fromDate(date);
//                       console.log('setLasttime',setLasttime);
//                       setLasttime(date);
                      
//                     }else{
//                       setLasttime(0);
//                       console.log('nullです');
//                     }
//                   } catch (e) {
//                     // 読み込みエラーの処理
//                     console.error("Error loading timestamp", e);
//                   }
//                   console.log('エラー処理は行われませんでした');
//                 };
            
//                 await loadTimestamp();


//                 navigation.navigate('チャットルーム', {id:idcode, name: info, type:'chat', ids: image[index]});
//             }}><Text>{info+"さんに連絡する"}</Text>
//             </TouchableOpacity>)}
//           </View>
//           <View>
//             <Text>{userName + "さんのチャット欄"}</Text>
//           </View>
//           <View style={styles.talkroom}>
//             {chatroom.map((chatroomindi, index) => 
//             <TalkRoom key={index} chatroom={chatroomindi} chatid={chatid[index]} ids={image[index]} navigation={navigation} status={status[index]} latest={latest[index]}/>)}
//           </View>


//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({

//   talkroom: {
//     height:'100%',
//     paddingTop: 5
//     // backgroundColor: 'red',
//     // justifyContent: 'flex-end', // Align content vertically in the center
//     // alignItems: 'center', // Align content horizontally in the center
//   },
//   userList:{
//     paddingTop: 5,
//     backgroundColor: 'skyblue',
//     borderRadius: 10,
//     borderWidth: 1,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   List:{
//     height: 500
//   }
// });
