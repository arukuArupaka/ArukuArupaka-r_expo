import HomeView from "./src/View/HomeView";
import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikeView from "./src/View/BikeView";
import WeatherView from "./src/View/weather";
import { TextbookNavigateRoot } from "./src/View/Textbook/TextbookNavigateRoot";
import MapView from "./src/View/Map/MapMain";
import ASetting from "./src/View/ASetting";
import { TouchableOpacity, Image, View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TimeTableProvider } from "./src/component/TimeTable/TimeTableContext";
import TimeTableView from "./src/View/TimeTable/TimeTableView";
import LogoTitle from "./src/component/Map/headerForMap";
import ALoginView from "./src/View/ALoginView";
import MapLoot from "./src/component/Map/MapLoot";
import { Provider } from "react-redux";
import AR_Store from "./src/redux/store";
import ASettingToPage from "./src/View/ASettingToPage";
import * as Notifications from "expo-notifications";
import React from "react";
import HomeWebSite from "./src/View/HomeWebSite";
import { Platform } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { SearchSearch } from "./src/View/Textbook/main/SearchHome/SearchSearch";
// import { HeaderforTextbook1 } from './src/component/Textbook/HeaderforTextbook1';
import { New_headerTextbook } from "./src/component/Textbook/New_headerTextbook";

//algolia用
import { InstantSearch } from "react-instantsearch-core";
import algoliasearch from "algoliasearch/lite";
import RitsuMatch from "./src/View/RitsuMatch";
import KitchenCarDetailView from "./src/component/Map/KitchenCarDetailView";
import PortalAccess from "./src/View/PortalAccess";
import ClassPeriodOptions from "./src/View/TimeTable/ClassPeriodOptions";
import TimeTableSetting from "./src/View/TimeTable/TimeTableSetting";
import ClassPeriodDetail from "./src/View/TimeTable/ClassPeriodDetail";
import TimeTableFriendRegisterVIew from "./src/View/TimeTable/TimeTableFriendRegisterVIew";
import BuildingDetailsScreen from "./src/component/Map/BuildingDetailsScreen";
import FirebaseNotificationList from "./src/View/FirebaseNotification";
import TimeTableFriendList from "./src/View/TimeTable/TimeTableFriendList";
import TimeTableFriendSearch from "./src/View/TimeTable/TimeTableFriendSearch";
import ACalendar from "./src/View/ACalender";
import TransitScheduleMain from "./src/View/TransitScheduleScreen/TransitScheduleMain";
import TransitScheduleWebView from "./src/View/TransitScheduleScreen/TransitScheduleWebView";
import CleanLoginView from "./src/View/clean/CleanLoginView";
import CleanMainView from "./src/View/clean/CleanMainView";
import CleanPostView from "./src/View/clean/CleanPostView";
import CleanMyPage from "./src/View/clean/CleanMyPage";
import CleanPostConfirmation from "./src/View/clean/CleanPostConfirmation";
import CleanHowToView from "./src/View/clean/CleanHowToView";
import {
  useFonts,
  ZenMaruGothic_400Regular,
  ZenMaruGothic_700Bold,
} from "@expo-google-fonts/zen-maru-gothic";
import CleanPostRanking from "./src/View/clean/ClenPostRanking";

const searchClient = algoliasearch(
  "8LXF97V2DN",
  "d9e686fcc36b490017d240823c242f19"
); //algoliaのapplicationIDとadmin API key

const Stack = createNativeStackNavigator();
console.log("Current Platform:", Platform.OS); // これを追加

