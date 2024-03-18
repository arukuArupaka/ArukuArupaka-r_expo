import React from 'react';
import {Switch,Text, View,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import {useState,useEffect} from 'react'
import { useTimeTable } from './TimeTableContext'
import { useNavigation } from '@react-navigation/native';


const styles=StyleSheet.create({
  entire:{
    alignItems:'center',
    zIndex: 100,
    elevation: Platform.OS === 'android' ? 200 : 0,
    position:'absolute',
    width:"80%",
    //backgroundColor:'F8F8F8',
    height:320,
    left:0,
    borderRadius:4,
    flexDirection:'column',
    paddingTop:4,

  },
  infoDaialog:{
    alignItems:'center',
    zIndex: 100,
    elevation: Platform.OS === 'android' ? 100 : 0,
    position:'absolute',
    width: '100%',
    //backgroundColor:'F8F8F8',
    backgroundColor:'#F8F8F8',
    height:210,
    left:0,
    borderRadius:4,
    flexDirection:'column',
    paddingTop:4,
    top: 110
  },
  determinationButton:{
    alignItems:'center',
    flex:1,
    marginRight:'10%',
    marginLeft:'10%',
    marginTop:4,
    marginBottom:8,
    borderRadius:400,
    zIndex:20,
  },
  InfoText:{
    flex:1,
    with:'100%',
    alignContent:'right',
    justifyContent: 'right',
    textAlign:'right',
    alignItems:'right',
    flexDirection:'row',


  },
  InfoTextTest:{
    width:80,
    textAlign:'center',
    //alignItems:'center',
    //backgroundColor:'blue',
    fontSize:14,
  },
  TextInputInfo:{ 
    width: 80,
    borderBottomWidth: 1,
    backgroundColor: "#D9D9D9",
    fontSize:14,
    height:24,
    marginTop:0,
    marginBottom:0,
    padding:0,
    paddingLeft:5,
  },
  TextInputText:{
    color:'red,'
  },
  backText:{
    //width:'110%',
    //textAlign:'center',
    //alignItems:'center',
    //backgroundColor:'blue',
    fontSize:14,
    width:110,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 230,
    marginLeft: 30
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 178,
    marginLeft: 30,
    backgroundColor: '#fff',
  },
});

const TimeTableInfo = (props) => {
  const { unitSum, setUnitSum, unitCalc, setUnitCalc, weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding,show, setShow, season, setSeason, time, setTime, day, setDay, department, setDepartment, dodata, setDodata, pushedClassFrameDetail,setPushedClassFrameDetail, weekTime, setWeekTime, indata, setIndata, period, setPeriod, kamokuItem, setKamokuItem, nodata, setNodata, notifiSwitch, kamokuShow, setKamokuShow } = useTimeTable();
  const navigation = useNavigation();
  const [infoDetail, setInfoDetail] = useState({
    day: props.day,
    period: props.period,
    classRoom: weekTime[props.day][props.period].classRoom,
    className: weekTime[props.day][props.period].className,
    memo: weekTime[props.day][props.period].memo,
    notification: weekTime[props.day][props.period].notification,
    hour:props.classStartEndTimeUnitList[props.period].hour,
    minute:props.classStartEndTimeUnitList[props.period].minute,
    //color: weekTime[props.day][props.period].color
    color: "",
    mulcolor: "#888888"
  });

  const [check, setCheck] = useState(1);

  const Submit = async() => {
    console.log('onSubmitが実行されました');
    const timecalc = props.timeCalc(
    infoDetail.hour , infoDetail.minute,
    infoDetail.notification);

    const notificationHour = timecalc.notificationHour;
    const notificationMinute = timecalc.notificationMinute;
    console.log(notificationHour);
    console.log(notificationMinute);

    setInfoDetail((prev)=>{prev.timecalc=timecalc; return prev});
    setInfoDetail((prev)=>{prev.hour=notificationHour; return prev});
    setInfoDetail((prev)=>{prev.minute=notificationMinute; return prev});

    //console.log('Info///timeCalc///hour:',infoDetail.hour);
    //console.log('Info///timeCalc///minute:',infoDetail.minute);
    console.log('Info///timeCalc///timecalc:',timecalc);
    //console.log('Info///timeCalc///notificationHour:',notificationHour);
    //console.log('Info///timeCalc///notificationMinute:',notificationMinute);
    if(infoDetail.notification == ""){
      console.log('notificationが空です');
    }else{
      props.onSubmit(infoDetail,notificationHour,notificationMinute);
    }
    setKamokuItem({...kamokuItem, className:`${infoDetail.className}`, classRoom:`${infoDetail.classRoom}`, memo:`${infoDetail.memo}`, notification:`${infoDetail.notification}`, teacher: `${weekTime[infoDetail.day][infoDetail.period].teacher}`, unit: `${weekTime[infoDetail.day][infoDetail.period].unit}`, num: `${weekTime[infoDetail.day][infoDetail.period].num}`, color: `${weekTime[infoDetail.day][infoDetail.period].color}`});
    //kamokuItem({...kamokuItem, className:`${infoDetail.className}`,classRoom:`${infoDetail.classRoom}`,memo:`${infoDetail.memo}`,notification:`${infoDetail.notification}`});
    //console.log('kamokuItemは');
    //console.log(kamokuItem);
    console.log('notification時間前は');
    console.log(infoDetail.notification);
    //console.log(notificationMinute);
  };

  return (
    <View style={styles.entire}>
      <View style={styles.infoDaialog}>
        <View style={styles.InfoText}>
          <Text style={styles.InfoTextTest}>授業</Text>
          <TextInput style={styles.TextInputInfo} autoFocus={true} clearTextOnFocus={true} onChangeText={(text) =>{setInfoDetail((prev)=>{prev.className=text; return prev});}}>
            <Text>{infoDetail.className}</Text>
          </TextInput>
          <Text style={styles.backText}></Text>
        </View>

        <View style={styles.InfoText}>
          <Text style={styles.InfoTextTest}>教室</Text>
          <TextInput style={styles.TextInputInfo} onChangeText={(text) =>{setInfoDetail((prev)=>{prev.classRoom=text; return prev});}}>
            <Text>{infoDetail.classRoom}</Text>
          </TextInput>
          <Text style={styles.backText}></Text>
        </View>


        <View style={styles.InfoText}>
          <Text style={styles.InfoTextTest}>メモ</Text>
          <TextInput style={styles.TextInputInfo} onChangeText={(text) =>{setInfoDetail((prev)=>{prev.memo=text; return prev});}}>
            <Text>{infoDetail.memo}</Text>
          </TextInput>
          <Text style={styles.backText}></Text>
        </View>

        {/*<View style={styles.Infotoggle}>
          <Text>通知ON</Text>
          <Switch
                    value={nodata}
                    onValueChange={notifiSwitch}
                    trackColor={{ false: '#888888', true: Platform.OS === 'android' ? '#00ff7f' : '#00ff7f' }}
                    thumbColor={'white'}
                    //style={{left: 35}}
                />
  </View>*/}
        <View style={styles.InfoText}>
          <Text style={styles.InfoTextTest}>通知時間</Text>
          <TextInput style={styles.TextInputInfo} onChangeText={(text) =>{setInfoDetail((prev)=>{prev.notification=text; return prev});}}>
            <Text>{infoDetail.notification}</Text>
          </TextInput>
          <Text style={styles.backText}> 分前に通知する</Text>
        </View>
        <View style={{flexDirection:'row',flex:1,}}>
          <TouchableOpacity style={[styles.determinationButton,{backgroundColor:'#D9D9D9'}]} 
          onPress={()=>{
            if(kamokuShow == true){
              navigation.navigate('TimeTable');
              props.onEventCallBack();
              setCheck(check*(-1));
              setIndata(true);
              props.onEventCallBack();
              setCheck(check*(-1));
              Submit();
              setKamokuShow(false);
              setUnitCalc(true);
              console.log('unitSumは');
              console.log(unitSum);
            }else{
              props.onEventCallBack();
              setCheck(check*(-1));
              Submit();
              setIndata(true);
              props.onEventCallBack();
              setCheck(check*(-1));
              setKamokuShow(false);
              setUnitCalc(true);
              console.log('unitSumは');
              console.log(unitSum);
          }}
          }><Text style={{color:'#595959',fontSize:18,}}>OK</Text></TouchableOpacity>
          <TouchableOpacity style={styles.determinationButton} onPress={()=>{
            if(kamokuShow == true){
              props.onEventCallBack();
              setKamokuItem({...kamokuItem, className: '', classRoom: '', notifion: '', memo: '', notification: '', department: '', unit: '', num: '', resume: '', teacher: ''});
              setIndata(true);
              setKamokuShow(false);
            }else{
              props.onEventCallBack();
            }
            }}><Text style={{color:'#595959'}}>キャンセル</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default TimeTableInfo;