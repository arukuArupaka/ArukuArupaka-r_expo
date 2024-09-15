import HomeView from './src/View/HomeView'
import { NavigationContainer, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeTable from './src/View/TimeTableView'
import BikeView from './src/View/BikeView'
import WeatherView from './src/View/weather'
import {TextbookNavigateRoot} from './src/View/Textbook/TextbookNavigateRoot';
import MapView from './src/View/Map/MapMain'
import TimeTableRoot from './src/View/TimeTableViewNavigateRoot'
import ASetting from './src/View/ASetting';
import { TouchableOpacity,Image,View,TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TimeTableSetting from './src/View/TimeTableSetting';
import { TimeTableProvider } from './src/component/TimeTable/TimeTableContext';
import LogoTitle from './src/component/Map/headerForMap';
import ALoginView from './src/View/ALoginView';
import MapLoot from './src/component/Map/MapLoot';
import TimeTableClass from './src/View/TimeTableClass';
import KomaView from './src/View/KomaView';
import WebSite from './src/View/WebSite';
import { Provider } from 'react-redux'
import AR_Store from './src/redux/store';
import ASettingToPage from './src/View/ASettingToPage';
import * as Notifications from 'expo-notifications';
import React from 'react';
import HomeWebSite from './src/View/HomeWebSite';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome,Feather } from '@expo/vector-icons';
import { SearchSearch } from './src/View/Textbook/main/SearchHome/SearchSearch';
// import { HeaderforTextbook1 } from './src/component/Textbook/HeaderforTextbook1';
import { New_headerTextbook } from './src/component/Textbook/New_headerTextbook';

//algolia用
import { InstantSearch } from 'react-instantsearch-core';
import algoliasearch from 'algoliasearch/lite';
import RitsuMatch from './src/View/RitsuMatch';
import KitchenCarDetailView from './src/component/Map/KitchenCarDetailView';
import PortalAccess from './src/View/PortalAccess';
const searchClient = algoliasearch('8LXF97V2DN', 'd9e686fcc36b490017d240823c242f19'); //algoliaのapplicationIDとadmin API key


const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useNavigationContainerRef();
  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {

      const { id , name, type, ids } = response.notification.request.content.data;
      if (navigationRef.isReady()) {
        // 最上位のスタックナビゲーターから、目的のスクリーンまでのパスを指定
        navigationRef.navigate('textbook', { // 最上位のスタックナビゲーター内のスクリーン
          screen: '本画面', // 'textbook' スタック内のスクリーン
          params: {
            screen: 'トーク',
            /*params: {
              screen: 'チャットルーム',
              params: {
                id: id,
                name: name,
                type: type,
                ids: ids,
              }
            }*/
          }
        });
      }
    });

    return () => subscription.remove();
  }, []);

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
                component={TimeTable}
                options={({ navigation }) => ({
                  title: "",
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("TimeTableSetting")}
                    >
                      <AntDesign name="setting" size={24} color="black" />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="Bike"
                component={BikeView}
                options={{
                  headerTitle: props => <MaterialIcons 
                  name="directions-bike"
                  size={40} 
                  color="black"
                  />,
                  headerRight: () => (
                    <TouchableOpacity
                      
                    >
                     <MaterialIcons name="question-mark" size={40} color="black" />
                    </TouchableOpacity>
                  ),
                  headerLeft: (props) => <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>navigationRef.navigate('Home')}>
                      <Ionicons name="chevron-back" style={{marginRight:10}} size={30} color="black" />
                      </TouchableOpacity></View>,
                }}
              />
              <Stack.Screen 
              name="weather" 
              component={WeatherView} 
              options={{
                headerTitle: props => <MaterialCommunityIcons 
                name="weather-partly-cloudy" 
                size={40} 
                color="black" />,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TimeTableSetting")}
                  >
                  <MaterialIcons name="notifications-none" size={40} color="black" />
                  </TouchableOpacity>
                ),
                headerLeft: (props) => <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigationRef.navigate('Home')}>
                  <Ionicons name="chevron-back" style={{marginRight:10}} size={30} color="black" />
                  </TouchableOpacity></View>,
              }}
              />

              <Stack.Screen
                name="Map"
                component={MapLoot}
                options={{ headerShown: false}}
              />
              <Stack.Screen
                name="PortalAccess"
                component={PortalAccess}
                options={{
                  headerTitle: props => (""),
                  headerLeft: (props) => <View style={{flexDirection:'row',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>navigationRef.navigate('Home')}>
                  <Ionicons name="chevron-back" style={{marginRight:10}} size={30} color="black" />
                  </TouchableOpacity></View>} 
                }
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
                name="TimeTableSetting"
                component={TimeTableSetting}
                options={() => ({ title: "" })}
              />
              <Stack.Screen
                name="TimeTableClass"
                component={TimeTableClass}
                options={() => ({ title: "" })}
              />
              <Stack.Screen
                name="KomaView"
                component={KomaView}
                options={() => ({ title: "" })}
              />
              <Stack.Screen
                name="WebSite"
                component={WebSite}
                options={() => ({ title: "" })}
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
               <Stack.Screen name="ホーム" component={TextbookNavigateRoot}
               options={{headerShown:false}}
            />

          {/* <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} options={{ title: '' }} /> */}
          {/* <Stack.Screen name="settings" component={ASetting}/> */}
          <Stack.Screen
            name="MapKitchenCarDetail"
            component={KitchenCarDetailView}
            options={() => ({ title: "" })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TimeTableProvider>
    </InstantSearch>
    </Provider>
  );
}

export default App;
