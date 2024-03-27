
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import DisplayList from '../../component/Map/DisplayList';

export default function App() {
  return (
    <DisplayList campusBuildingsArray={campusBuildingsArray} openMap={()=>toggleComponent()} campusID={campusData.id}/> : <DisplayMap campusBuildingsArray={campusBuildingsArray} campusData={campusData} isEditBuilding={showEditBuilding} onPickLongitudeLatitude={(event)=>{pickBuildinglocation(event);}}></DisplayList>
  );
}