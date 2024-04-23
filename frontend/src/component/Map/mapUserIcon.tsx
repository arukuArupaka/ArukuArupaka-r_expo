import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MapUserIcon = (props) => {

  return (
        <Marker
            style={{
                alignItems: 'center',
                elevation:10,
            }}
            coordinate={{longitude:props.location.longitude?props.location.longitude:0,latitude:props.location.latitude?props.location.latitude:0}}
            title={props.title}
            description={props.description}
        >
            <Image style={{width:40,height:40,borderRadius:25,borderWidth:1}} source={props.imageURI?{uri:props.imageURI}:require('../../image/Logo.png')}/>
            <AntDesign name="caretdown" size={15} color="black"/>

        </Marker>
  );
};
export default MapUserIcon;