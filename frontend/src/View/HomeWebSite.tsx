import React from 'react';
import { StyleSheet,View} from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeWebSite({ route }) {
  const { uri } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{uri:uri?uri:route.params}} decelerationRate="normal"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});