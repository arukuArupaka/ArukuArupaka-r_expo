import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {useState,useEffect} from 'react'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTimeTable } from './TimeTableContext';
import TimrTableView from '../../View/TimeTableView';

const ColorChange = ({navigation}) => {
    const { pushedClassFrameDetail, multicolor, setMulticolor, weekTimeQty, timesize, setWeekTimeQty,sizechange, setSizechange, weekTime, setWeekTime, nodata, setNodata } = useTimeTable();
    const styles=StyleSheet.create({
        notifi: {
            padding: 6,
            paddingHorizontal: 8,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            top: 6,
            width: 203,
            flexDirection: 'column'
          },
    });

    return(
        <View style={styles.notifi}>
            <View style={{alignItems: 'center'}}><Text>{"色を設定する"}</Text></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={{backgroundColor: 'lightskyblue', height: 30, width: 30, borderRadius: 10}}onPress={()=>{setMulticolor('lightskyblue');navigation.navigate('TimeTable');}}><Text>{""}</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'palegreen', height: 30, width: 30, borderRadius: 10}}onPress={()=>{setMulticolor('palegreen');navigation.navigate('TimeTable');}}><Text>{""}</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'gold', height: 30, width: 30, borderRadius: 10}}onPress={()=>{setMulticolor('gold');navigation.navigate('TimeTable');}}><Text>{""}</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={{backgroundColor: 'darkorange', height: 30, width: 30, borderRadius: 10}}onPress={()=>{setMulticolor('darkorange');navigation.navigate('TimeTable');}}><Text>{""}</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'red', height: 30, width: 30, borderRadius: 10}}onPress={()=>{setMulticolor('red');navigation.navigate('TimeTable');}}><Text>{""}</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'deeppink', height: 30, width: 30, borderRadius: 10}}onPress={()=>{setMulticolor('deeppink');navigation.navigate('TimeTable');}}><Text>{""}</Text></TouchableOpacity>
                </View>
        </View>
    );
};export default ColorChange;



