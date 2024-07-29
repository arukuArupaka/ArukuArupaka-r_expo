import React from 'react';
import {Text, View} from 'react-native';

const WeekFram = (props) => {
  return (
    <Text
      style={{
            // width:'20%',
            textAlign:'center', 
            backgroundColor:'#888888',
            height:'100%',
            lineHeight:35,
            marginLeft:1,
            marginRight:1,
            flex:1,
            color: 'white'
      }}>
      {props.weekDay}
    </Text>
  );
};
export default WeekFram;