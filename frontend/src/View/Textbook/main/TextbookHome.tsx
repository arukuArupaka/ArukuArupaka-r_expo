import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView ,ScrollView} from 'react-native';
import { HeaderforTextbook1 } from '../../../component/Textbook/HeaderforTextbook1';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchList } from './SearchHome/SearchList';
import { SearchDetail } from './SearchHome/SearchDetail';
import { SearchSearch } from './SearchHome/SearchSearch';
import DepartmentSelectBotton from '../../../component/Textbook/departmentSelectBotton';





//教科書販売ホームのナビゲーションについて実装した画面

const Stack = createStackNavigator();


export const TextbookHome = () => {

  const [selectedDepartment,setSelectedDepartment]=useState<string>("")

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
  return (
    <Stack.Navigator>
      <Stack.Screen name="サーチリスト" component={SearchList} options={{headerShown:false}}/>
      <Stack.Screen name="サーチ詳細" component={SearchDetail} options={{headerShown:false}}/>
      {/* <Stack.Screen name="サーチサーチ" component={SearchSearch} options={{headerShown:false}}/> */}
    </Stack.Navigator>

    
  );

  // return (
  //   <View
  //     style={{

  //     }}>
  //     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
  //       {departmentList.map((departmant)=><DepartmentSelectBotton name={departmant.departmantName} selectedDepartment={selectedDepartment} onSelected={(departmant)=>setSelectedDepartment(departmant)}/>)}
  //     </ScrollView>
  //     <SearchDetail news={[""]}/>

  //   </View>
  // );
};