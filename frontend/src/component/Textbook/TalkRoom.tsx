import React from 'react';
import { Platform, Text, View,StyleSheet,useColorScheme, Button, ScrollView, Dimensions} from 'react-native'; 

const TalkRoom = () => {
    const styles = StyleSheet.create({
        body:{
            backgroundColor: 'blue',
            height: 80
        }
    });

    return (
        <View style={styles.body}></View>
    )
};
export default TalkRoom;