import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { TextbookLogin} from './main/TextbookLogin';
import { Textbookmain } from './Textbookmain';

const Stack = createStackNavigator();


export const Textbook = () => {

  return(

      <Stack.Navigator screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="本画面" component={Textbookmain}/>
        <Stack.Screen name="ログイン画面" component={TextbookLogin}/>
      </Stack.Navigator>

      
      

  );
};

