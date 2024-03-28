import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Law } from './Faculty/Law';
import { Industrial_Sociology } from './Faculty/Industrial_Sociology';
import { Interntional_Relations } from './Faculty/Interntional_Relations';
import { Literature } from './Faculty/Literature';
import { Business_Administration } from './Faculty/Business_Administration';
import { Policy_Science } from './Faculty/Policy_Science';
import { Comprehensive_Psychology } from './Faculty/Comprehensive_Psychology';
import { Global } from './Faculty/Global';
import { Visual_Arts } from './Faculty/Visual_Arts';
import { Information_Science_and_Engineering } from './Faculty/Information_Science_and_Engineering';
import { Economics } from './Faculty/Economics';
import { Sports } from './Faculty/Sports';
import { Eating_management } from './Faculty/Eating_management';
import { Science_and_Engineering } from './Faculty/Science_and_Engineering';
import { Life_Sciences } from './Faculty/Life_Sciences';
import { Medical } from './Faculty/Medical';
import { Liberal_Arts } from './Faculty/Liberal_Arts';
import {Dimensions} from 'react-native';
import { View, Text, StyleSheet, SafeAreaView ,ScrollView} from 'react-native';
import DepartmentSelectBotton from '../../../../component/Textbook/departmentSelectBotton';
import React, { useState ,useEffect} from 'react';
import { Textbook_FlatList } from '../../../../component/Textbook/Textbook_FlatList';
import { Data } from '../../../../component/Textbook/Data.API';
import { collection, db, doc, getDocs } from '../../../../../firebase';

const Tab = createMaterialTopTabNavigator();

//教科書販売ホームのナビゲーションについて実装した画面

export const SearchList = ({navigation}) => {

  const [selectedDepartment,setSelectedDepartment]=useState<string>("")
  const [displayTextBookData,setDisplayTextBookArray]=useState<Array<object>>([{}])

  const departmentList=[
    {
      departmantName:"法学部"
    },
    {
      departmantName:"産業社会学部"
    },
    {
      departmantName:"国際関係学部"
    },
    {
      departmantName:"文学部"
    },
    {
      departmantName:"経営学部"
    },
    {
      departmantName:"政策科学部"
    },
    {
      departmantName:"総合心理学部"
    },
    {
      departmantName:"グローバル教養学部"
    },
    {
      departmantName:"映像学部"
    },
    {
      departmantName:"情報理工学部"
    },
    {
      departmantName:"経済学部"
    },
    {
      departmantName:"スポーツ健康科学部"
    },
    {
      departmantName:"食マネージメント学部"
    },
    {
      departmantName:"生命科学部"
    },
    {
      departmantName:"薬学部"
    },
    {
      departmantName:"教養科目"
    },
  ]
    useEffect(()=>{

      const getTextBookList=async()=>{

        const getData=[]

        const querySnapshot = await getDocs(collection(db, "syuppinn"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          getData.push(doc.data())
        });

        console.log(getData)
        setDisplayTextBookArray(getData)
      }

      getTextBookList()

    },[selectedDepartment])

    return (
    <View
      style={{

      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {departmentList.map((departmant)=><DepartmentSelectBotton name={departmant.departmantName} selectedDepartment={selectedDepartment} onSelected={(departmant)=>setSelectedDepartment(departmant)}/>)}
      </ScrollView>
      <Textbook_FlatList majorname={"法学部"} textBookList={displayTextBookData} navigation={navigation}/>
    </View>
  );

}

