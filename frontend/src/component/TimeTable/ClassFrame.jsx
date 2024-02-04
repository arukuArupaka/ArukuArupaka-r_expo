import React from 'react';
import { Platform, Text, View,TouchableOpacity} from 'react-native';
import { useTimeTable } from './TimeTableContext'

const ClassFrame = (props) => {
  const { weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange } = useTimeTable();
  const frameDetail={
    day:props.day,
    period:props.period,
  }

  const getheight = (qty) => {
    let Height = '100'; // デフォルト値
  
    switch (qty){
      case 5:
        Height = '100';
        break;
      case 6:
        Height = '83.333';
        break;
      case 7:
        Height = '71.42857'
        break;
    }
    return `${Height}%`;
  };

  let heightsize = '100%';

  if(sizechange === false){
    heightsize = getheight(props.weekTimeQty);
  }else{
    heightsize = '100%';
  }

  const ClassNameHeight = (size) => {
    let Height = 60;

    switch (size){
      case 5:
        Height = 60;
        break;
      case 6:
        Height = 45;
        break;
      case 7:
        Height = 32;
        break;
    }

    return Height;
  };

  let classnameheight = 60;

  if(sizechange === false){
    classnameheight = ClassNameHeight(props.weekTimeQty);
  }else{
    classnameheight = 60;
  }
  
  return (
    <TouchableOpacity
      style={{
        color:'black',
        width:'100%',
        backgroundColor:'white',
        height: heightsize,
        lineHeight:35,
        marginLeft:1,
        marginRight:1,
        borderWidth: 1,
        borderColor: '#888888',
        borderRadius: 10, 
      }}onPress={()=>{props.onEventCallBack(frameDetail)}}>
      <Text style={{
                marginTop:8,
                color:'black',
                textAlign:'center', 
                fontSize: 12,
                ...Platform.select({
                  ios: {flexWrap: 'wrap',width: '100%'},
                  android: {}
                }),
                height: classnameheight,
            }}>{props.className}</Text>
            <Text style={{
              top:20,
              color:'black',
              textAlign:'center',
              bottom:0,
              fontSize:12,
              }}>{props.TimeTableDate.classRoom}</Text>
    </TouchableOpacity>
  );
};
export default ClassFrame;