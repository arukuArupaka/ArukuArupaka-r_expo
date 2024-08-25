import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPageHome } from './MyPage/MyPageHome';
import { MyPageGoods } from './MyPage/MyPageGoods';
import { MyPageFavorite } from './MyPage/MyPageFavorite';
import { MyPageSell } from './MyPage/MyPageSell';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const TextbookMyPage = () => {

  if(!useSelector((state:any)=>state.user.isLogin)){
    return(
      <View style={{justifyContent:"center",alignItems:"center",flex:1}}>

        <Text style={{textAlign:"center"}}>ログインしてください</Text>
      </View>)
  }
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
    }}>

      <Stack.Screen name='マイページホーム' component={MyPageHome}
        options={{
          headerShown:false,
        }}
      >
      </Stack.Screen>

      <Stack.Screen name='マイページグッズ' component={MyPageGoods}
        options={{
          headerShown:false,
        }}
      >
      </Stack.Screen>

      <Stack.Screen name='マイページお気に入り' component={MyPageFavorite}
        options={{
          headerShown:false,
        }}
      >
      </Stack.Screen>

      <Stack.Screen name='マイページ出品' component={MyPageSell}
        options={{
          headerShown:false,
        }}
      >
      </Stack.Screen>

    </Stack.Navigator>
  );
};




