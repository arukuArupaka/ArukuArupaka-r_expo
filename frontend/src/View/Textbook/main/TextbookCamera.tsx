import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CameraHome } from './Camera/CameraHome';
import { CameraDraw } from './Camera/CameraDraw';
import { CameraCamera } from './Camera/CameraCamera';

const Stack = createStackNavigator();

export const TextbookCamera = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false,
    }}>
      <Stack.Screen name='カメラホーム' component={CameraHome}
        options={{
          headerShown:false,
        }}>
      </Stack.Screen>

      <Stack.Screen name='下書き一覧' component={CameraDraw}
        options={{
          headerShown:false,
        }}>
      </Stack.Screen>

      <Stack.Screen name='出品する' component={CameraCamera}
        options={{
          headerShown:false,
        }}>
      </Stack.Screen>
      
    </Stack.Navigator>

  );
};




const styles = StyleSheet.create({

  main: {
    height:'100%',
    // backgroundColor: 'red',
    // justifyContent: 'flex-end', // Align content vertically in the center
    // alignItems: 'center', // Align content horizontally in the center
  },
});
