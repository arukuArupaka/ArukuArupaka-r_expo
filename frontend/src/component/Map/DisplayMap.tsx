import React from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const DisplayMap = () => {
    return (
        <View>
          <MapView
            style={{width: "100%",height: "100%"}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 34.98213493094731,
              longitude: 135.96364694774536,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          />
        </View>

      );
};
export default DisplayMap
