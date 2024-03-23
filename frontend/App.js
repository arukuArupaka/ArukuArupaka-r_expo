import HomeView from './src/View/HomeView'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeTable from './src/View/TimeTableView'
import BikeView from './src/View/BikeView'
import WeatherView from './src/View/Weather'
import {Textbook} from './src/View/Textbook/TextbookView';
import MapView from './src/View/Map/MapMain'
import TimeTableRoot from './src/View/TimeTableViewNavigateRoot'
import ASetting from './src/View/ASetting';
import { TouchableOpacity,Image,View} from 'react-native';
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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={AR_Store}>
    <TimeTableProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false }}/>
          <Stack.Screen name="TimeTable" component={TimeTable}
            options={({ navigation }) => ({
              title: '',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('TimeTableSetting')}>
                  <AntDesign name="setting" size={24} color="black" />
                </TouchableOpacity>
              ),
            })} />
          <Stack.Screen name="Bike" component={BikeView}/>
          <Stack.Screen name="Weather" component={WeatherView}/>
          <Stack.Screen name="Map" component={MapLoot}
            options={{headerTitle: (props) => <LogoTitle {...props} />}}/>
          <Stack.Screen name="textbook" component={Textbook} 
           options={{
            headerShown:false
           }}
          />

          <Stack.Screen name="settings" component={ASetting} options={{headerShown:false}}/>
          <Stack.Screen name="settingsToPage" component={ASettingToPage} options={{headerShown:false}}/>
          {/* <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} options={{ title: '' }} /> */}
          {/* <Stack.Screen name="settings" component={ASetting}/> */}
          <Stack.Screen name="login" component={ALoginView} options={{ headerShown: false }}/>
          <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} options={()=>({title: '',})}/>
          <Stack.Screen name="TimeTableClass" component={TimeTableClass} options={()=>({title: '',})}/>
          <Stack.Screen name="KomaView" component={KomaView} options={()=>({title: '',})}/>
          <Stack.Screen name="WebSite" component={WebSite} options={()=>({title: '',})}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TimeTableProvider>
    </Provider>
  );
}

export default App;
