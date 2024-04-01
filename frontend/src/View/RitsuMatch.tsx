import React from 'react';
import {Image, ImageBackground, ScrollView, Text, View} from 'react-native';

const RitsuMatch = () => {
    return(
        <ImageBackground style={{
             flex: 1,
             justifyContent: "center"
          }} source={require('./RitsuMatchAD.jpg')}
          resizeMode='contain'
          />

    )
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>RitsuMatch, world!</Text>
    </View>
  );
};
export default RitsuMatch;