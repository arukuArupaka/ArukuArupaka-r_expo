import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

import { InstantSearch } from 'react-instantsearch-core';

import { SearchBox } from '../../../../component/Textbook/SearchBox';
import { InfiniteHits } from './InfiniteHits';

export const SearchSearch = ({ navigation }) => {
  const navigationRef = useNavigationContainerRef();

  const subscription = Notifications.addNotificationResponseReceivedListener(response => {
    if (navigationRef.isReady()) {
      // 最上位のスタックナビゲーターから、目的のスクリーンまでのパスを指定
      navigationRef.navigate('ホーム',

        // { // 最上位のスタックナビゲーター内のスクリーン
        //   screen: '本画面', // 'textbook' スタック内のスクリーン
        //   params: {
        //     screen: 'ホーム', // 'textbookView' スタック内のスクリーン
        //     params: {
        //       screen: 'サーチ詳細', // '本画面' スタック内のタブナビゲーター
        //     },
        //   },
        // }


      );
    }
  });


  return (<SafeAreaView style={styles.safe}>
    <StatusBar />
    <View style={styles.container}>
      <InfiniteHits hitComponent={Hit} navigation={navigation} />
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
});

function Hit({ hit }) {
  return (
    <View style ={{ flex: 1}}>
      <Text style={{ fontSize: 20 }}>{hit.productName}</Text>
      <Text>{hit.department}</Text>
      <Text>{hit.price}</Text>
    </View>
  );
}
