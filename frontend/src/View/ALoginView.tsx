import React, { useState } from 'react';
import {Alert,Text, View,Image, TouchableOpacity,TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const ALoginView = (props) => {

    const [showCreateAccount,setShowCreateAccount]=useState(false)

    const onPressBackHome = () => {
        Alert.alert(
            'アカウントは作成されていません', 
            '送られたメールからアカウントを認証してください。',
        [
            {
            text: '登録を続ける',
            onPress: () => {},
            style: 'cancel',
            },
            {text: 'HOME画面に戻る', onPress: () => props.navigation.navigate('Home')},
        ]);
    };

  return (
    <View
      style={{
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center',
        height:'100%',
        backgroundColor:'#FFFFFF'
      }}>
        <TouchableOpacity
          onPress={()=>onPressBackHome()}
          style={{
            position:'absolute',
            top:70,
            left:30,
            backgroundColor:'#D9D9D9',
            borderRadius:50,
            height:40,
            width:40,
          }}
        >
          <Ionicons name="arrow-back" style={{marginVertical:6,color:'white',textAlign:'center'}} size={24} color="black" />
        </TouchableOpacity>
        <View style={{
            marginBottom:30
        }}>
            <Text style={{textAlign:'center',fontWeight:'800',fontSize:20,paddingBottom:50}}>アカウント作成</Text>
            <Image style={{height:150,width:150,borderRadius:100}} source={require('../image/logo/icon-1024.png')}></Image>
        </View>
        <View style={{backgroundColor:'#EEEEEE',width:'80%',padding:20,borderRadius:10}}>
            <Text>ログインすることでできること</Text>
            <Text>・マップで友達と位置情報が共有できる</Text>
            <Text>・マップで施設の情報を自由に編集できる</Text>
            <Text>・Ritsu-Matchの機能を利用できる</Text>
            <Text>・教科書フリマが使用できるようになる</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom:20,width:'100%'}}>
        <TouchableOpacity style={{flex:1}}><Text style={{textAlign:'center',color:'#C8252B'}}>ログインはこちら</Text></TouchableOpacity>
        {/* <TouchableOpacity style={{flex:1}}><Text style={{textAlign:'center'}}>パスワードを忘れた場合</Text></TouchableOpacity> */}
        </View>
        <TouchableOpacity
            onPress={()=>setShowCreateAccount(true)}
        >
            <Text style={{}}>さあ、あなたも！</Text>
            <Fontisto style={{textAlign:'center'}} name="angle-down" size={40} color="black" />
        </TouchableOpacity>
        {showCreateAccount&&<View style={{width:'80%'}}><View style={{backgroundColor:'#EEEEEE',borderRadius:10,marginBottom:20,padding:20}}>
                <Text>メールアドレスを入力</Text>
                <TextInput style={{
                    borderBottomWidth:1,
                    marginTop:5,
                    borderRadius:5,
                    marginBottom:5}}></TextInput>
                <Text>パスワードを入力</Text>
                <TextInput style={{
                    borderBottomWidth:1,
                    marginTop:5,
                    borderRadius:5,
                    marginBottom:5}}></TextInput>
            </View>
                <TouchableOpacity style={{backgroundColor:'#C8252B',padding:5,borderRadius:5}}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>登録</Text>
                </TouchableOpacity>
            </View>
            }
    </View>
  );
};
export default ALoginView;