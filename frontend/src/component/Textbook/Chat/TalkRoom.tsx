import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions } from 'react-native';
import {SafeAreaView } from 'react-native';
import { HeaderforTextbook2 } from '../../../component/Textbook/HeaderforTextbook2';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useState ,useEffect} from 'react';
import {TextInput, TouchableOpacity, Image, Settings} from 'react-native';
import ActionSheet from '@yfuks/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db,storage} from '../../../../firebase';
import { connect } from 'react-redux'
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import State from '../../../redux/states/userState';
import { handleLoginAfterPageName } from '../../../redux/actions/commonAction';
import { Timestamp, addDoc, doc, getDoc, setDoc , collection, getDocs } from '@firebase/firestore';
import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {manipulateAsync,SaveFormat} from "expo-image-manipulator";
import { UseDispatch } from 'react-redux';
import { fetchUserObject, setUserObject } from '../../../redux/actions/userAction';
import { useNavigation } from '@react-navigation/native';
import { useTalkContext } from './TalkContext';

type TalkRoomProps = {
    chatroom: string;
    chatid: string;
    ids: string;
    status: boolean;
    navigation;
     // または chatroom の実際の型に応じて適切な型を指定します
  };

const TalkRoom: React.FC<TalkRoomProps> = ({ chatroom, chatid, ids, status }) => {
    const { click, setClick, nameindi, setNameindi, setChatid, setChatroom, chatmessage, setChatmessage} = useTalkContext();
    
    const navigation = useNavigation();
    
    const styles = StyleSheet.create({
        body:{
            //backgroundColor: 'blue',
            height: 60,
            //borderRadius: 20,
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    const [image, setImage] = useState('');
    const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
    const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
    const dispatch: Dispatch = useDispatch();
    const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
    if(!isLogin||isLoginNotVerificationEmail){
      //dispatch(handleLoginAfterPageName('home'))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではコメントアウトはずしてね
      console.log('ログインしていません');//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
    }

    console.log('idsの値は',ids);

    return (
        <TouchableOpacity onPress={()=>{
            setNameindi(chatroom);
            setClick(chatid);
            console.log('引き渡す前のclickid',chatid);
            navigation.navigate('チャットルーム', {id:chatid, name: chatroom, a: 1})
        }}>
            <View style={styles.body}>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        {status && <MaterialCommunityIcons name="new-box" size={24} color="red"/>}
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 15}}>{chatroom}</Text>
                    </View>
                </View>
                
            </View>
        </TouchableOpacity>
    )
};
export default TalkRoom;