import HomeView from './src/View/HomeView'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeTable from './src/View/TimeTableView'
import BikeView from './src/View/BikeView'
import WeatherView from './src/View/weather'
import TimeTableRoot from './src/View/TimeTableViewNavigateRoot'
import ASetting from './src/View/ASetting';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false }}/>
        <Stack.Screen name="TimeTable" component={TimeTableRoot} options={{ headerShown: false }}/>
        <Stack.Screen name="Bike" component={BikeView}/>
        <Stack.Screen name="weather" component={WeatherView}/>
        <Stack.Screen name="settings" component={ASetting}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;