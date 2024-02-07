import HomeView from './src/View/HomeView'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeTable from './src/View/TimeTableView'
import BikeView from './src/View/BikeView'
import WeatherView from './src/View/weather'
import TimeTableRoot from './src/View/TimeTableViewNavigateRoot'
import ASetting from './src/View/ASetting';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TimeTableSetting from './src/View/TimeTableSetting';
import { TimeTableProvider } from './src/component/TimeTable/TimeTableContext';

import ALoginView from './src/View/ALoginView';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <TimeTableProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false }}/>
          <Stack.Screen name="TimeTable" component={TimeTable}
            options={({ navigation }) => ({
              title: '',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('TimeTableSetting')}>
                  <AntDesign name="ellipsis1" size={24} color="black" />
                </TouchableOpacity>
              ),
            })} />
          <Stack.Screen name="Bike" component={BikeView}/>
          <Stack.Screen name="weather" component={WeatherView}/>
          <Stack.Screen name="settings" component={ASetting} />
          {/* <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} options={{ title: '' }} /> */}
          {/* <Stack.Screen name="settings" component={ASetting}/> */}
          <Stack.Screen name="login" component={ALoginView} options={{ headerShown: false }}/>
          {/* <Stack.Screen name="TimeTableSetting" component={TimeTableSetting} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </TimeTableProvider>
  );
}


export default App;
