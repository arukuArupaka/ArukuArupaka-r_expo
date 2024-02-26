import React, { useState } from 'react';
import {Text, View,Image} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

const MapMyselfContainer = () => {

  const [userName,setUserName]=useState('')

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  //setUserName(useSelector((state)=>{state.user.userObject}).userName)
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
  if(!isLogin||isLoginNotVerificationEmail){
  }
  const userObject=useSelector((state)=>state.user.userObject)
  console.log(userObject.userImage)
  return (
    <View
      style={{
        height:200,
        paddingTop:10,
        paddingHorizontal:15,
      }}>
      <Text style={{fontSize:22,paddingBottom:10}}>自分の設定</Text>
      <View style={{flexDirection:'row'}}>
        <Image source={{uri:userObject.userImage}} style={{height:50,width:50,borderRadius:40,marginRight:10,}}/>
        <View>
          <Text style={{fontSize:10,marginTop:3,marginBottom:6}}>マップ上の表示名</Text>
          <Text style={{fontSize:15}}>{userObject.userName}</Text>
        </View>
      </View>
    </View>
  );
};
export default MapMyselfContainer;