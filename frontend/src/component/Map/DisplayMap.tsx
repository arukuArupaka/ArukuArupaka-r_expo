import React, { useEffect ,useState} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import MapUserIcon from './mapUserIcon';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../../firebase';
import MapFriendIconContainer from './mapFriendIconConteiner';
import userReducer from '../../redux/reducers/userReducers';

const DisplayMap = () => {

  const userUUID:boolean=useSelector((state:State)=>state.user.userUUID||"") 
  const userObject=useSelector((state)=>state.user.userObject)
  const mapUserObject =useSelector((state)=>state.map.mapUserObject)
  const isLogin=useSelector((state)=>state.user.isLogin)
  console.log(mapUserObject)


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
            style={{width: "100%",height: "100%"}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 34.98213493094731,
              longitude: 135.96364694774536,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
          {mapUserObject.mapShowFriends.map((friend)=><MapFriendIconContainer friendUUID={friend}></MapFriendIconContainer>)}
          <MapUserIcon imageURI={userObject.userImage} title={userObject.userName} location={myLocation}/>
          <MapUserIcon imageURI={userObject.userImage} title={userObject.userName} location={{latitude: 34.98213493094731,
              longitude: 135.96364694774536,}}/>
          </MapView>
        </View>

      );
};
export default DisplayMap
