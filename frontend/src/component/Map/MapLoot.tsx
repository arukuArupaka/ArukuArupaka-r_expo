import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapMainView from '../../View/Map/MapMain';
import MapFavoriteView from '../../View/Map/MapFavorite';
import { MaterialIcons,MaterialCommunityIcons ,Ionicons } from '@expo/vector-icons';
import MapNotificateView from '../../View/Map/MapNotificate';
import MapFriendsView from '../../View/Map/MapFriends';
const Tab = createBottomTabNavigator();


function MapLoot() {
    return (
        <Tab.Navigator initialRouteName='main'>
            <Tab.Screen name='main' component={MapMainView}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name='favorite' component={MapFavoriteView}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<Ionicons name="star-outline" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name='notificate' component={MapNotificateView}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<Ionicons name="notifications-outline" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name='friends' component={MapFriendsView}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<MaterialIcons name="person-add-alt" size={24} color="black" />
                    )
                }} />
        </Tab.Navigator>
    );
} export default MapLoot
