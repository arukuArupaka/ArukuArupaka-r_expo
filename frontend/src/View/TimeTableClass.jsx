import { useTimeTable } from '../component/TimeTable/TimeTableContext'
import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions, RefreshControl} from 'react-native';
import {useState,useEffect} from 'react'
import Koma from '../component/TimeTable/Koma';
import KamokuKoma from '../component/TimeTable/KamokuKoma';

const TimeTableClass = ({ navigation }) => {
    const { weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange,padding,show, setShow, season, setSeason, time, setTime, day, setDay, department, setDepartment, data, setData, kamokuInfo, pushedClassFrameDetail,setPushedClassFrameDetail, weekTime,setWeekTime,indata, setIndata, kamokuItem, setKamokuItem, nodata, setNodata } = useTimeTable();

    /*useEffect(() => {
      const kamokudata = weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period];
      setKamokuItem({
        day: pushedClassFrameDetail.day,
        period: pushedClassFrameDetail.period,
        classRoom: kamokudata.classRoom,
        className: kamokudata.className,
        memo: kamokudata.memo,
        notification: kamokudata.notification,
      });  
    }, []); */

    useEffect(() => {
      if (weekTime && pushedClassFrameDetail && pushedClassFrameDetail.day !== undefined && pushedClassFrameDetail.period !== undefined) {
        const kamokudata = weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period];
        if (kamokudata) { // kamokudata が存在することをさらにチェック
          setKamokuItem({
            day: pushedClassFrameDetail.day,
            period: pushedClassFrameDetail.period,
            classRoom: kamokudata.classRoom,
            className: kamokudata.className,
            memo: kamokudata.memo,
            notification: kamokudata.notification,
          });
        }
      }else{
        console.log('存在しません');
      }
    }, []); // 依存配列に weekTime と pushedClassFrameDetail を追加
    

    /*useEffect(() => {
      console.log('保存されました');
      if(pushedClassFrameDetail.day){
        console.log('存在します');
      }else{
        console.log('存在しません');
      }
    },[pushedClassFrameDetail]); */


    /*useEffect(() => {
      const onSubmit = async (pushedClassFrameDetail, classDetail) => {
        setWeekTime((prev) => {
          // 範囲チェックを追加
          if (typeof pushedClassFrameDetail !=='undefined') {
            prev[pushedClassFrameDetail.day][pushedClassFrameDetail.period] = classDetail;
            console.log('onSubmitでobject');
          } else {
            console.log(typeof pushedClassFrameDetail);
            console.log('onSubmitでundifined');
            // 範囲外のアクセスが試みられた場合のエラーログまたは処理
            //console.error('Invalid day or period');
          }
          return [...prev];
        });
      };
      onSubmit(pushedClassFrameDetail, kamokuItem);
    }, [indata]); */


    useEffect(() => {
      console.log('weekTimeは');
      console.log(typeof weekTime);
    },[]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
    }, []);

  return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <View>
                {data.map((item, index) => <KamokuKoma key={index} item={item} eventPush={()=> {navigation.navigate('TimeTable'); setIndata(true);  console.log('indataをtrueに変更');setKamokuItem({...kamokuItem, className: `${item.kamoku_name}`, classRoom: `${item.kamoku_class}`, department: `${item.kamoku_department}`, unit: `${item.kamoku_unit}`, num: `${item.kamoku_num}`, resume: `${item.kamoku_resume}`});}}/>)}
              </View>
        </ScrollView>
      );
      /*setKamokuItem({...kamokuItem, className: `${item.kamoku_name}`, classRoom: `${item.kamoku_class}`});*/
};
export default TimeTableClass;