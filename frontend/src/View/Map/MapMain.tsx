import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DisplayMap from '../../component/Map/DisplayMap';
import DisplayList from '../../component/Map/DisplayList';
import { Ionicons } from '@expo/vector-icons';


const MapMainView = () => {

  const [showMap, setShowMap] = useState(true);

  const toggleComponent = () => {
    setShowMap(prev => !prev);
  };

  return (
    <View style = {{position: 'relative'}}>
      {showMap ? <DisplayList /> : <DisplayMap />}
      <TouchableOpacity
        onPress={() => toggleComponent()}
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '2%',
          width: 50,
          height: 50,
          borderRadius: 10,
          backgroundColor: '#fff',
          borderColor: showMap ? 'blue' : 'black',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2,
        }}>
        <Ionicons name= {showMap ? 'map-outline': 'list'} size={30} color="#EB3637" />
      </TouchableOpacity>
    </View>
  );
};
export default MapMainView;
