
import React from 'react';
import DisplayList from '../../component/Map/DisplayList';
import { View ,Text,Alert, Button,Modal} from 'react-native';
import { useSelector } from 'react-redux';
import Dialog from "react-native-dialog";

export default function App({navigation}) {

  const campusBuildingData =useSelector((state)=>state.map.campusBuildingData)
  const campusData =useSelector((state)=>state.map.campusData)
  const onPressAlert = () => {
    Alert.alert(
        'アラートを出しました', 
        '現在使うことはできません',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('アラートのcancelをタップした時の挙動を書く'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('アラートのOKをタップした時の挙動を書く')},
    ]);
  };
  return (
    <View style={{backgroundColor:'white'}}>
      <Text style={{textAlign:'center',fontSize:20,padding:20}}>{campusData.name}</Text>
      <DisplayList campusBuildingsArray={campusBuildingData} openMap={()=>navigation.navigate('main')} campusID={campusData.id}/>
      <View>
      <Button title="Alert" onPress={onPressAlert} />
    </View>
    </View>
  );
}

