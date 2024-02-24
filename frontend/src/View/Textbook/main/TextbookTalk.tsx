import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderforTextbook2 } from '../../../component/Textbook/HeaderforTextbook2';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

export const TextbookTalk = () => {
  return (
    <View>
      <HeaderforTextbook2 />
      <View style={styles.main}>
        <Text>djdjdjdj</Text>
      </View>
    </View>
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
