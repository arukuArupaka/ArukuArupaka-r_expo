import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapUserIcon from "./mapUserIcon";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../../firebase";
import MapFriendIconContainer from "./mapFriendIconConteiner";
import MapBuildingListItem from "./MapBuildingListItem";
import MapBuildingIcon from "./MapBuildingIcon";
import { useDispatch } from "react-redux";
import { setMapSearchWord } from "../../redux/actions/mapUserActions";
import { judgeInclusion } from "./inRangDiscrimination";
import * as TaskManager from "expo-task-manager";

const DisplayMap = (props) => {

  TaskManager.defineTask(
    "backgroundLocationUpdates",
    ({ data: { locations }, error }) => {
      console.log("watchPositionAsyncBackGround");
      if (error) {
        // check `error.message` for more details.
        return;
      }
      console.log("Received new locations", locations);

      let longitude = "経度:" + JSON.stringify(locations[0].coords.longitude);
      let latitude = "緯度:" + JSON.stringify(locations[0].coords.latitude);
      console.log(longitude);
      console.log(latitude);
      // setMyLocation({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // });

      if (
        judgeInclusion(
          {
              latitude: locations[0].coords.latitude,
              longitude: locations[0].coords.longitude,
          },
          props.campusData.campusAria
        )
      ) {
        const refFiresrore = doc(db, `mapGPS/${userUUID}`);
        updateDoc(refFiresrore, {
          myLocation: {
            latitude: locations[0].coords.latitude,
            longitude: locations[0].coords.longitude,
          },
        }).then(() => {
          //   setIsSharelocation(true);
          //   setShareTime(
          //     new Date().getHours() + ":" + new Date().getMinutes()
          //   );
        });
      }
    }
  );

  const dispatch = useDispatch();

  var { width, height } = Dimensions.get("window");

  const userUUID: boolean = useSelector(
    (state: State) => state.user.userUUID || ""
  );
  const userObject = useSelector((state) => state.user.userObject);
  const mapUserObject = useSelector((state) => state.map.mapUserObject);
  const mapSearchWord = useSelector((state) => state.map.mapSearchWord);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [isShareLocation, setIsSharelocation] = useState<boolean>(false);

  const [myLocation, setMyLocation] = useState({});
  const [mapCenterLocation, setMapCenterLocation] = useState({});
  const [showBuildingIcon, setShowBuildIcon] = useState(false);
  const [shareInfoMessage, setShareInfoMassage] = useState<string>("");
  const [shareTime, setShareTime] = useState("");

  useEffect(() => {
    TaskManager.unregisterTaskAsync("backgroundLocationUpdates");


    let subscription;

    getLocationAsync();

    const watchPositionAsync = async () => {
      console.log(98)
     await Location.requestForegroundPermissionsAsync();
     await Location.requestBackgroundPermissionsAsync();

      if (!props.campusData.campusAria) {
        console.log(102)
        return;
      }
      console.log(105)
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
         timeInterval: 100000,
         distanceInterval: 20,
        },
        (location) => {
          console.log("watchPositionAsync");

          let longitude = "経度:" + JSON.stringify(location.coords.longitude);
          let latitude = "緯度:" + JSON.stringify(location.coords.latitude);
          console.log(longitude);
          console.log(latitude);
          
          setMyLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          if (
            isLogin &&
            props.campusData.campusAria &&
            judgeInclusion(
              {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
              },
              props.campusData.campusAria
            )&&mapUserObject.isLocationShare
          ) {
            const refFiresrore = doc(db, `mapGPS/${userUUID}`);
            updateDoc(refFiresrore, {
              myLocation: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
            })
              .then(() => {
                setIsSharelocation(true);
                setShareTime(
                  new Date().getHours() + ":" + new Date().getMinutes()
                );
              })
              .catch((e) => {
                setIsSharelocation(false);
              });
          } else {
            setIsSharelocation(false);
            if (
              !judgeInclusion(
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                props.campusData.campusAria
              )
            ) {
              setShareInfoMassage("キャンパス外");
            } else if (!isLogin) {
              setShareInfoMassage("未ログイン");
            } else if(!mapUserObject.isLocationShare){
              setShareInfoMassage("共有を停止する");
            }
          }
        }
      );
    };

    const toggleFetchTask = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (!status) {
        setShareInfoMassage("権限エラー");
      }

      Location.startLocationUpdatesAsync('backgroundLocationUpdates', {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000, // ミリ秒単位で指定された時間間隔で位置情報を取得
      });
      
      // バックグラウンド更新タスクの実行時に実行されるコードを設定
      // Location.setTaskName('backgroundLocationUpdates', async () => {
      //   // 位置情報の取得
      //   const location = await Location.getCurrentPositionAsync({});
      //   console.log('Current location:', location);
      // });
      

      // TaskManager.defineTask(
      //   "BACKGROUND_FETCH_TASK",
      //   ({ data: { locations }, error }) => {
      //     console.log("watchPositionAsyncBackGround");
      //     if (error) {
      //       // check `error.message` for more details.
      //       return;
      //     }
      //     console.log("Received new locations", locations);
    
      //     let longitude = "経度:" + JSON.stringify(locations[0].coords.longitude);
      //     let latitude = "緯度:" + JSON.stringify(locations[0].coords.latitude);
      //     console.log(longitude);
      //     console.log(latitude);
      //     // setMyLocation({
      //     //   latitude: location.coords.latitude,
      //     //   longitude: location.coords.longitude,
      //     // });
    
      //     if (
      //       judgeInclusion(
      //         {
      //             latitude: locations[0].coords.latitude,
      //             longitude: locations[0].coords.longitude,
      //         },
      //         props.campusData.campusAria
      //       )
      //     ) {
      //       const refFiresrore = doc(db, `mapGPS/${userUUID}`);
      //       updateDoc(refFiresrore, {
      //         myLocation: {
      //           latitude: locations[0].coords.latitude,
      //           longitude: locations[0].coords.longitude,
      //         },
      //       }).then(() => {
      //         //   setIsSharelocation(true);
      //         //   setShareTime(
      //         //     new Date().getHours() + ":" + new Date().getMinutes()
      //         //   );
      //       });
      //     }
      //   })
    };

    watchPositionAsync();

    return () => {
      console.log('eomovw')
      subscription?.remove();
      if (isLogin&&mapUserObject.isLocationShare) {
        toggleFetchTask();
      }
    };
  }, []);

  const onSelectBuilding = (data) => {
    dispatch(setMapSearchWord(""));
    setMapCenterLocation(data.buildingLocation);
    setShowBuildIcon(true);
  };

  const handleRegionChangeComplete = (region, gesture, name) => {
    // regionオブジェクトからlongitudeDeltaを取得
    var zoom = Math.log2(360 * (width / 256 / region.longitudeDelta));
    if (zoom > 18.2) {
      setShowBuildIcon(true);
      return;
    }
    setShowBuildIcon(false);
  };

  // // 現在位置の取得
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      // setState({
      // submitMessage: '位置情報の取得が許可されませんでした。',
      // });
      setShareInfoMassage("権限エラー");
    } else if (status === "granted") {
      await Location.getCurrentPositionAsync({})
        .then((location) => {
          console.log("getCurrentPositionAsync");
          let longitude = "経度:" + JSON.stringify(location.coords.longitude);
          let latitude = "緯度:" + JSON.stringify(location.coords.latitude);
          console.log(longitude);
          console.log(latitude);
          setMyLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        })
        .catch((e) => {
          console.log("現在位置取得失敗");
          console.log(e);
        });
    }
  };

  return (
    <View>
      <MapView
        onPress={(event) =>
          props.onPickLongitudeLatitude(event.nativeEvent.coordinate)
        }
        style={{
          width: "100%",
          height: "100%",
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: props.campusData.location.latitude,
          longitude: props.campusData.location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        region={{
          ...mapCenterLocation,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        userInterfaceStyle={"light"}
        onRegionChange={handleRegionChangeComplete}
      >
        {!props.isEditBuilding &&
          mapUserObject.mapShowFriends.map((friend) => (
            <MapFriendIconContainer
              friendUUID={friend}
            ></MapFriendIconContainer>
          ))}
        {!props.isEditBuilding && (
          <MapUserIcon
            imageURI={
              userObject.userImage
            }
            title={userObject.userName}
            location={myLocation}
          />
        )}
        {showBuildingIcon &&
          props.campusBuildingsArray.map((buildingData) => (
            <MapBuildingIcon buildingData={buildingData} />
          ))}
      </MapView>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 100,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          paddingVertical: 5,
          elevation: 10,
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 3 }}>
          {isShareLocation ? "位置情共有中" : "位置共有停止"}
        </Text>
        {shareInfoMessage && (
          <Text style={{ textAlign: "center", color: "red" }}>
            {shareInfoMessage}
          </Text>
        )}
        <Text style={{ textAlign: "center" }}>
          {shareTime ? shareTime + "に共有" : "--:--に共有"}
        </Text>
      </View>
      {mapSearchWord && (
        <ScrollView
          style={{
            width: "100%",
            paddingTop: 20,
            paddingHorizontal: 20,
            position: "absolute",
            backgroundColor: "white",
          }}
        >
          {props.campusBuildingsArray
            .filter(
              (word) => JSON.stringify(word).indexOf(mapSearchWord) !== -1
            )
            .map((buildingData) => (
              <TouchableOpacity onPress={() => onSelectBuilding(buildingData)}>
                <MapBuildingListItem buildingData={buildingData} />
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}
      {props.isEditBuilding && (
        <Text
          style={{
            position: "absolute",
            top: "50%",
            right: "30%",
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 4,
          }}
        >
          登録する建物の場所をタップ
        </Text>
      )}
    </View>
  );
};
export default DisplayMap;
