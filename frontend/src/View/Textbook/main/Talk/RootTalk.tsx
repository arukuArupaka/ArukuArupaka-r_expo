import { Keyboard, KeyboardAvoidingView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderforTextbook2 } from '../../../../component/Textbook/HeaderforTextbook2';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import TalkRoom from '../../../../component/Textbook/Chat/TalkRoom';
import React, { useState ,useEffect, useRef} from 'react';
import {ScrollView, TextInput, TouchableOpacity, Image,Platform, Settings} from 'react-native';
import ActionSheet from '@yfuks/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db,storage} from '../../../../../firebase';
import { connect } from 'react-redux'
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import State from '../../../../redux/states/userState';
import { handleLoginAfterPageName } from '../../../../redux/actions/commonAction';
import { arrayUnion, updateDoc, Timestamp, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
import { UseDispatch } from 'react-redux';
import { fetchUserObject, setUserObject } from '../../../../redux/actions/userAction';
import { useTalkContext } from '../../../../component/Textbook/Chat/TalkContext';
//import { Timestamp } from 'firebase-admin/firestore';

//import { RootState } from './state';

type TalkRoomProps = {
    id:string;
    name:string;
  };

export const RootTalk = ({id, name}) => {
    //console.log("RootTalk内のidは",id);
    const { click, setClick,chatmessage, setChatmessage  } = useTalkContext();
    const [inputValue, setInputValue] = useState('');
    const [add, setAdd] = useState(false);

    const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
    const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
    const dispatch: Dispatch = useDispatch();
    const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
    if(!isLogin||isLoginNotVerificationEmail){
      //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
      //console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
    }


    async function createChatroomStructure(content:string) {

        const currentUserId = auth.currentUser.uid;

        // chatroomsコレクションに新しいドキュメントを追加し、IDを自動生成させる

        const refFiresrore = doc(db, `users/${userUUID}`);
        const snap = await getDoc(refFiresrore);
        const snapuser = collection(db, "users");
        const usersINFO = await getDocs(snapuser);
    
        const appUser = (await getDoc(refFiresrore)).data() as User;
        
        // chatroomのusersサブコレクションにドキュメントを追加し、IDを自動生成させる
        //await addDoc(collection(chatroomRef, "users"), { name: appUser.userName, id: currentUserId });
        //await addDoc(collection(chatroomRef, "users"), { name: anotherName, id:  anotherID});
    
        const check = doc(db, `chat/${id}`);
        const checkdoc = await getDoc(check);
        const checkmes = checkdoc.data();
        const timestamp = Timestamp.now(); // Firestoreの現在のタイムスタンプを取得
        const date = timestamp.toDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours.toString(); // 時間を文字列に変換
        const formattedMinutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString(); // 分が10未満の場合は先頭に0を追加

        const timeString = `${formattedHours}:${formattedMinutes}`; // "時間:分"の形式の文字列を生成



          await updateDoc(check, {
            messages: arrayUnion({name: appUser.userName,content: content, sentAt: Timestamp.now().toDate().toLocaleString(),id: currentUserId,  time:timeString, read: false})
          });

          //console.log("現在時刻は",Timestamp.now()) ;
        //console.log("Chatroom structure created");
    
        const name = appUser.userName;
        const info = {name, content};

        /*const col = doc(db, "chat",`${id}`);
        await updateDoc(col, {
          creationTime: Timestamp.now(), // 更新したいフィールド名と新しい値
          // 複数のフィールドを更新することも可能
        });*/
    
        //setChatmessage(prev=>[...prev, info]);
        //console.log(info);
        
        setInputValue('');
    
      };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.keyboardAvoidingView}
     // keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 100}
    >
      <View style={styles.body}>
        <TextInput 
          style={styles.input} 
          placeholder="メッセージを入力"
          value={inputValue}
          onChangeText={(text)=>{setInputValue(text);}}
        />
        <View style={styles.button}>
          <TouchableOpacity 
          onPress={() => {createChatroomStructure(inputValue); Keyboard.dismiss();            
           const asyncChange = async(id:string) => {
            await updateDoc(doc(db, 'chat', id), {
                creationTime: Timestamp.now()
          });
        };
        asyncChange(id);
        }}
          >
            <Text>送信</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    width: '100%'
  },
  body: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white', // 背景色を追加して視覚的にわかりやすくする
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    width: 250,
    paddingLeft: 5,
    marginRight: 10, // ボタンとの間隔を開ける
    height: '80%'
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    height: '80%'
  },
});
