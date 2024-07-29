import React, { useState ,useRef} from 'react';
import {Text, TouchableOpacity, View,TextInput,ScrollView,Alert} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import MapFriendListItem from './mapFriendListItem';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../../firebase';
import {useSelector,useDispatch} from 'react-redux';
import { setMapUserObject } from '../../redux/actions/mapUserActions';
import { getDownloadURL,ref } from 'firebase/storage';
import { storage } from '../../../firebase';

const MapFriendRegisteContainer = (props) => {

  const MapFriendListItemRef = useRef()
  const dispatch  = useDispatch();

  const [isSettingMyfrendLocation,setIsSettingMyfrendLocation]=useState(false)
  const mapUserObject =useSelector((state)=>state.map.mapUserObject)
  const userUUID=useSelector((state:State)=>state.user.userUUID||"") 

const onONChangeSwitch=(UUID)=>{
  if(isSettingMyfrendLocation){

    const refFiresrore = doc(db, `mapGPS/${userUUID}`);

    let newMapUserObject={...mapUserObject}

    if(newMapUserObject.locationSharingFriends.length<=2){

      newMapUserObject.locationSharingFriends[newMapUserObject.locationSharingFriends.length]=UUID

      updateDoc(refFiresrore, {locationSharingFriends:newMapUserObject.locationSharingFriends}).then(() => {
        // 保存に成功したらコンテクストにユーザーデータを格納
        dispatch(setMapUserObject(newMapUserObject))
      });
    }else{
      Alert.alert(
        '人数が多すぎます。', 
        '位置を共有する人を2人以下にしてください。',
      );
    }

  }else{
    
      const refFiresrore = doc(db, `mapGPS/${userUUID}`);

      let newMapUserObject={...mapUserObject}

      if(newMapUserObject.mapShowFriends.length<=2){
  
        newMapUserObject.mapShowFriends[newMapUserObject.mapShowFriends.length]=UUID
    
        updateDoc(refFiresrore, {mapShowFriends:newMapUserObject.mapShowFriends}).then(() => {
          // 保存に成功したらコンテクストにユーザーデータを格納
          dispatch(setMapUserObject(newMapUserObject))
        });

      }else{
        Alert.alert(
          '人数が多すぎます。', 
          'マップ上に表示する人を2人以下にしてください。',
        );
      }
  }
}

const onOFFChangeSwitch=(UUID)=>{
  if(isSettingMyfrendLocation){

    const refFiresrore = doc(db, `mapGPS/${userUUID}`);

    //const result = array.filter((num) => num != 1)
    let newMapUserObject={...mapUserObject}

    newMapUserObject.locationSharingFriends=newMapUserObject.locationSharingFriends.filter((friendID) => friendID != UUID)

      updateDoc(refFiresrore, {locationSharingFriends:newMapUserObject.locationSharingFriends}).then(() => {
        // 保存に成功したらコンテクストにユーザーデータを格納
        dispatch(setMapUserObject(newMapUserObject))
      });

  }else{
    const refFiresrore = doc(db, `mapGPS/${userUUID}`);

    //const result = array.filter((num) => num != 1)
    let newMapUserObject={...mapUserObject}

    newMapUserObject.mapShowFriends=newMapUserObject.mapShowFriends.filter((friendID) => friendID != UUID)

      updateDoc(refFiresrore, {mapShowFriends:newMapUserObject.mapShowFriends}).then(() => {
        // 保存に成功したらコンテクストにユーザーデータを格納
        dispatch(setMapUserObject(newMapUserObject))
      });
  }
}

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flexDirection:'row',marginBottom:10}}>
        <Text style={{fontSize:22,flex:1}}>フレンド</Text>
        <TouchableOpacity onPress={()=>{props.onCamera()}}>
          <MaterialIcons name="person-add-alt" size={24} color="#C8252B" />
        </TouchableOpacity>
      </View>
      <TextInput style={{backgroundColor:'#EEEEEE',height:25,borderRadius:15,marginBottom:10}}></TextInput>
      <View style={{flexDirection:'row',marginBottom:15}}>
        <TouchableOpacity onPress={()=>setIsSettingMyfrendLocation(!isSettingMyfrendLocation)} style={{flex:1,backgroundColor:isSettingMyfrendLocation?'#EEEEEE':'#C8252B',marginHorizontal:10,height:30,borderRadius:15,justifyContent: "center"}}><Text style={{textAlign:'center',color:isSettingMyfrendLocation?'#C8252B':'#EEEEEE',fontWeight:'500'}}>マップ上に表示する人</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setIsSettingMyfrendLocation(!isSettingMyfrendLocation)} style={{flex:1,backgroundColor:!isSettingMyfrendLocation?'#EEEEEE':'#C8252B',marginHorizontal:10,height:30,borderRadius:15,justifyContent: "center"}}><Text style={{textAlign:'center',color:!isSettingMyfrendLocation?'#C8252B':'#EEEEEE',fontWeight:'500'}}>自分の位置を共有</Text></TouchableOpacity>
      </View>
      {props.mapUserObject.friends&&
      <ScrollView style={{paddingHorizontal:10}}>
        {props.mapUserObject.friends.map((friend,index)=><MapFriendListItem ref={MapFriendListItemRef} key={index} friend={friend} locationSharingFriends={props.mapUserObject.locationSharingFriends} mapShowFriends={mapUserObject.mapShowFriends} isSettingMyfrendLocation={isSettingMyfrendLocation} onONChangeSwitch={(UUID)=>onONChangeSwitch(UUID)} onOFFChangeSwitch={(UUID)=>onOFFChangeSwitch(UUID)}/>)}
      </ScrollView>}
    </View>
  );
};
export default MapFriendRegisteContainer;