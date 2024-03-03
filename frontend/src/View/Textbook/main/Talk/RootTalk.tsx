import { KeyboardAvoidingView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderforTextbook2 } from '../../../../component/Textbook/HeaderforTextbook2';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import TalkRoom from '../../../../component/Textbook/Chat/TalkRoom';
import React, { useState ,useEffect} from 'react';
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
import { Timestamp, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
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
    console.log("RootTalk内のidは",id);
    const { chatmessage, setChatmessage  } = useTalkContext();
    const [inputValue, setInputValue] = useState('');

    const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
    const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
    const dispatch: Dispatch = useDispatch();
    const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
    if(!isLogin||isLoginNotVerificationEmail){
      //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
      console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
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
    
        const messageDocRef = await addDoc(collection(db, `chat/${id}/messages`), {
            name: appUser.userName, // 現在のユーザー名
            content: content, // 現在のユーザーID
            sentAt: Timestamp.now(),
          });
          console.log("現在時刻は",Timestamp.now()) ;
        console.log("Chatroom structure created");
    
        const name = appUser.userName;
        const info = {name, content};
    
        setChatmessage(prev=>[...prev, info]);
        console.log(info);
    
      };


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 100}
    >
      <View style={styles.body}>
        <TextInput 
          style={styles.input} 
          placeholder="メッセージを入力"
          clearTextOnFocus={true}
          onChangeText={(text)=>{setInputValue(text);}}
        />
        <View style={styles.button}>
          <TouchableOpacity 
          onPress={() => {createChatroomStructure(inputValue)}}
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
    flex: 1,
    borderRadius: 20
  },
  body: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'white', // 背景色を追加して視覚的にわかりやすくする
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    width: 250,
    paddingLeft: 5,
    marginRight: 10, // ボタンとの間隔を開ける
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2
  },
});
