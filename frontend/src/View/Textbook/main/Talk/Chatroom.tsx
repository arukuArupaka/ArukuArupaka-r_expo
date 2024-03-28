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
    const {id, name, a} = route.params;
    console.log("chatroom内のidは",id);
    const [nameuser, setNameuser] = useState('');
    const key = `${id}`;

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
    }else{
      const getdata = async() =>{
        const currentUserId = auth.currentUser.uid;
        const refFiresrore = doc(db, `users/${userUUID}`);
        const snap = await getDoc(refFiresrore);
        const snapuser = collection(db, "users");
        const usersINFO = await getDocs(snapuser);

        const appUser = (await getDoc(refFiresrore)).data() as User;

        const name=appUser.userName;

        return name;
    };

  useEffect(() => {

    const getdata = async() =>{
        const currentUserId = auth.currentUser.uid;
        const refFiresrore = doc(db, `users/${userUUID}`);
        const snap = await getDoc(refFiresrore);
        const snapuser = collection(db, "users");
        const usersINFO = await getDocs(snapuser);

        const appUser = (await getDoc(refFiresrore)).data() as User;

        const name=appUser.userName;

        setNameuser(name);

        //console.log("名前は",name);

        return name;
    };

    getdata();

    console.log('名前は',nameuser);

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

    const chatroomsRef = collection(db, 'chat');
    //getDocs(chatroomsRef).then(async snapshot => {//ここからエラー発生
    // 各chatroomについて処理
    // 各chatroomのusersサブコレクションに対するクエリを実行
    const usersRef = collection(db, `chat/${id}/messages`);
    const q = query(usersRef, orderBy("sentAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesuser = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            const date = docData.sentAt.toDate();
                    // 時間、分、秒を取得
            const hours = date.getHours();
            const minutes = date.getMinutes();

            // 時間の文字列を HH:mm:ss 形式でフォーマット
            // ゼロ埋め（.toString().padStart(2, '0')）を使って、常に2桁で表示する
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return {
            name: docData.name,
            content: docData.content,
            sentAt: timeStr // 時間のみの文字列を使用
        };
        });
        //if(chatmessage.length == 0){
            const currentUserId = auth.currentUser.uid;
            setChatmessage(messagesuser);
            console.log(chatmessage);
            scrollViewRef.current?.scrollToEnd({ animated: true });
            const savemessage = async () => {
              try {
                const stringValue = JSON.stringify(messagesuser);
                await AsyncStorage.setItem(key, stringValue);
                console.log(`メッセージが${currentUserId}さんのローカルに保存されました`);
              } catch (e) {
                console.log(e);
              }
            };
        
            savemessage();
            console.log('新着メッセージの保存が実行され、その値は',messagesuser);
            const asyncChange = async(id:string) => {
              await updateDoc(doc(db, 'chat', id), {
                  creationTime: Timestamp.now()
            });
          };
            asyncChange(id);
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
    }
    
    
      


    return(
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
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
                                alignItems: message.name == nameuser ? 'flex-end' : 'flex-start',
                            }} key={index}>
                                <View style={{
                                    backgroundColor: message.name == nameuser ? 'blue' : '#888888',
                                    padding: 8,
                                    borderRadius: 20,
                                    paddingBottom: 10,
                                    maxWidth: '80%'
                                }}>
                                    <Text style={{color: 'white', fontSize: 15}}>{message.content}</Text>
                                </View>
                                <Text>{message.sentAt}</Text>
                            </View>  
                        ))}
                        </View>
                    </ScrollView>
                    <View style={{zIndex: 200}}>
                        <RootTalk id={id} />
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