import { KeyboardAvoidingView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderforTextbook5 } from '../../../../component/Textbook/HeaderforTextbook5';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import TalkRoom from '../../../../component/Textbook/Chat/TalkRoom';
import React, { useState ,useEffect, useRef} from 'react';
import {Keyboard, ScrollView, TextInput, TouchableOpacity, Image,Platform, Settings} from 'react-native';
//import ActionSheet from '@yfuks/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db,storage} from '../../../../../firebase';
import { connect } from 'react-redux'
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import State from '../../../../redux/states/userState';
import { handleLoginAfterPageName } from '../../../../redux/actions/commonAction';
import { arrayUnion, arrayRemove, updateDoc, Timestamp, deleteDoc, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
import { UseDispatch } from 'react-redux';
import { fetchUserObject, setUserObject } from '../../../../redux/actions/userAction';
//import { FooterChat } from '../../../../component/Textbook/FooterChat'
import { RootTalk } from './RootTalk';
import { useTalkContext } from '../../../../component/Textbook/Chat/TalkContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { writeBatch } from "firebase/firestore";

// 既にある db インスタンスを使用してバッチを作成
const batch = writeBatch(db);

export const Chatroom=({route, navigation})=>{
    const { me, setMe, nameindi, setNameindi, chatmessage, setChatmessage, lasttime, setLasttime  } = useTalkContext();
    const {id, name, type, ids} = route.params;
    //console.log("chatroom内のidは",id);
    const [iduser, setIduser] = useState('');
    const [image, setImage] = useState('djJgmj1rweZiL3aORlpYW3OAOYN2');
    const [check, setCheck] = useState(false);
    const [urli, setUrli] = useState('');
    const [newmessage, setNewmessage] = useState([]);
    const [doccheck, setDoccheck] = useState(false);
    const key = `${id}`;
    //console.log('key',key);

    const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
    const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
    const dispatch: Dispatch = useDispatch();
    const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
    const scrollViewRef = useRef();
    if(!isLogin||isLoginNotVerificationEmail){
      //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
      console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
      
      useEffect(() => {
    
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

      useEffect(()=>{
        setUrli(ids);
    },[]);

    useEffect(()=>{
      setNameindi(name);
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

  useEffect(() => {
    
    const key = `${id}`;
    //console.log('key', key);
    setChatmessage([]);
    let almes = [];
    const loadmess = async (key:string) => {
      try {
        const stringValue = await AsyncStorage.getItem(key);
        if(stringValue != null){
          const value = JSON.parse(stringValue);
          setChatmessage(value);
          almes = value;
          //console.log('valueの値は',value);
          //console.log('messageは取得できました');
      }
      } catch (e) {
        console.log(e);
      }
    };

    loadmess(key);
    const currentUserId = auth.currentUser.uid;
    const documet = collection(db, `${type}/${id}/messages`);
    const docume = query(documet, where("unreaduser", "array-contains", currentUserId), orderBy("sentAt", "asc"));
    let messageid = [];
    const unsubscribe = onSnapshot(docume, async (querySnapshot) => {
      //console.log(`${currentUserId}個数は`,querySnapshot.size);
      console.log('onsnapshot実行');
      
      if (!querySnapshot.empty) {
        const batch = writeBatch(db); // バッチの初期化
        let messages = [];
  
        querySnapshot.forEach((doc) => {
          const contentData = doc.data();
          const messagecon = contentData.content;
          const messagesid = contentData.id;
          const messagename = contentData.name;
          const messageread = contentData.read;
          const messagesentat = contentData.sentat;
          const messagetime = contentData.time;
          const newMessage = contentData.unreaduser.filter(id => id !== currentUserId);
          const booleanCheck1 = contentData.unreaduser.includes(currentUserId);
          //const readindex = contentData.unreaduser.length;
          //let messagelength = messages.length;
          let boolid = messageid.includes(doc.id);
          if(booleanCheck1 == true && boolid == false){
            messageid = [...messageid, doc.id];
            //console.log('messageidは',messageid);
            messages.push({content: messagecon, id: messagesid, name: messagename, read: true, sentAt: messagesentat, time: messagetime});
            batch.update(doc.ref, {unreaduser: arrayRemove(currentUserId)});
          }

          
        });

        setChatmessage(prevMessages => [...prevMessages, ...messages]);
        almes = [...almes, ...messages];
        //console.log(`${currentUserId}newmess:`,almes);
        //console.log('key2', key);
                  // AsyncStorage に保存
          const savemessage = async (key:string) => {
            try {
              const stringValue = JSON.stringify(almes);
              await AsyncStorage.setItem(key, stringValue);
              //console.log('保存が実行されました');
              //console.log(`メッセージが${currentUserId}さんのローカルに保存されました`);
            } catch (e) {
              console.log(e);
            }
          };
        savemessage(key);
        
        // 状態の更新
        
  
        // バッチ処理のコミット
        try {
          await batch.commit();
          console.log('All documents updated successfully');

        } catch (error) {
          console.error('Error updating documents or saving to AsyncStorage:', error);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);
  


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
                <HeaderforTextbook5 ids={ids}/>
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
                                  <View></View>
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
                        <RootTalk id={id} type={type} ids={ids}/>
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