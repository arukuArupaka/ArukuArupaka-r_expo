import React from 'react';
// import {View, Text,TouchableOpacity} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialIcons,MaterialCommunityIcons ,Ionicons,Entypo } from '@expo/vector-icons';
import { TextbookHome } from './TextbookHome';
import { TextbookTalk } from './Talk/TextbookTalk';
import { TextbookCamera } from './TextbookCamera';
import { TextbookMyPage } from './TextbookMyPage';
import { Chatroom } from "./Talk/Chatroom";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TalkProvider } from '../../../component/Textbook/Chat/TalkContext';

// const Stack = createStackNavigator();
const Stack = createStackNavigator();

export const TextbookTalkView = () => {
  return (
    <TalkProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown:false,
      }}>
          <Stack.Screen name='トークルーム' component={TextbookTalk}
            options={{
              headerShown:false,
            }}
          >
          </Stack.Screen>
          <Stack.Screen name='チャットルーム' component={Chatroom}
            options={{
              headerShown:false,
            }}
          >
          </Stack.Screen>
      </Stack.Navigator>
    </TalkProvider>
  );
};

//export default TextbookView;