import React from 'react';
import {Text, View, StyleSheet, Switch} from 'react-native';
import TimeTableQty from '../component/TimeTable/TimeTableQty';
import { useState, useEffect } from 'react';
import TimrTableView from './TimeTableView'
import { useTimeTable } from '../component/TimeTable/TimeTableContext'

const TimeTableSetting = () => {

  const { timesize, weekTimeQty, setWeekTimeQty, sizechange, setSizechange, toggleSwitch } = useTimeTable();

  
    // その他のコンポーネントのコード...

    const styles = StyleSheet.create({
        body:{
            paddingTop: 30,
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
            height: '20%'

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
            height: '20%'
        },
        QtySets:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    })

  return (
    <View style={styles.body}>
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
                    trackColor={{false: '#888888', true: '#ffffff'}}
                    thumbColor={'white'}
                />
            </View>
            <TimeTableQty/>
        </View>
    </View>
  );
};
export default TimeTableSetting;