import React from 'react';
import { Platform, Text, View,TouchableOpacity} from 'react-native';
import { useTimeTable } from './TimeTableContext'
import { useNavigation } from '@react-navigation/native'; // ここに追加


const ClassFrame = (props) => {
  const { weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange, weekTime, nodata, setNodata } = useTimeTable();
  const navigation = useNavigation();
  const frameDetail={
    day:props.day,
    period:props.period,
  };
  

  /* const [timetableclass, setTimetableclass] = useState(True); */

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
        Height = 66;
        break;
      case 6:
        Height = 41.6;
        break;
      case 7:
        Height = 55;
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
  const texttop = (qty) =>{
    let top = -4;
    switch (qty){
      case 5:
        top = -4;
        break;
      case 6:
        top = 4;
        break;
      case 7:
        top = -7;
        break;
    }
    return top;
  };

  let classnameheight = 60;
  let heightsize = '100%';
  let fontTop = 12;
  let fontBottom = 11;
  let fonttexttop = -4;
  let colorKoma = "#888888";


  if(sizechange === false){
    classnameheight = ClassNameHeight(props.weekTimeQty);
    heightsize = getheight(props.weekTimeQty);
    fontTop = fontTopsize(props.weekTimeQty);
    fontBottom = fontBottomsize(props.weekTimeQty);
    fonttexttop = texttop(props.weekTimeQty);
  }else{
    classnameheight = 60;
    heightsize = '100%'; 
    fontTop = 10.5;
    fontBottom = 11;
  }
  
  if(nodata == true){
    colorKoma = `${weekTime[frameDetail.day][frameDetail.period].color}`;
  }else if(weekTime[frameDetail.day][frameDetail.period].mulcolor != "#888888"){
    colorKoma = `${weekTime[frameDetail.day][frameDetail.period].mulcolor}`;
  }

  //console.log('color', colorKoma);

  return (
    <View style={{height: heightsize, paddingTop: 2}}>
      <TouchableOpacity
        style={{
          width:'98%',
          height: '99.9%',
          backgroundColor:'white',
          //height: heightsize,
          lineHeight:35,
          marginLeft:1,
          marginRight:1,
          borderWidth: 2,
          borderColor: colorKoma,
          borderRadius: 10, 
          paddingBottom: 30
        }}onPress={()=>{props.onEventCallBack(frameDetail);}}>
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
                  top: -3
              }}>{props.className}</Text>
              <Text style={{
                top: fonttexttop,
                color:'black',
                textAlign:'center',
                bottom:0,
                fontSize: fontBottom,
                height:'100%',
                }}>{props.TimeTableDate.classRoom}</Text>
      </TouchableOpacity>
      </View>
  );
};
export default ClassFrame;