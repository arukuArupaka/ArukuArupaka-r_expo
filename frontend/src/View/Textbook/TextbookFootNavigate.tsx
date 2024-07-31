import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { TextbookHome } from "./main/TextbookHome";
import { TextbookCamera } from "./main/TextbookCamera";
import { TextbookMyPage } from "./main/TextbookMyPage";
import TextBookChatView from "./main/TextBookChatView";

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const buttons = [
//   { color: 'orange', label: '干支', screen: 'ログイン画面' },
// ];

export const TextbookFootNavigate = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ホーム"
        component={TextbookHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={36}
              color={focused ? "#027aff" : "black"}
            />
          ),
          // headerTitle: (props) => <HeaderforTextbookHome {...props} />
        }}
      />
      <Tab.Screen
        name="出品"
        component={TextbookCamera}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="camera"
              size={36}
              color={focused ? "#027aff" : "black"}
            />
          ),
          // headerTitle: (props) => <HeaderforTextbookHome {...props} />
        }}
      />
      <Tab.Screen
        name="トーク"
        component={TextBookChatView}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble-ellipses"
              size={36}
              color={focused ? "#027aff" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="マイページ"
        component={TextbookMyPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle-outline"
              size={36}
              color={focused ? "#027aff" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
