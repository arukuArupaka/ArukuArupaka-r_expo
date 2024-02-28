import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform,Dimensions } from 'react-native';
import { HeaderforTextbook2 } from '../../../../component/Textbook/HeaderforTextbook2';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CameraHome = ({ navigation }) => {

  return (
    <View>
      <HeaderforTextbook2 />
      <View style={styles.main}>
        <View
          style={{
            justifyContent: 'space-between',
            width: "80%",
            height: '75%'
          }}>

          <TwoBox boxname='下書き一覧' iconName='draw' Screen='下書き一覧' navigation={navigation} Color='lightgreen' IconColor='mediumseagreen' />
          <TwoBox boxname='出品する' iconName='camera-plus' Screen='出品する' navigation={navigation} Color='lightblue' IconColor='cornflowerblue'/>

        </View>
      </View>
    </View>
  );
};

const TwoBox = (props) => {
  const { navigation } = props; // Extracting navigation from props
  return (
    <TouchableOpacity style={[styles.box,{backgroundColor:props.Color,borderColor:props.IconColor}]}
      onPress={() => navigation.navigate(props.Screen)}
    >
      <MaterialCommunityIcons name={props.iconName} size={88} color={props.IconColor}/>
      <Text style={styles.BoxText}>{props.boxname}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  main: {
    height:Platform.OS==='ios'?'88%':'92%',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },

  box: {
    height: '40%',
    width: '100%',
    backgroundColor: 'lemonchiffon',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: "#F36F21",
  },

  BoxText: {
    fontSize: 40,
    color: 'black',
  }

});
