import React, { useState ,useEffect} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View,Image,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import ActionSheet from '@yfuks/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';



const ASetting = (props) => {

    // サーバーから写真のデータを取得するAPIエンドポイントを呼び出す
    

  //props.navigation.navigate('login')
  const [image, setImage] = useState(null);

  // const onPressAction = () => {
  //   return ActionSheet.options({
  //     options: [
  //       {text: '写真を選択', onPress: () => pickImage()},
  //     ],
  //     cancel: {text: 'キャンセル'},
  //   });
  // };

  const onOpenActionSheet=()=> {
    if(Platform.OS=='android'){
      pickImage()
      return
    }
    const options = ['写真を選択', 'キャンセル'];
    const cancelButtonIndex = 1;
    ActionSheet.showActionSheetWithOptions({
      options,
      cancelButtonIndex
    },
    buttonIndex => {
      if(buttonIndex==0){
        pickImage()
      }
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri);
    }
  }
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        <TouchableOpacity
          onPress={()=>props.navigation.navigate('Home')}
          style={{
            marginTop:0,
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
          }}
          > 
          {image&&<Image source={{uri:image}} style={{width: 200, height: 200 ,borderRadius:100,}}/>}
            <TouchableOpacity 
            onPress={onOpenActionSheet}
            style={{
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
            fontSize:30,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}></TextInput>
            <Text>学部</Text>
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:30,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}></TextInput>
            <Text>学科・専攻</Text>
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:30,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}></TextInput>
            <Text>回生</Text>
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:30,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}></TextInput>
            <Text>プロフィール</Text>
            <TextInput style={{
            marginTop:5,
            borderRadius:5,
            fontSize:30,
            backgroundColor:'#D9D9D9',
            marginBottom:20}}></TextInput>
            <TouchableOpacity 
            style={{
              marginLeft:'80%',
              backgroundColor:'blue',
              borderRadius:5,
              height:30
              }}><Text style={{
                color:'white',
                textAlign:'center',
                fontSize:20,
                fontWeight:'400',
                paddingTop:2,
              }} >登録</Text></TouchableOpacity>
        </View>

      </SafeAreaView>
    </ScrollView>
  );
};
export default ASetting;