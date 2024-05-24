import React from 'react';
import {Text, View,Image} from 'react-native';
import { Marker ,Callout} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const MapBuildingIcon = (props) => {
  return (
    <Marker
    style={{
        alignItems: 'center',
        elevation:10,
    }}
        coordinate={{longitude:props.buildingData.buildingLocation.longitude?props.buildingData.buildingLocation.longitude:0,latitude:props.buildingData.buildingLocation.latitude?props.buildingData.buildingLocation.latitude:0}}
        title={props.buildingData.buildingName}
        description={props.buildingData.buildingType+"\n"+props.buildingData.buildingDetail}
    >
    <Image style={{top:9,right:8,width:40,height:40,borderRadius:25,position:'absolute'}} source={props.buildingData.buildingImage?{uri:props.buildingData.buildingImage}:require("../../image/Logo.png")}/>
    <Ionicons name="chatbubble-outline" style={{transform:[{rotate: '-45deg'}]}} size={55} color="black" />
    {/* <Callout>
      <View>
        <Text>{props.buildingData.buildingName}</Text>
        <Text style={{fontSize:5}}>{props.buildingData.buildingType}</Text>
      </View>
    </Callout> */}
</Marker>
  );
};
export default MapBuildingIcon;