import React, { useState } from 'react';
import {Text, TouchableOpacity, View,TextInput} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';


const MapFriendRegisteContainer = () => {

  const [isSettingMyfrendLocation,setIsSettingMyfrendLocation]=useState(false)

  function generateUUID() {
    var array = new Uint32Array(4);
    Crypto.getRandomValues(array);
    return ([array[0].toString(16).padStart(8, '0'), array[1].toString(16).padStart(8, '0')].join('-') +
            '-' + [array[2].toString(16).substr(0, 4), array[2].toString(16).substr(4, 4)].join('-') +
            '-' + [array[3].toString(16).substr(0, 4), array[3].toString(16).substr(4, 4)].join('-') +
            '-' + [array[3].toString(16).substr(8)].join('')).toLowerCase();
  }
  console.log('generateUUID()')
  let uuid = Crypto.randomUUID();
console.log(uuid);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{flexDirection:'row',marginBottom:10}}>
        <Text style={{fontSize:22,flex:1}}>フレンド</Text>
        <TouchableOpacity>
          <MaterialIcons name="person-add-alt" size={24} color="#C8252B" />
        </TouchableOpacity>
      </View>
      <TextInput style={{backgroundColor:'#EEEEEE',height:25,borderRadius:15,marginBottom:10}}></TextInput>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>setIsSettingMyfrendLocation(!isSettingMyfrendLocation)} style={{flex:1,backgroundColor:isSettingMyfrendLocation?'#EEEEEE':'#C8252B',marginHorizontal:10,height:30,borderRadius:15,justifyContent: "center"}}><Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>マップ上に表示する人</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setIsSettingMyfrendLocation(!isSettingMyfrendLocation)} style={{flex:1,backgroundColor:!isSettingMyfrendLocation?'#EEEEEE':'#C8252B',marginHorizontal:10,height:30,borderRadius:15,justifyContent: "center"}}><Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>自分の位置を共有</Text></TouchableOpacity>
      </View>
    </View>
  );
};
export default MapFriendRegisteContainer;