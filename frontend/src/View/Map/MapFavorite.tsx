
import React from 'react';
import DisplayList from '../../component/Map/DisplayList';
import { useSelector } from 'react-redux';

export default function App() {

  const campusBuildingData =useSelector((state)=>state.map.campusBuildingData)
  const campusData =useSelector((state)=>state.map.campusData)

  console.log(campusData)

  return (
    <View>
      <DisplayList campusBuildingsArray={campusBuildingData} campusID={campusData.id}/>
    </View>
  );
}