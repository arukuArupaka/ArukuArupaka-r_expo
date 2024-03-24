import React, { useEffect ,useState} from 'react';
import { Text, View ,TouchableOpacity,ScrollView} from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import MapUserIcon from './mapUserIcon';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../../firebase';
import MapFriendIconContainer from './mapFriendIconConteiner';
import userReducer from '../../redux/reducers/userReducers';

const DisplayMap = (props) => {

  const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
  const userObject=useSelector((state)=>state.user.userObject)
  const mapUserObject =useSelector((state)=>state.map.mapUserObject)
  const isLogin=useSelector((state)=>state.user.isLogin)
  console.log(userObject)


  const [myLocation,setMyLocation]=useState({})

  useEffect(()=>{
    //getLocationAsync()
    watchPositionAsync()
  },[])

  // // 現在位置の取得
  // const getLocationAsync = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   console.log("Status");
  //   console.log(status);
  //   if (status !== 'granted') {
  //     // setState({
  //     // submitMessage: '位置情報の取得が許可されませんでした。',
  //     // });
  //   }else if(status === 'granted'){
  //     console.log("getCurrentPositionAsync");
  //     await Location.getCurrentPositionAsync({}).then((location) => {
  //       let longitude = '経度:' + JSON.stringify(location.coords.longitude);
  //       let latitude = '緯度:' + JSON.stringify(location.coords.latitude);
  //       console.log(longitude);
  //       console.log(latitude);
  //       setMyLocation({
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       })
  //       // 現在位置をMap Viewの中心に更新
  //       // setState({
  //       //   region: {
  //       //     latitude: location.coords.latitude,
  //       //     longitude: location.coords.longitude,
  //       //     latitudeDelta: 0.01,
  //       //     longitudeDelta: 0.01,
  //       //   }
  //       // })

  //     }).catch((e) => {
  //       console.log("現在位置取得失敗");
  //       console.log(e);
  //     });

  //   }
  // };
  const watchPositionAsync=async()=>{
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10,  
      },
      (location) => {

        console.log('loc')
        console.log(location)
          let longitude = '経度:' + JSON.stringify(location.coords.longitude);
          let latitude = '緯度:' + JSON.stringify(location.coords.latitude);
          console.log(longitude);
          console.log(latitude);
          setMyLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        })
        if(isLogin){
          const refFiresrore = doc(db, `mapGPS/${userUUID}`);
          updateDoc(refFiresrore, {myLocation:{latitude: location.coords.latitude,longitude: location.coords.longitude}}).then(() => {
          })
          
        }

      }
    
    )
  }
    
    return (
        <View>
          <MapView
            onPress={(event)=>props.onPickLongitudeLatitude(event.nativeEvent.coordinate)}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor:'black'
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: props.campusData.location.latitude,
              longitude: props.campusData.location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
          {!props.isEditBuilding&&mapUserObject.mapShowFriends.map((friend)=><MapFriendIconContainer friendUUID={friend}></MapFriendIconContainer>)}
          {!props.isEditBuilding&&<MapUserIcon imageURI={userObject.userImage?userObject.userImage:"https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65fe8064&is=65ec0b64&hm=e615d93362c74b2d2a0788ef8867ccb999f462b0076e644dab324f8c8fab17ca&=&width=700&height=700"} title={userObject.userName} location={myLocation}/>}
          {!props.isEditBuilding&&<MapUserIcon imageURI={userObject.userImage?userObject.userImage:"https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65fe8064&is=65ec0b64&hm=e615d93362c74b2d2a0788ef8867ccb999f462b0076e644dab324f8c8fab17ca&=&width=700&height=700"} title={userObject.userName} title={userObject.userName} location={{latitude: 34.98213493094731,
              longitude: 135.96364694774536,}}/>}
          </MapView>
          {props.isEditBuilding&&<Text style={{position:'absolute',top:'50%',right:'30%',textShadowOffset: { width: 3, height: 3 },textShadowRadius: 4,}}>登録する建物の場所をタップ</Text>}
        </View>

      );
};
export default DisplayMap
