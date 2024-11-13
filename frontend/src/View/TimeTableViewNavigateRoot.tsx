import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimeTableView from './TimeTableView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TimeTableNotficationList from '../component/TimeTable/TimeTableNotficationListView' 
import { Feather } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <Tab.Navigator>
        <Tab.Screen name="時間割" 
            component={TimeTableView} 
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="table-edit" size={24} color="black" />)
                }}/>
        <Tab.Screen name="通知一覧"
        component={TimeTableNotficationList} 
        options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Feather name="bell" size={24} color="black" />)
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}