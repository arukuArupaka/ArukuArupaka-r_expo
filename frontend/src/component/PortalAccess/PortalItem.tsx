import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PortalItem = (props) => {
  const navigation = useNavigation();
  const [icon, setIcon] = React.useState("unlock");

  React.useEffect(() => {
    setIcon(props.locksite ? 'lock' : 'unlock');
  }, [props.locksite]);

  const weblock = () => {
    //setIcon(icon === 'unlock' ? 'lock' : 'unlock');
    props.onLock();
  };

  const styles = StyleSheet.create({
    websitePage: {
      height: 80,
      padding: 8,
      backgroundColor: '#eeeeee',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      width: "100%"
    },
    webTitle: {
      fontSize: 16,
      marginLeft: 20,
    },
  });

  return (
    <View style={styles.websitePage}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          navigation.navigate("HomeWebSite", props.webnavigate)
        }}
      >
        <Image
          source={props.logoMark?{ uri: props.logoMark }:require("../../image/no_image.jpg")}
          style={{
            borderRadius:5,
            width: 60,
            height: 60,
            margin: 10
          }}
          />
          <Text style={styles.webTitle}>{props.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={weblock}>
          <EvilIcons name={icon} size={60} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
  
  export default PortalItem;