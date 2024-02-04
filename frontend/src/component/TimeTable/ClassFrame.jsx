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

  const ClassNameHeight = (size) => {
    let Height = 60;

    switch (size){
      case 5:
        Height = 60;
        break;
      case 6:
        Height = 41.6;
        break;
      case 7:
        Height = 46;
        break;
    }

    return Height;
  };

  /*const Top = (qty) => {
    let top = 60;

    switch (qty){
      case 5:
        top = 7;
        break;
      case 6:
        top = 7;
        break;
      case 7:
        top = 1;
        break;
    }
    return top;
  }*/

  const fontTopsize = (qty) => {
    let font = 12;
    switch (qty){
      case 5:
        font = 12;
        break;
      case 6:
        font = 10;
        break;
      case 7:
        font = 10;
        break;
    }
    return font;
  };

  const fontBottomsize = (qty) => {
    let font = 12;
    switch (qty){
      case 5:
        font = 11;
        break;
      case 6:
        font = 10;
        break;
      case 7:
        font = 9;
        break;
    }
    return font;
  };

  let classnameheight = 60;
  let heightsize = '100%';
  let fontTop = 12;
  let fontBottom = 11;


  if(sizechange === false){
    classnameheight = ClassNameHeight(props.weekTimeQty);
    heightsize = getheight(props.weekTimeQty);
    fontTop = fontTopsize(props.weekTimeQty);
    fontBottom = fontBottomsize(props.weekTimeQty);
  }else{
    classnameheight = 60;
    heightsize = '100%';  
    fontTop = 12;
    fontBottom = 11;
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
                fontSize: fontTop,
                ...Platform.select({
                  ios: {flexWrap: 'wrap',width: '100%'},
                  android: {}
                }),
                height: classnameheight,
            }}>{props.className}</Text>
            <Text style={{
              top:7,
              color:'black',
              textAlign:'center',
              bottom:0,
              fontSize: fontBottom,
              height:'100%',
              }}>{props.TimeTableDate.classRoom}</Text>
    </TouchableOpacity>
  );
};
export default ClassFrame;