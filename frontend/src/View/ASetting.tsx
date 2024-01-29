import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const ASetting = (props) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        <TouchableOpacity
          onPress={()=>props.navigation.navigate('Home')}
          style={{
            marginTop:20,
            marginLeft:20,
            backgroundColor:'#D9D9D9',
            borderRadius:50,
            height:40,
            width:40,
          }}
        >
          <Ionicons name="arrow-back" style={{marginVertical:6,color:'white',textAlign:'center'}} size={24} color="black" />
        </TouchableOpacity>
        <View style={{height:200}}>
          <View style={{
              backgroundColor:'#D9D9D9',
              height:200,
              width:200,
              borderRadius:100,
              marginLeft:'auto',
              marginRight:'auto',
          }}>
            <TouchableOpacity style={{
              position:'absolute',
              right:20,
              bottom:10,
              height:40,
              width:40,
              borderWidth:1,
              backgroundColor:'white',
              borderRadius:20,
            }}><AntDesign style={{
              textAlign:'center',
              marginTop:'auto',
              marginBottom:'auto',
            }} name="camera" size={24} color="black" /></TouchableOpacity>
          </View>
        </View>
        <View style={{marginHorizontal:10,marginTop:40,}}>
          <Text>ユーザーネーム</Text>
          <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:30,backgroundColor:'#D9D9D9'}}></TextInput>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default ASetting;