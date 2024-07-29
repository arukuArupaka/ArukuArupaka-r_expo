import React from 'react';
import {Text, View, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import TimeTableQty from './TimeTableQty';
import { useState, useEffect } from 'react';
import { useTimeTable } from './TimeTableContext';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeTableChange = () => {

    const { kamokuStatus, setKamokuStatus, statusSwitch, unitSum, setUnitSum, timesize, weekTimeQty, setWeekTimeQty, sizechange, setSizechange, toggleSwitch, department, setDepartment,season, setSeason, nodata, notifiSwitch } = useTimeTable();

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
          width: '80%',
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

    const styles = StyleSheet.create({
        bodys:{
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'stretch',
            height: '100%'
        },
        Qty:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            paddingLeft: '5%',
            paddingRight:'5%',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'black',
            width: '90%',
            height: 70

        },
        QtySet:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        PageSize:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            paddingLeft: '5%',
            paddingRight: 30,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'black',
            width: '90%',
            height: 70,

        },
        QtySets:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        SizeSet:{
            paddingLeft: '30%',
        },
        SizeSet2:{
            paddingLeft: '20%',
        },
        changebutton:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '10%'
        },
        department:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            paddingLeft: '5%',
            paddingRight:'5%',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'black',
            width: '90%',
            height: 75
        },
        picker: {
            alignItems: 'center',
        },
        season:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            paddingLeft: '5%',
            paddingRight:'5%',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'black',
            width: '90%',
            height: 70,
        },
        picker2:{
            alignItems: 'center',
        },
        scrollView:{
            width: '100%',
            height: '200%',
        },
        scrollViewContent:{
        //flexGrow: 1,
        }
})

return (
//<View>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.bodys}>
            <View style={styles.department}>
                <Text style={{
                    width: '26%',
                    fontSize: 16,
                }}>
                    {"学部を選択"}
                </Text>
                <View style={styles.picker}>
                    <RNPickerSelect
                    onValueChange={(value) => setDepartment(value)}
                    items={[
                        { label: '法学部', value: '法学部', key: 'hougaku' },
                        { label: '経済学部', value: '経済学部', key: 'keizai' },
                        { label: '経営学部', value: '経営学部', key: 'keiei' },
                        { label: '産業社会学部', value: '産業社会学部', key: 'sansha' },
                        { label: '国際関係学部', value: '国際関係学部', key: 'kokusai' },
                        { label: '政策科学部', value: '政策科学部', key: 'seisaku' },
                        { label: '文学部', value: '文学部', key: 'bun' },
                        { label: '映像学部', value: '映像学部', key: 'eizou' },
                        { label: '総合心理学部', value: '総合心理学部', key: 'sougou' },
                        { label: '理工学部', value: '理工学部', key: 'rikou' },
                        { label: 'グローバル教養学部', value: 'グローバル教養学部', key: 'gurokyou' },
                        { label: '食マネジメント学部', value: '食マネジメント学部', key: 'shokumane' },
                        { label: '情報理工学部', value: '情報理工学部', key: 'jouri' },
                        { label: '生命科学部', value: '生命科学部', key: 'seimei' },
                        { label: '薬学部', value: '薬学部', key: 'yakugaku' },
                        { label: 'スポーツ健康学部', value: 'スポーツ健康学部', key: 'supoken' }
                    ]}
                    style={pickerSelectStyles}
                    placeholder={{ label: department, value: department }}
                    />
                </View>
            </View>
            <View style={styles.season}>
                <Text style={{
                        width: '26%',
                        fontSize: 16,
                    }}>
                        {"セメスターを選択"}
                </Text>
                <View style={styles.picker2}>
                        <RNPickerSelect
                        onValueChange={(value) => setSeason(value)}
                        value={true}
                        items={[
                            { label: '秋セメスター', value: '秋セメスター' , key: 'fall'},
                            { label: '春セメスター', value: '春セメスター' , key: 'spring'}
                        ]}
                        style={pickerSelectStyles}
                        placeholder={{ label: season, value: season }}
                        />
                </View>
            </View>
            <View style={styles.Qty}>
                    <Text
                        style = {{
                            fontSize: 15,
                        }}
                    >{"表示するコマ数"}</Text>
                    <View style={styles.QtySet}>
                            <View style={styles.QtySets}>
                                <TimeTableQty name="minuscircleo" size={24} color="black" 
                                onEventCallBack={()=>{
                                weekTimeQty <= 5 ? 5 : setWeekTimeQty(weekTimeQty - 1);}}
                                weektimeqty = {weekTimeQty}/>
                                <Text
                                    style = {{
                                        fontSize: 20,
                                        paddingLeft: 30,
                                        paddingRight: 30
                                    }}
                                >{weekTimeQty}</Text>
                                <TimeTableQty name="pluscircleo" size={24} color="black"
                                onEventCallBack={()=>{
                                weekTimeQty >= 7 ? 7 : setWeekTimeQty(weekTimeQty + 1);}}
                                weektimeqty = {weekTimeQty}/>
                            </View>
                    </View>
                
                </View>
                <View style={styles.PageSize}>
                    <Text
                        style = {{
                            fontSize: 15,
                        }}
                    >{"時間割表を大きく表示する"}</Text>
                    <View style={styles.SizeSet}>
                        <Switch
                            value={sizechange}
                            onValueChange={toggleSwitch}
                            trackColor={{false: '#888888', true: '#00ff7f'}}
                            thumbColor={'white'}
                        />
                    </View>
                    <TimeTableQty/>
                </View>
                <View style={styles.PageSize}>
                    <Text
                        style = {{
                            fontSize: 15,
                        }}
                    >{"単位数ごとに自動で色分け"}</Text>
                    <View style={styles.SizeSet}>
                        <Switch
                            disabled={kamokuStatus ? true : false}
                            value={nodata}
                            onValueChange={notifiSwitch}
                            trackColor={{false: '#888888', true: '#00ff7f'}}
                            thumbColor={'white'}
                        />
                    </View>
                    <TimeTableQty/>
                    </View>
                    <View style={styles.PageSize}>
                    <Text
                        style = {{
                            fontSize: 15,
                        }}
                    >{"科目の種類ごとに自動で色分け"}</Text>
                    <View style={styles.SizeSet2}>
                        <Switch
                            disabled={nodata ? true : false}
                            value={kamokuStatus}
                            onValueChange={statusSwitch}
                            trackColor={{false: '#888888', true: '#00ff7f'}}
                            thumbColor={'white'}
                        />
                    </View>
                    <TimeTableQty/>
                </View>
                <View style={styles.PageSize}>
                    <Text style={{fontSize: 15}}>{"登録授業の合計単位数"}</Text>
                    <Text style={{fontSize: 15}}>{`${unitSum}`}</Text>
                </View>
            </View>
        </ScrollView>
    //</View>
);
            };
            export default TimeTableChange;