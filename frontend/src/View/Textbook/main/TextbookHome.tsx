import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderforTextbook1 } from '../../../component/Textbook/HeaderforTextbook1';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchList } from './SearchHome/SearchList';
import { SearchDetail } from './SearchHome/SearchDetail';
import { SearchSearch } from './SearchHome/SearchSearch';





//教科書販売ホームのナビゲーションについて実装した画面

const Stack = createStackNavigator();



export const TextbookHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="サーチリスト" component={SearchList} options={{headerShown:false}}/>
      <Stack.Screen name="サーチ詳細" component={SearchDetail} options={{headerShown:false}}/>
      {/* <Stack.Screen name="サーチサーチ" component={SearchSearch} options={{headerShown:false}}/> */}
    </Stack.Navigator>

    
  );
};


//   return(
//     <Tab.Navigator>
//         <Tab.Screen name='法学部' component={Law}></Tab.Screen>
//         <Tab.Screen name='産業社会学部' component={Industrial_Sociology}></Tab.Screen>
//         <Tab.Screen name='国際関係学部' component={Interntional_Relations}></Tab.Screen>
//         <Tab.Screen name='文学部' component={Literature}></Tab.Screen>
//         <Tab.Screen name='経営学部' component={Business_Administration}></Tab.Screen>
//         <Tab.Screen name='政策科学部' component={Policy_Science}></Tab.Screen>
//         <Tab.Screen name='総合心理学部' component={Comprehensive_Psychology}></Tab.Screen>
//         <Tab.Screen name='グローバル教養学部' component={Global}></Tab.Screen>
//         <Tab.Screen name='映像学部' component={Visual_Arts}></Tab.Screen>
//         <Tab.Screen name='情報理工学部' component={Information_Science_and_Engineering}></Tab.Screen>
//         <Tab.Screen name='経済学部' component={Economics}></Tab.Screen>
//         <Tab.Screen name='スポーツ健康科学部' component={Sports}></Tab.Screen>
//         <Tab.Screen name='食マネージメント学部' component={Eating_management}></Tab.Screen>
//         <Tab.Screen name='理工学部' component={Science_and_Engineering}></Tab.Screen>
//         <Tab.Screen name='生命科学部' component={Life_Sciences}></Tab.Screen>
//         <Tab.Screen name='薬学部' component={Medical}></Tab.Screen>
//     </Tab.Navigator>
//   )
// }



