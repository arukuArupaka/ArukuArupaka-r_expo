import React from 'react';
import {Text, View,Image} from 'react-native';

const MapBuildingListItem = (props) => {
  return (
    <View
      style={{
        height:80,
        flexDirection:'row'
      }}>
        <Image style={{width:40,height:40,borderRadius:30}} source={{uri:props.buildingData.buildingImage?props.buildingData.buildingImage:"https://media.discordapp.net/attachments/1210241561095573504/1219219360976080987/24660942.jpg?ex=660a8183&is=65f80c83&hm=b3e22c638cb150a3ee37a0a7f0c228ce0c7b79130843af5cdb3597c8ee912b66&=&format=webp&width=1350&height=1018"}}/>
        <View style={{marginLeft:10}}>
            <Text style={{fontSize:15}}>{props.buildingData.buildingName}</Text>
            <Text style={{fontSize:10,marginLeft:10}}>{props.buildingData.buildingType.map((data)=>data+",")}</Text>
            <Text style={{fontSize:10,marginLeft:10}}>{props.buildingData.buildingDetail}</Text>
        </View>
    </View>
  );
};
export default MapBuildingListItem;