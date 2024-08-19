import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TextbookLogin } from "./main/TextbookLogin";
import { TextbookFootNavigate } from "./TextbookFootNavigate";
import TextBookBuyDetail from "./main/TextBookBuyDetail";
import ChatView from "./ChatView";

const Stack = createStackNavigator();

export const TextbookNavigateRoot = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="本画面"
        component={TextbookFootNavigate}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#F36F21",
          },
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.navigate("サーチサーチ")}
          //   >
          //     <Ionicons name="search" size={30} color="black" />
          //   </TouchableOpacity>
          // ),
          headerTitle: () => (
            <TouchableOpacity>
              <Feather name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TextBookDetail"
        component={TextBookBuyDetail}
        options={{
          headerStyle: {
            backgroundColor: "#F36F21",
          },
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ChatView"
        component={ChatView}
        options={{
          headerStyle: {
            backgroundColor: "#F36F21",
          },
          headerTitle: "",
        }}
      />
      <Stack.Screen name="ログイン画面" component={TextbookLogin} />
    </Stack.Navigator>
  );
};
