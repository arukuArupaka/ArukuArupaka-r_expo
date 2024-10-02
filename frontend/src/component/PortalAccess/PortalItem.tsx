import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,Linking} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const PortalItem = (props) => {
  const navigation = useNavigation();
  const [icon, setIcon] = React.useState("pushpino");

  React.useEffect(() => {
    setIcon(props.locksite ? 'pushpin' : 'pushpino');
  }, [props.locksite]);

  const weblock = () => {
    //setIcon(icon === 'unlock' ? 'lock' : 'unlock');
    props.onLock();
  };

  const openExternalBrowser = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL: ", err);
    });
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
          justifyContent: 'flex-start',
          width:"85%"
        }}
        onPress={() => {
          // navigation.navigate("HomeWebSite", props.webnavigate)
          openExternalBrowser(props.webnavigate)
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
          <AntDesign name={icon} size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
  
  export default PortalItem;