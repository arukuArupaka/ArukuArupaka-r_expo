import { KeyboardAvoidingView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderforTextbook5 } from '../../../../component/Textbook/HeaderforTextbook5';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import TalkRoom from '../../../../component/Textbook/Chat/TalkRoom';
import React, { useState ,useEffect, useRef} from 'react';
import {Keyboard, ScrollView, TextInput, TouchableOpacity, Image,Platform, Settings} from 'react-native';
import ActionSheet from '@yfuks/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db,storage} from '../../../../../firebase';
import { connect } from 'react-redux'
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import State from '../../../../redux/states/userState';
import { handleLoginAfterPageName } from '../../../../redux/actions/commonAction';
import { updateDoc, Timestamp, deleteDoc, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
import { UseDispatch } from 'react-redux';
import { fetchUserObject, setUserObject } from '../../../../redux/actions/userAction';
//import { FooterChat } from '../../../../component/Textbook/FooterChat'
import { RootTalk } from './RootTalk';
import { useTalkContext } from '../../../../component/Textbook/Chat/TalkContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Chatroom=({route, navigation})=>{
    const { chatmessage, setChatmessage  } = useTalkContext();
    const {id, name, type, ids} = route.params;
    //console.log("chatroom内のidは",id);
    const [iduser, setIduser] = useState('');
    const [image, setImage] = useState('djJgmj1rweZiL3aORlpYW3OAOYN2');
    const [check, setCheck] = useState(false);
    const [urli, setUrli] = useState('');
    const key = `${id}`;
    console.log('key',key);

    const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
    const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
    const dispatch: Dispatch = useDispatch();
    const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
    const scrollViewRef = useRef();
    if(!isLogin||isLoginNotVerificationEmail){
      //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
      console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
      

      useEffect(() => {
        
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }
        );
    
        return () => {
          keyboardDidShowListener.remove();
        };
      }, []);
  
      useEffect(() => {
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 1000); // 100ミリ秒後に実行
        }, []);

      useEffect(()=>{
        const loadmess = async (key:string) => {
          try {
            const stringValue = await AsyncStorage.getItem(key);
            if(stringValue != null){
              const value = JSON.parse(stringValue);
              setChatmessage(value);
              //console.log('messageは取得できました');
          }
          } catch (e) {
            console.log(e);
          }
        };
  
        loadmess(key);

        const loaduserid = async () => {
          try {
            const stringValue = await AsyncStorage.getItem('currentid');
            if(stringValue != null){
              const value = JSON.parse(stringValue);
              setIduser(value);
              //console.log('useridは',value);
          }
          } catch (e) {
            console.log(e);
            //console.log('取得できません!');
          }
        };
  
        loaduserid();

      },[]);

    }else{

      /*const getdata = async() =>{
        const currentUserId = auth.currentUser.uid;
        const refFiresrore = doc(db, `users/${userUUID}`);
        const snap = await getDoc(refFiresrore);
        const snapuser = collection(db, "users");
        const usersINFO = await getDocs(snapuser);

        const appUser = (await getDoc(refFiresrore)).data() as User;

        const name=appUser.userName;

        try {
          const stringValue = JSON.stringify(name);
          await AsyncStorage.setItem('currentname', stringValue);
        } catch (e) {
          console.log(e);
        }
        console.log('ルームidの情報の保存が実行され、その値は',name);
    };
      
      getdata();*/

      useEffect(()=>{
        setUrli(ids);
    },[]);

    useEffect(()=>{
    //console.log('idsの値は',ids);
        if(ids == '1qkYVAZr1ke2OdH5srFoBUKbfiK2'){
            //const url = 'users/1qkYVAZr1ke2OdH5srFoBUKbfiK2/mainPicture';
            getDownloadURL(ref(storage, 'users/1qkYVAZr1ke2OdH5srFoBUKbfiK2/mainPicture.jpg')).then((getURI)=>{
                    setImage(getURI)//ここに画像のurlが入ります。
                }).
                catch((e)=>{
                    //console.log(e.message)
                    //console.log('マグロさんです');
                }).then(()=>{
                    setCheck(true);
                })
        }else{
            //console.log('マグロさんじゃありません');
            getDownloadURL(ref(storage, `users/${ids}/mainPicture`)).then((getURI)=>{
                    setImage(getURI)//ここに画像のurlが入ります。
                }).
                catch((e)=>{
                    //console.log(e.message)
                }).then(()=>{
                    setCheck(true);
                })
        }

    },[urli])
    
  useEffect(()=>{
    const loaduserid = async () => {
      try {
        const stringValue = await AsyncStorage.getItem('currentid');
        if(stringValue != null){
          const value = JSON.parse(stringValue);
          setIduser(value);
          //console.log('useridは',value);
      }
      } catch (e) {
        console.log(e);
        //console.log('取得できません!');
      }
    };

    loaduserid();
  },[]);


  useEffect(() => {

    const getdata = async() =>{
        const currentUserId = auth.currentUser.uid;
        const refFiresrore = doc(db, `users/${userUUID}`);
        const snap = await getDoc(refFiresrore);
        const snapuser = collection(db, "users");
        const usersINFO = await getDocs(snapuser);

        const appUser = (await getDoc(refFiresrore)).data() as User;

        const name=appUser.userName;

        //setNameuser(name);

        //console.log("名前は",name);

        return name;
    };

    getdata();

    // コンポーネントがマウントされた時に実行
    const unsubscribe = navigation.addListener('focus', () => {
      // この画面がフォーカスされた時にタブバーを非表示にする
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // コンポーネントがアンマウントされる時に実行
    const unsubscribe = navigation.addListener('blur', () => {
      // この画面から離れる時にタブバーを再表示する
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    setChatmessage([]); 

    const chatroomsRef = collection(db, `${type}`);
    //getDocs(chatroomsRef).then(async snapshot => {//ここからエラー発生
    // 各chatroomについて処理
    // 各chatroomのusersサブコレクションに対するクエリを実行
    const usersRef = collection(db, `${type}`);
    //const q = query(usersRef, orderBy("createTime", "asc"));
    const docume = doc(db, `${type}/${id}`);
    const unsubscribe = onSnapshot(docume, (querySnapshot) => {
        //querySnapshot.docs.map(doc => {
            const docData = querySnapshot.data();
            let array = [];
            //const date = docData.sentAt.toDate();
                    // 時間、分、秒を取得
          if("messages" in docData){
            const currentUserId = auth.currentUser.uid;
              const messInfo = docData.messages;
              //console.log('currentuserIdは',currentUserId);

            messInfo.map((indi, index)=>{
              //const hours = indi.sentAt.getHours();
              //const minutes = indi.sentAt.getMinutes();
              //const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
              if(indi.id != currentUserId){
                const ar = {name: indi.name, id: indi.id, content: indi.content, sentAt: indi.sentAt, time: indi.time, read: true};
                array = [...array, ar];
              }else{
                const ar = {name: indi.name, id: indi.id, content: indi.content, sentAt: indi.sentAt, time: indi.time, read: indi.read};
                array = [...array, ar];
              }
              
            })

            const asyncChange = async(array:any) =>{
              updateDoc(docume, {
                messages: array
              });
            };

            asyncChange(array).then(()=>{
              setChatmessage(array);
            });
            
            //setChatmessage(array);
            // 時間の文字列を HH:mm:ss 形式でフォーマット
            // ゼロ埋め（.toString().padStart(2, '0')）を使って、常に2桁で表示する
              //const currentUserId = auth.currentUser.uid;
            
              //console.log(chatmessage);
              scrollViewRef.current?.scrollToEnd({ animated: true });

              const removeStoragemess = async (key:string) => {
                try {
                  await AsyncStorage.removeItem(key);
                  //console.log('Storage item removed successfully');
                } catch (error) {
                  console.error('Error removing storage item: ', error);
                }
              };
              
              // 使用例
              removeStoragemess(key);

              const savemessage = async (key:string) => {
                try {
                  const stringValue = JSON.stringify(array);
                  await AsyncStorage.setItem(key, stringValue);
                  //console.log(`メッセージが${currentUserId}さんのローカルに保存されました`);
                } catch (e) {
                  console.log(e);
                }
              };
            savemessage(key);
            //console.log('新着メッセージの保存が実行され、その値は');
          }else{
            //console.log('存在しないので実行できませんでした');
          }


        //});
        //if(chatmessage.length == 0){

        

        //}
    });
    
    return () => unsubscribe();
    
    /*const querySnapshot = await getDocs(q);
    //const userSnapshot = await getDocs(usersRef);
    setChatmessage([]);

    if (!querySnapshot.empty) {
        querySnapshot.forEach((userDoc) => {
        const name = userDoc.data().name;
        const content = userDoc.data().content;
        const messageInfo = {name, content}; // ユーザー名の取得
        console.log(`User name in chat: ${name}`);
        setChatmessage(prev => [...prev, messageInfo]);
        console.log('chatmessageの中身はないので実行されます');
    });
    }else{
        setChatmessage([]);
    }
    }).catch(error => {
      console.error("Error getting chatrooms:", error);
    });*/

    },[]);

    /*useEffect(()=>{
        const deleteDocument = async (collectionName, documentId) => {
            try {
            await deleteDoc(doc(db, collectionName, documentId));
            console.log("ドキュメントを削除しました");
            } catch (error) {
            console.error("ドキュメントの削除に失敗しました:", error);
            }
        };
      // 使用例: 'users' コレクションから 'userId' のドキュメントを削除
      deleteDocument('users', 'userId');
    },[])*/
    

      


    const scrollViewRef = useRef();




    }

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      );
  
      return () => {
        keyboardDidShowListener.remove();
      };
    }, []);
    
    useEffect(() => {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 1000); // 100ミリ秒後に実行
      }, []);

      useEffect(() => {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 1000); // 100ミリ秒後に実行
      }, [chatmessage]);
      

    //console.log('iduserの値は',iduser);
    //console.log('messageの作成者は',chatmessage[0].id);
    return(
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
        >
            <View style={{flex: 1}}>
                <HeaderforTextbook5 />
                {/*<SafeAreaView style={{ flex: 5 }}>*/}
                    <ScrollView ref={scrollViewRef}>
                        <View style={styles.box}>
                        {chatmessage.map((message:any, index:number) => (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                //alignItems: 'center',
                                flexDirection: 'column',
                                paddingBottom: 10,
                                alignItems: message.id == iduser ? 'flex-end' : 'flex-start',
                            }} key={index}>
                              <View style={{flexDirection: 'row'}}>
                                { message.id != iduser ? <View style={{paddingRight: 3}}>
                                  { check == true ? <View style={{height: 40, width: 40, borderRadius: 200, backgroundColor: '#888888'}}><Image source={{uri: image}} style={{height: 40, width: 40, borderRadius: 200}}/></View> : <View style={{height: 40, width: 40, borderRadius: 200, backgroundColor: '#888888'}}></View>}
                                </View> : <View></View>}
                                <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
                                  { message.id == iduser ? (message.read == false ? <View></View> : <AntDesign name="check" size={18} color="dodgerblue" />) : <View></View>}
                                  { message.id == iduser ? <Text style={{paddingRight: 3}}>{message.time}</Text> : <View></View>}
                                </View>
                                <View style={{
                                    backgroundColor: message.id == iduser ? 'dodgerblue' : '#888888',
                                    padding: 8,
                                    borderRadius: 20,
                                    paddingBottom: 10,
                                    maxWidth: '80%',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{color: 'white', fontSize: 15}}>{message.content}</Text>
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                                  { message.id == iduser ? <View></View> : <Text style={{paddingLeft: 3}}>{message.time}</Text>}
                                </View>
                              </View>
                                
                            </View>  
                        ))}
                        </View>
                    </ScrollView>
                    <View style={{zIndex: 200}}>
                        <RootTalk id={id} type={type}/>
                    </View>
                {/*</SafeAreaView>*/}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles=StyleSheet.create({
    body: {
        height: '100%'
    },
    box: {
        paddingTop: 50,
        paddingLeft: 5,
        paddingRight: 5,
        height: '100%',
        paddingBottom: 40,
    },
    inbox: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 15,
        alignItems: 'flex-start',
    }
})
//export default Chatroom;