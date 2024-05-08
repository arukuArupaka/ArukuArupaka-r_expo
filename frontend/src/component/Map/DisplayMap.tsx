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
import { doc, updateDoc,serverTimestamp } from "@firebase/firestore";
import { db } from "../../../firebase";
import MapFriendIconContainer from "./mapFriendIconConteiner";
import MapBuildingListItem from "./MapBuildingListItem";
import MapBuildingIcon from "./MapBuildingIcon";
import { useDispatch } from "react-redux";
import { setMapSearchWord } from "../../redux/actions/mapUserActions";
import { judgeInclusion } from "./inRangDiscrimination";
import * as TaskManager from "expo-task-manager";

const DisplayMap = (props) => {
  var random = Math.floor( Math.random() * 30 );

  console.log( random );
  const CampusLocationData = [
    {
      id: "ritsumei_BKC",
      name: "びわこくさつキャンパス",
      imageURL: "https://www.ritsumei.ac.jp/image.jsp?id=469182",
      location: {
        latitude: 34.98213493094731,
        longitude: 135.96364694774536,
      },
      campusAria: [
        { latitude: 34.97712731885239, longitude: 135.96262335777283 },
        { latitude: 34.97949920724689, longitude: 135.96129298210144 },
        { latitude: 34.98062881074072, longitude: 135.96049368381503 },
        { latitude: 34.9832994698679, longitude: 135.95910765230653 },
        { latitude: 34.9832967228862, longitude: 135.95909524708986 },
        { latitude: 34.98694545744828, longitude: 135.96298411488533 },
        { latitude: 34.988108744112075, longitude: 135.9653464704752 },
        { latitude: 34.98237400651514, longitude: 135.96632950007915 },
        { latitude: 34.98109114152881, longitude: 135.96577126532793 },
        { latitude: 34.97677732626124, longitude: 135.96496995538473 },
      ],
    },
    {
      id: "ritsumei_KIC",
      name: "衣笠キャンパス",
      imageURL: "https://www.ritsumei.ac.jp/image.jsp?id=469181",
      location: {
        latitude: 35.0325428,
        longitude: 135.7240146,
      },
      campusAria: [
        { latitude: 34.81218694153572, longitude: 135.56080330163238 },
        { latitude: 34.808636419426435, longitude: 135.55954098701477 },
        { latitude: 34.80757822523875, longitude: 135.56195430457592 },
        { latitude: 34.809639819418585, longitude: 135.5637812241912 },
        { latitude: 34.81089150593137, longitude: 135.5637721717358 },
      ],
    },
    {
      id: "ritsumei_OIC",
      name: "大阪いばらきキャンパス",
      imageURL: "https://www.ritsumei.ac.jp/image.jsp?id=469183",
      location: {
        latitude: 34.8108499,
        longitude: 135.5612411,
      },
      campusAria: [
        { latitude: 34.81212225282056, longitude: 135.56082140654325 },
        { latitude: 34.808502356554435, longitude: 135.55953294038773 },
        { latitude: 34.80757932638442, longitude: 135.56186612695456 },
        { latitude: 34.809806913923346, longitude: 135.56380704045296 },
        { latitude: 34.81086700642176, longitude: 135.56378725916147 },
      ],
    },
  ];

  TaskManager.defineTask(
    "BACKGROUND_FETCH_TASK",
    ({ data: { locations }, error }) => {
      console.log("watchPositionAsyncBackGround");
      if (error) {
        // check `error.message` for more details.
        return;
      }
      console.log("Received new locations", locations);

      let longitude = "経度:" + JSON.stringify(locations[0].coords.longitude);
      let latitude = "緯度:" + JSON.stringify(locations[0].coords.latitude);
      // Alert.alert(JSON.stringify(judgeInclusion(
      //   {
      //       latitude: locations[0].coords.latitude,
      //       longitude: locations[0].coords.longitude,
      //   },
      //   props.campusData.campusAria
      // )));
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
        )&&          mapUserObject.locationSharingFriends.length!==0
      ) {
        const refFiresrore = doc(db, `mapGPS/${userUUID}`);
        updateDoc(refFiresrore, {
          myLocation: {
            latitude: locations[0].coords.latitude,
            longitude: locations[0].coords.longitude,
          },
          timestamp: serverTimestamp()
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
  const [mapCenterLocation, setMapCenterLocation] = useState({          
    latitude: props.campusData.location.latitude?props.campusData.location.latitude:0,
    longitude: props.campusData.location.longitude?props.campusData.location.longitude:0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [showBuildingIcon, setShowBuildIcon] = useState(false);
  const [shareInfoMessage, setShareInfoMassage] = useState<string>("");
  const [shareTime, setShareTime] = useState("");

  useEffect(() => {

    let subscription;

    getLocationAsync();

    const watchPositionAsync = async () => {
      await Location.requestForegroundPermissionsAsync();
      await Location.requestBackgroundPermissionsAsync();

      if (!props.campusData.campusAria) {
        return;
      }
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 100000,
          distanceInterval: 50,
        },
        (location) => {

          if(Math.floor( Math.random() * 10 )===1){
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
            )&&mapUserObject.isLocationShare&&mapUserObject.locationSharingFriends.length!==0
          ) {
            const refFiresrore = doc(db, `mapGPS/${userUUID}`);
            updateDoc(refFiresrore, {
              myLocation: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              timestamp: serverTimestamp()
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
            } else if(mapUserObject.locationSharingFriends.length==0){
              setShareInfoMassage("共有する相手がいません");
            }
          }
        }
        }
      );
    };

    const toggleFetchTask = async () => {
      if(TaskManager.isTaskRegisteredAsync("BACKGROUND_FETCH_TASK")){
       TaskManager.unregisterTaskAsync("BACKGROUND_FETCH_TASK");
      }
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (!status) {
        setShareInfoMassage("権限エラー");
      }

      Location.startLocationUpdatesAsync("BACKGROUND_FETCH_TASK", {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 100000,
        distanceInterval: 50,
        foregroundService: {
          notificationTitle: "En ligne ... ",
          notificationBody: "Mise à jour de votre position en cours ...",
        },
      }).then((location) => {});
    };

    watchPositionAsync();
    if (isLogin&&mapUserObject.isLocationShare&&mapUserObject.locationSharingFriends.length!==0) {
       toggleFetchTask();
     }

    return () => {
      subscription?.remove();
      if (isLogin&&mapUserObject.isLocationShare) {
       // toggleFetchTask();
      }
    };
  }, []);

  useEffect(()=>{

    if(!mapUserObject.isLocationShare){
      if(TaskManager.isTaskRegisteredAsync("BACKGROUND_FETCH_TASK")){
        TaskManager.unregisterTaskAsync("BACKGROUND_FETCH_TASK");
       }
    }else{
      if(TaskManager.isTaskRegisteredAsync("BACKGROUND_FETCH_TASK")){
        TaskManager.unregisterTaskAsync("BACKGROUND_FETCH_TASK");
       }
       
      Location.startLocationUpdatesAsync("BACKGROUND_FETCH_TASK", {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 100000,
        distanceInterval: 20,
        foregroundService: {
          notificationTitle: "En ligne ... ",
          notificationBody: "Mise à jour de votre position en cours ...",
        },
      }).then((location) => {});
    }

  },[mapUserObject.isLocationShare])

  const onSelectBuilding = (data) => {
    dispatch(setMapSearchWord(""));
    setMapCenterLocation({
      ...data.buildingLocation,          
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,});
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
          // 現在位置をMap Viewの中心に更新
          // setState({
          //   region: {
          //     latitude: location.coords.latitude,
          //     longitude: location.coords.longitude,
          //     latitudeDelta: 0.01,
          //     longitudeDelta: 0.01,
          //   }
          // })
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
          latitude: props.campusData.location.latitude?props.campusData.location.latitude:0,
          longitude: props.campusData.location.longitude?props.campusData.location.longitude:0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        region={{
          ...mapCenterLocation,
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
                ? userObject.userImage
                : "https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=661a2fe4&is=6607bae4&hm=cb9685af51a4ec6f9d8ce799cbfd5efff9fda1b9055ecbb2d26534425e88f552&=&format=webp&width=1012&height=1012"
            }
            title={userObject.userName}
            location={myLocation}
          />
        )}
        {/* {!props.isEditBuilding&&<MapUserIcon imageURI={userObject.userImage?userObject.userImage:"https://media.discordapp.net/attachments/1210241561095573504/1210846190124531782/DALLE_2024-02-12_18.38.18_-_Create_a_colorful_illustration_of_an_alpaca_facing_left_standing_directly_in_front_of_a_.jpeg?ex=65fe8064&is=65ec0b64&hm=e615d93362c74b2d2a0788ef8867ccb999f462b0076e644dab324f8c8fab17ca&=&format=webp&width=1208&height=1208"} title={userObject.userName} title={userObject.userName} location={{latitude: 34.98213493094731,
              longitude: 135.96364694774536,}}/>} */}
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
