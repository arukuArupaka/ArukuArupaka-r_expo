import React from 'react';
import {Text, View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import TimeTableQty from './TimeTableQty';
import { useState, useEffect } from 'react';
import { useTimeTable } from './TimeTableContext'

const TimeTableChange = () => {

    const { timesize, weekTimeQty, setWeekTimeQty, sizechange, setSizechange, toggleSwitch } = useTimeTable();

    const styles = StyleSheet.create({
        bodys:{
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'stretch',
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
            height: '25%'

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
            paddingRight:'5%',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'black',
            width: '90%',
            height: '25%'
        },
        QtySets:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        SizeSet:{
            paddingLeft: '30%'
        },
        changebutton:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '10%'
        }
})

return (
<View style={styles.bodys}>
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
                    fontSize: 15
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
    </View>
);
            };
            export default TimeTableChange;