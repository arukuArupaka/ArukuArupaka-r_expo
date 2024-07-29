import { View, Platform, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBox } from './SearchBox';

export const New_headerTextbook = () => {

  return (
    <View style={{
      marginRight: 130,
      width: Dimensions.get("window").width - 70,
      height: 36,
      borderRadius: 20,
      backgroundColor: '#eeeeee',
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

  }}>
      <SearchBox  />
      <Ionicons name='search' size={20}></Ionicons>
  </View>
  );
};