function App() {
  const [fontsLoaded] = useFonts({
    ZenMaruGothic_400Regular,
    ZenMaruGothic_700Bold,
  });
  const navigationRef = useNavigationContainerRef();
  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { id, name, type, ids } =
          response.notification.request.content.data;
        if (navigationRef.isReady()) {
          // 最上位のスタックナビゲーターから、目的のスクリーンまでのパスを指定
          navigationRef.navigate("textbook", {
            // 最上位のスタックナビゲーター内のスクリーン
            screen: "本画面", // 'textbook' スタック内のスクリーン
            params: {
              screen: "トーク",
              /*params: {
              screen: 'チャットルーム',
              params: {
                id: id,
                name: name,
                type: type,
                ids: ids,
              }
            }*/
            },
          });
        }
      }
    );

    return () => subscription.remove();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={AR_Store}>
      <InstantSearch searchClient={searchClient} indexName="text_book">
        <TimeTableProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TimeTable"
                component={TimeTableView}
                options={({ route, navigation }) => ({
                  title: "",
                  headerRight: () => (
                    <>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("TimeTableSetting")}
                      >
                        <AntDesign name="setting" size={24} color="black" />
                      </TouchableOpacity>
                    </>
                  ),
                  headerTintColor: "#000",
                  headerBackTitleVisible: false,
                  headerTitle: route.params?.headerTitle || "あなたの時間割",
                })}
              />
              <Stack.Screen
                name="ClassPeriodOptions"
                component={ClassPeriodOptions}
                options={() => ({
                  title: "",
                  headerBackTitleVisible: false,
                  headerTintColor: "#000",
                })}
              />
              <Stack.Screen
                name="TimeTableSetting"
                component={TimeTableSetting}
                options={() => ({
                  title: "",
                  headerBackTitleVisible: false,
                  headerTintColor: "#000",
                })}
              />
              <Stack.Screen
                name="TimeTableFriendRegister"
                component={TimeTableFriendRegisterVIew}
                options={() => ({
                  title: "QRでフレンド登録",
                  headerBackTitleVisible: false,
                  headerTintColor: "#000",
                })}
              />
              <Stack.Screen
                name="TimeTableFriendSearch"
                component={TimeTableFriendSearch}
                options={() => ({
                  title: "フレンド検索",
                  headerBackTitleVisible: false,
                  headerTintColor: "#000",
                  headerRight: () => (
                    <>
                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() =>
                          navigationRef.navigate("TimeTableFriendRegister")
                        }
                      >
                        <Feather name="camera" size={24} color="black" />
                      </TouchableOpacity>
                    </>
                  ),
                })}
              />
              <Stack.Screen
                name="TimeTableFriendList"
                component={TimeTableFriendList}
                options={() => ({
                  title: "フレンド一覧",
                  headerBackTitleVisible: false,
                  headerTintColor: "#000",
                  headerRight: () => (
                    <>
                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() =>
                          navigationRef.navigate("TimeTableFriendSearch")
                        }
                      >
                        <AntDesign name="adduser" size={24} color="black" />
                      </TouchableOpacity>
                    </>
                  ),
                })}
              />
              <Stack.Screen
                name="ClassPeriodDetail"
                component={ClassPeriodDetail}
                options={({ route }) => ({
                  title: "",
                  headerBackTitleVisible: false,
                  headerTintColor: "#000",
                  headerTitle: `${route.params?.classPeriodData.weekOfTheDay}曜${route.params?.classPeriodData.period}限`,
                  headerTitleStyle: {
                    fontSize: 20,
                  },
                })}
              />
              <Stack.Screen
                name="FirebaseNotificationList"
                component={FirebaseNotificationList}
                options={() => ({
                  title: "",
                  headerBackTitleVisible: false,
                  headerTintColor: "#000",
                })}
              />
              <Stack.Screen
                name="Bike"
                component={BikeView}
                options={{
                  headerTitle: () => (
                    <MaterialIcons
                      name="directions-bike"
                      size={40}
                      color="black"
                    />
                  ),
                  headerRight:
                    Platform.OS === "ios"
                      ? () => (
                          <TouchableOpacity>
                            <MaterialIcons
                              name="question-mark"
                              size={40}
                              color="black"
                            />
                          </TouchableOpacity>
                        )
                      : null,
                  headerLeft:
                    Platform.OS === "ios"
                      ? () => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => navigationRef.navigate("Home")}
                            >
                              <Ionicons
                                name="chevron-back"
                                style={{ marginRight: 10 }}
                                size={30}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      : undefined,
                }}
              />
              <Stack.Screen
                name="weather"
                component={WeatherView}
                options={{
                  headerTitle: (props) => (
                    <MaterialCommunityIcons
                      name="weather-partly-cloudy"
                      size={40}
                      color="black"
                    />
                  ),
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("TimeTableSetting")}
                    >
                      <MaterialIcons
                        name="notifications-none"
                        size={40}
                        color="black"
                      />
                    </TouchableOpacity>
                  ),
                  headerLeft: (props) => (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => navigationRef.navigate("Home")}
                      >
                        <Ionicons
                          name="chevron-back"
                          style={{ marginRight: 10 }}
                          size={30}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  ),
                }}
              />
              <Stack.Screen
                name="Map"
                component={MapLoot}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PortalAccess"
                component={PortalAccess}
                options={{
                  headerTitle: (props) => "",
                  headerLeft:
                    Platform.OS === "ios"
                      ? () => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => navigationRef.navigate("Home")}
                            >
                              <Ionicons
                                name="chevron-back"
                                style={{ marginRight: 10 }}
                                size={30}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      : undefined,
                }}
              />
              {/* <Stack.Screen
                name="textbook"
                component={Textbook}
                options={{
                  headerShown: false,
                }}
              />  */}
              <Stack.Screen
                name="settings"
                component={ASetting}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settingsToPage"
                component={ASettingToPage}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} options={{ title: '' }} /> */}
              {/* <Stack.Screen name="settings" component={ASetting}/> */}
              <Stack.Screen
                name="login"
                component={ALoginView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeWebSite"
                component={HomeWebSite}
                options={() => ({ title: "" })}
              />
              <Stack.Screen
                name="RitsuMatch"
                component={RitsuMatch}
                options={() => ({ title: "" })}
              />
              <Stack.Screen
                name="ホーム"
                component={TextbookNavigateRoot}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} options={{ title: '' }} /> */}
              {/* <Stack.Screen name="settings" component={ASetting}/> */}
              <Stack.Screen
                name="MapKitchenCarDetail"
                component={KitchenCarDetailView}
                options={() => ({ title: "" })}
              />
              <Stack.Screen
                name="BuildingDetails"
                options={() => ({ title: "建物詳細" })}
                component={BuildingDetailsScreen}
              />
              <Stack.Screen
                name="TransitScheduleMain"
                options={() => ({ title: "建物詳細", headerShown: false })}
                component={TransitScheduleMain}
              />
              <Stack.Screen
                name="CleanLoginView"
                options={() => ({ headerShown: false })}
                component={CleanLoginView}
              />
              <Stack.Screen
                name="CleanMainView"
                component={CleanMainView}
                options={{
                  headerTitle: () => (
                    <MaterialIcons
                      name="cleaning-services"
                      size={40}
                      color="black"
                    />
                  ),
                  headerRight:
                    Platform.OS === "ios"
                      ? () => (
                          <TouchableOpacity
                            onPress={() =>
                              navigationRef.navigate("CleanHowToView")
                            }
                          >
                            <MaterialIcons
                              name="question-mark"
                              size={40}
                              color="black"
                            />
                          </TouchableOpacity>
                        )
                      : null,
                  headerLeft:
                    Platform.OS === "ios"
                      ? () => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => navigationRef.navigate("Home")}
                            >
                              <Ionicons
                                name="chevron-back"
                                style={{ marginRight: 10 }}
                                size={30}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      : undefined,
                  headerStyle: {
                    backgroundColor: "#8DFFAF", //背景色
                  },
                }}
              />
              <Stack.Screen
                name="CleanMyPage"
                component={CleanMyPage}
                options={{
                  headerTitle: () => (
                    <MaterialIcons
                      name="cleaning-services"
                      size={40}
                      color="black"
                    />
                  ),
                  headerRight:
                    Platform.OS === "ios"
                      ? () => (
                          <TouchableOpacity
                            onPress={() =>
                              navigationRef.navigate("CleanHowToView")
                            }
                          >
                            <MaterialIcons
                              name="question-mark"
                              size={40}
                              color="black"
                            />
                          </TouchableOpacity>
                        )
                      : null,
                  headerLeft:
                    Platform.OS === "ios"
                      ? () => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                navigationRef.navigate("CleanMainView")
                              }
                            >
                              <Ionicons
                                name="chevron-back"
                                style={{ marginRight: 10 }}
                                size={30}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      : undefined,
                  headerStyle: {
                    backgroundColor: "#8DFFAF", //背景色
                  },
                }}
              />
              <Stack.Screen
                name="CleanPostRanking"
                component={CleanPostRanking}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerTitle: () => (
                    <MaterialIcons
                      name="cleaning-services"
                      size={40}
                      color="black"
                    />
                  ),
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons
                        name="chevron-back"
                        style={{ marginRight: 10 }}
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                  ),
                  headerStyle: {
                    backgroundColor: "#8DFFAF",
                  },
                  headerTitleAlign: "center",
                })}
              />

              <Stack.Screen
                name="CleanPostView"
                component={CleanPostView}
                options={{
                  headerTitle: () => (
                    <MaterialIcons
                      name="cleaning-services"
                      size={40}
                      color="black"
                    />
                  ),
                  headerRight:
                    Platform.OS === "ios"
                      ? () => (
                          <TouchableOpacity>
                            <MaterialIcons
                              name="question-mark"
                              size={40}
                              color="black"
                            />
                          </TouchableOpacity>
                        )
                      : null,
                  headerLeft:
                    Platform.OS === "ios"
                      ? () => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => navigationRef.navigate("Home")}
                            >
                              <Ionicons
                                name="chevron-back"
                                style={{ marginRight: 10 }}
                                size={30}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      : undefined,
                  headerStyle: {
                    backgroundColor: "#8DFFAF", //背景色
                  },
                }}
              />
              <Stack.Screen
                name="CleanHowToView"
                component={CleanHowToView}
                options={{
                  headerTitle: () => (
                    <MaterialIcons
                      name="cleaning-services"
                      size={40}
                      color="black"
                    />
                  ),
                  headerRight:
                    Platform.OS === "ios"
                      ? () => (
                          <TouchableOpacity>
                            <MaterialIcons
                              name="question-mark"
                              size={40}
                              color="black"
                            />
                          </TouchableOpacity>
                        )
                      : null,
                  headerLeft:
                    Platform.OS === "ios"
                      ? () => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                navigationRef.navigate("CleanMainView")
                              }
                            >
                              <Ionicons
                                name="chevron-back"
                                style={{ marginRight: 10 }}
                                size={30}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      : undefined,
                  headerStyle: {
                    backgroundColor: "#8DFFAF", //背景色
                  },
                }}
              />
              <Stack.Screen
                name="CleanPostConfirmation"
                component={CleanPostConfirmation}
                options={{
                  headerShown: true,
                  headerTitle: () => (
                    <MaterialIcons
                      name="cleaning-services"
                      size={40}
                      color="black"
                    />
                  ),
                  headerStyle: {
                    backgroundColor: "#8DFFAF",
                  },
                  headerTitleAlign: "center",
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="TransitScheduleWebView"
                options={() => ({ title: "建物詳細", headerShown: false })}
                component={TransitScheduleWebView}
              />
              <Stack.Screen
                name="ACalendar"
                component={ACalendar}
                options={({ navigation }) => ({
                  title: "カレンダー",
                  headerStyle: {
                    backgroundColor: "#fff", // 白背景
                  },
                  headerTintColor: "#000", // 戻るボタンやタイトルの色を黒に
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                  headerBackTitleVisible: false, // 「戻る」テキストを非表示
                  headerBackImage: () => (
                    <Ionicons
                      name="arrow-back"
                      size={24}
                      color="black"
                      style={{ marginLeft: 10 }}
                    />
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TimeTableProvider>
      </InstantSearch>
    </Provider>
  );
}

export default App;
