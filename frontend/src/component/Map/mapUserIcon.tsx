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
                elevation:10
            }}
            coordinate={props.location}
            title={props.title}
            description={props.description}
        >

            <Image style={{width:40,height:40,borderRadius:25,borderWidth:1}} source={{uri:props.imageURI?props.imageURI:"https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65fe8064&is=65ec0b64&hm=e615d93362c74b2d2a0788ef8867ccb999f462b0076e644dab324f8c8fab17ca&=&format=webp&width=1208&height=1208"}}/>
            <AntDesign name="caretdown" size={15} color="black"/>

        </Marker>
  );
};
export default MapUserIcon;