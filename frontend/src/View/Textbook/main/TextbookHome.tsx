import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView ,ScrollView} from 'react-native';
import { HeaderforTextbook1 } from '../../../component/Textbook/HeaderforTextbook1';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchList } from './SearchHome/SearchList';
import { SearchDetail } from './SearchHome/SearchDetail';
import { SearchSearch } from './SearchHome/SearchSearch';
import DepartmentSelectBotton from '../../../component/Textbook/departmentSelectBotton';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";




//教科書販売ホームのナビゲーションについて実装した画面

const Stack = createStackNavigator();


export const TextbookHome = () => {

  const [selectedDepartment,setSelectedDepartment]=useState<string>("")

  const departmentList=[
    {
      departmantName:"すべて"
    },
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

  const [textbookArray,setTextBookArray]=useState([])

  const getdata=async()=>{
    console.log("aaa")
    const textbookArray=[]
  // const docRef = doc(db, "syuppinn", "0AGr1GGpAnXXBBYlyHbN");
  // const docSnap = await getDoc(docRef);
  
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  const q = query(collection(db, "syuppinn"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  textbookArray.push(doc.data())
});
setTextBookArray(textbookArray)
}
useEffect(()=>{
  getdata()

},[])
  return (
    <View
      style={{

      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {departmentList.map((departmant)=><DepartmentSelectBotton name={departmant.departmantName} selectedDepartment={selectedDepartment} onSelected={(departmant)=>setSelectedDepartment(departmant)}/>)}
      </ScrollView>
      <ScrollView>
      {/* <SearchDetail news={[""]}/> */}
      {textbookArray.map((textbook)=><View>
        <Text>{JSON.stringify(textbook)}</Text>

      </View>)}
      </ScrollView>
    </View>
  );
};