import TimeTable from './src/View/TimeTableViewNavigateRoot'

const Header = createNativeHeaderNavigator();

function TimeTableHeader() {
    return (
      <NavigationContainer>
        <Header.Navigator initialRouteName='Home'>
          <Header.Screen name="TimeTable" component={TimeTableRoot} options={{ headerShown: false }}/>
        </Header.Navigator>
      </NavigationContainer>
    );
  }
  
  export default TimeTableHeader;