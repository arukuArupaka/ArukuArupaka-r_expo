import React from 'react';
// import {View, Text,TouchableOpacity} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialIcons,MaterialCommunityIcons ,Ionicons,Entypo } from '@expo/vector-icons';
import { TextbookHome } from './main/TextbookHome';
import { TextbookTalk } from './main/Talk/TextbookTalk';
import { TextbookCamera } from './main/TextbookCamera';
import { TextbookMyPage } from './main/TextbookMyPage';
import { TextbookTalkView } from './main/TextbookTalkView';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// const buttons = [
//   { color: 'orange', label: '干支', screen: 'ログイン画面' },
// ];

export const Textbookmain = () => {
  return(
      <Tab.Navigator>
        
        <Tab.Screen name='ホーム' component={TextbookHome}
          options={{
            headerShown:false,
            tabBarIcon: ({focused}) => (<MaterialCommunityIcons name="home" size={36} color={focused ? '#027aff':'black'} />
            ),
            // headerTitle: (props) => <HeaderforTextbookHome {...props} />
        }} 
        >
        </Tab.Screen>

        <Tab.Screen name='出品' component={TextbookCamera}
         options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (<Entypo name="camera" size={36} color={focused ? '#027aff':'black'}  /> 
          ),
          // headerTitle: (props) => <HeaderforTextbookHome {...props} />
        }} 
        >

        </Tab.Screen>

        <Tab.Screen name='トーク' component={TextbookTalkView}
         options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (<Ionicons name="chatbubble-ellipses" size={36} color={focused ? '#027aff':'black'} /> 
          )
        }} 
        >
      </Tab.Screen>
        
        <Tab.Screen name='マイページ' component={TextbookMyPage}
         options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (<Ionicons name="person-circle-outline" size={36} color={focused ? '#027aff':'black'} />
          )
        }} 
        >
        </Tab.Screen>
      </Tab.Navigator>
      );
    };




    // <View>
    //   {buttons.map((button, index) => (
    //       <TouchableOpacity
    //         key={index}
    //         onPress={() => navigation.navigate(button.screen)}
    //       >
    //         <Text>
    //           jhjdjdj
    //         </Text>
    //       </TouchableOpacity>
    //   ))}
      
    // </View>

