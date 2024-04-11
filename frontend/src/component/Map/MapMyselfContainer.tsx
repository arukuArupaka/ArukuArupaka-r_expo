import React, { useState } from 'react';
import {Text, View,Image,Switch} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../../firebase';
import { setMapUserObject } from '../../redux/actions/mapUserActions';

const MapMyselfContainer = () => {
  const userObject=useSelector((state)=>state.user.userObject)


  const mapUserObject =useSelector((state)=>state.map.mapUserObject)
  const userUUID=useSelector((state:State)=>state.user.userUUID||"") 

  const dispatch: Dispatch = useDispatch();

  console.log("mapUserObject on map myselfvontainer")
  console.log(userObject.userImage)
  console.log(mapUserObject)


  const [userName,setUserName]=useState('')
  const [isShowMyLocation,setIsShowMyLocation]=useState(mapUserObject.isLocationShare)

  const toggleSwitch = () => {

    const refFiresrore = doc(db, `mapGPS/${userUUID}`);

    let isShareLoactionObject={...mapUserObject}

    isShareLoactionObject.isLocationShare=!isShowMyLocation
    //console.log(isShareLoactionObject)

      setDoc(refFiresrore, isShareLoactionObject).then(() => {
        // 保存に成功したらコンテクストにユーザーデータを格納
        setIsShowMyLocation(isShareLoactionObject.isLocationShare)
        dispatch(setMapUserObject(isShareLoactionObject))
      });

  };

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  //setUserName(useSelector((state)=>{state.user.userObject}).userName)
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
  if(!isLogin||isLoginNotVerificationEmail){
  }
  return (
    <View
      style={{
        paddingTop:10,
        marginBottom:20,
      }}>
      <Text style={{fontSize:22,paddingBottom:10}}>自分の設定</Text>
      <View style={{flexDirection:'row'}}>
        <Image source={{uri:userObject.userImage}} style={{height:50,width:50,borderRadius:40,marginRight:10,}}/>
        <View style={{flex:1}}>
          <Text style={{fontSize:10,marginTop:3,marginBottom:6}}>マップ上の表示名</Text>
          <Text style={{fontSize:15}}>{userObject.userName}</Text>
        </View>
        <Text>{isShowMyLocation?'自分の位置を表示':'自分の位置を非表示'}</Text>
        <Switch 
            onValueChange={toggleSwitch}
            value={isShowMyLocation}/>
      </View>
    </View>
  );
};
export default MapMyselfContainer;