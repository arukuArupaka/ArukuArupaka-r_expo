import { createStackNavigator } from '@react-navigation/stack';
import react from 'react';
import {View,Text,TouchableOpacity} from 'react-native';


export const TextbookLogin = ({navigation}) => {

  const Stack = createStackNavigator();

  const buttons = [
    { color: 'orange', label: '干支', screen: '本画面' },
  ];

  return(
    <View >
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(button.screen)}
          >
            <View>
              <Text>{button.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
  );
};