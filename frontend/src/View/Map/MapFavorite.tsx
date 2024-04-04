
import React from 'react';
import DisplayList from '../../component/Map/DisplayList';
import { View ,Text} from 'react-native';
import { useSelector } from 'react-redux';

export default function App({navigation}) {

  const campusBuildingData =useSelector((state)=>state.map.campusBuildingData)
  const campusData =useSelector((state)=>state.map.campusData)

  return (
    <View style={{backgroundColor:'white'}}>
      <Text style={{textAlign:'center',fontSize:20,padding:20}}>{campusData.name}</Text>
      <DisplayList campusBuildingsArray={campusBuildingData} openMap={()=>navigation.navigate('main')} campusID={campusData.id}/>
    </View>
  );
}