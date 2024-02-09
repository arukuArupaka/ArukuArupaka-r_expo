import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function LogoTitle() {
    return (
        <View style={{
            marginRight: 130,
            width: Dimensions.get("window").width - 70,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#eeeeee',
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <TextInput placeholder="なにかお探しですか？"></TextInput>
            <Ionicons name='search' size={20}></Ionicons>
        </View>
    );
} export default LogoTitle;
