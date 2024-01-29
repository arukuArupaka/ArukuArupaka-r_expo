import React from 'react';
import {Text, View,StyleSheet} from 'react-native';

const ClassTime = (props) => {
        
  return (
        <View style={styles.body}>
                <Text
                style={{
                         textAlign:'center',
                         top: '10%', 
                        // height:'100%',
                        // lineHeight:35,
                        // marginLeft:1,
                        // marginRight:1,
                }}>
                {props.data.start}
                </Text>
                <Text
                style={{
                        textAlign:'center',
                        top: '55%',
                        // textAlign:'center', 
                        // height:'100%',
                        // lineHeight:35,
                        // marginLeft:1,
                        // marginRight:1,
                        // flex:1,
                }}>
                {props.data.end}
                </Text>
        </View>
  );
};

const styles=StyleSheet.create({
        body:{
                flex:1,
                marginTop:1,
                marginBottom:1,
                height:'100%',
        }
})
export default ClassTime;