import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const BuildingListView = () => {
    return (
        <View>
        <View style={{ flexDirection: 'row' ,alignItems: 'center', margin: 10}}>
            <View style={{ width: 50, height: 50, backgroundColor: '#000', borderRadius: 50 }}></View>
            <View style={{margin: 10}}>
                <Text style={{ fontSize: 20 }}>セントラルアーク</Text>
                <Text style={{ fontSize:  16,color: '#EB3637'}}>広場</Text>
                <Text style={{ fontSize: 14,color: '#888888'}}>ドリームクロスカフェ</Text>
            </View>
        </View>
        <View style={{ width: 300, height: 1, backgroundColor: '#000000'}}></View>
        </View>
    );
};
export default BuildingListView;
