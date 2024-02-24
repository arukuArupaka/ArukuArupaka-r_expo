import HomeView from './src/View/HomeView'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeTable from './src/View/TimeTableView'
import BikeView from './src/View/BikeView'
import WeatherView from './src/View/weather'
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
import { Provider } from 'react-redux'
import AR_Store from './src/redux/store';

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
          <Stack.Screen name="weather" component={WeatherView}/>
          <Stack.Screen name="Map" component={MapLoot}
            options={{headerTitle: (props) => <LogoTitle {...props} />}}/>
          <Stack.Screen name="settings" component={ASetting} />
          <Stack.Screen name="textbook" component={Textbook} 
           options={{
            headerShown:false
           }}
          />

          {/* <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} options={{ title: '' }} /> */}
          {/* <Stack.Screen name="settings" component={ASetting}/> */}
          <Stack.Screen name="login" component={ALoginView} options={{ headerShown: false }}/>
          <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} />
          <Stack.Screen name="TimeTableClass" component={TimeTableClass} />
          <Stack.Screen name="KomaView" component={KomaView} />
          <Stack.Screen name="WebSite" component={WebSite} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimeTableProvider>
    </Provider>
  );
}

export default App;