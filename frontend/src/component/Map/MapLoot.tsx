import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapMainView from '../../View/Map/MapMain';
import MapFavoriteView from '../../View/Map/MapFavorite';
import { MaterialIcons,MaterialCommunityIcons ,Ionicons } from '@expo/vector-icons';
import MapNotificateView from '../../View/Map/MapNotificate';
import MapFriendsView from '../../View/Map/MapFriends';
import { Text, TouchableOpacity, View } from 'react-native';
import LogoTitle from './headerForMap';
const Tab = createBottomTabNavigator();

function MapLoot({navigation}) {
    return (
        <Tab.Navigator initialRouteName='main'>
            <Tab.Screen name='main' component={MapMainView}
                options={{
                    tabBarIcon: () => (<MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="black" />
                    ),
                    headerTitle: (props) => <View style={{flexDirection:'row',alignItems:'center'}}><TouchableOpacity onPress={()=>navigation.navigate('Home')}><Ionicons name="chevron-back" style={{marginRight:10}} size={30} color="black" /></TouchableOpacity><LogoTitle/></View>
                }} />
                            <Tab.Screen name='favorite' component={MapFavoriteView}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<Ionicons name="star-outline" size={24} color="black" />
                    )
                }} />
                
            <Tab.Screen name='notificate' component={MapNotificateView}
                options={{
                    tabBarIcon: () => (<Ionicons name="notifications-outline" size={24} color="black" />
                    ),
                    headerTitle:"",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                          <Ionicons name="chevron-back" style={{marginRight:10}} size={30} color="black" />
                        </TouchableOpacity>
                      ),
                }} />
            <Tab.Screen name='friends' component={MapFriendsView}
                options={{
                    tabBarIcon: () => (<MaterialIcons name="person-add-alt" size={24} color="black" />
                    ),
                    headerTitle:"",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                          <Ionicons name="chevron-back" style={{marginRight:10}} size={30} color="black" />
                        </TouchableOpacity>
                      ),
                }} />
        </Tab.Navigator>
    );
} export default MapLoot
