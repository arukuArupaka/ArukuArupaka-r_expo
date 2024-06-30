import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

    const SelectItem = (props) => {
        const navigation=useNavigation()
    const styles = StyleSheet.create({
        selectBox:{
            height:30,
            borderRadius: 20,
            backgroundColor: props.isSelected ? '#90b5fe' : '#b5ceff' ,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12, // 内側の余白を追加してテキストの長さに応じてサイズが変わるようにする
            marginHorizontal: 5, // 水平方向の余白を追加
            marginVertical: 5, // 垂直方向の余白を追加
        },
        boxTitle:{
            color:"#ffffff",
            fontSize:14,
            textAlign: 'center',
        },
    });
    return (
    <TouchableOpacity   onPress={props.onPress} >
      <View style={styles.selectBox}>
        <Text style={styles.boxTitle}>{props.name}</Text>
      </View>
    </TouchableOpacity>
    
    );
  }

export default SelectItem;