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
import { doc, updateDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../../../firebase";
import MapFriendIconContainer from "./mapFriendIconConteiner";
import MapBuildingListItem from "./MapBuildingListItem";
import MapBuildingIcon from "./MapBuildingIcon";
import { useDispatch } from "react-redux";
import { setMapSearchWord } from "../../redux/actions/mapUserActions";
import { judgeInclusion } from "./inRangDiscrimination";
import * as TaskManager from "expo-task-manager";
import KitchenCarIconContainer from "./KitchenCarIconContainer";
import KitchenCarListItem from "./KitchenCarListItem";

const DisplayMap = (props) => {
  const [kitchenCarJSON, setKitchenCarJSON] = useState([]);

  useEffect(() => {
    const url =
      "https://firestore.googleapis.com/v1/projects/arupaka-kitchen-car/databases/(default)/documents:runQuery";

    async function fetchCarPosition() {
      try {
        // 今日の日付の0時0分0秒を取得
        const now = new Date();
        const startOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const startOfDayTimestamp = {
          seconds: Math.floor(startOfDay.getTime() / 1000),
          nanos: (startOfDay.getTime() % 1000) * 1e6,
        };

        // クエリの構築
        const query = {
          structuredQuery: {
            from: [{ collectionId: "car_position_BKC" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "time" },
                op: "GREATER_THAN_OR_EQUAL",
                value: { timestampValue: startOfDayTimestamp },
              },
            },
          },
        };

        // POSTリクエストの送信
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        });

        if (!response.ok) {
          throw new Error("ネットワーク応答に問題がありました");
        }

        // レスポンスの解析
        const data = await response.json();
        const documents = data.map((doc) => doc.document);
        if (documents[0] !== undefined) {
          setKitchenCarJSON(documents);
        }
      } catch (error) {
        console.error("フェッチエラー:", error);
      }
    }

    if (props.campusData.id === "ritsumei_BKC") {
      fetchCarPosition();
    }
  }, []);

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

      console.log(latitude);

      if (
        judgeInclusion(
          {
            latitude: locations[0].coords.latitude,
            longitude: locations[0].coords.longitude,
          },
          props.campusData.campusAria
        ) &&
        mapUserObject.locationSharingFriends.length !== 0
      ) {
        const refFiresrore = doc(db, `mapGPS/${userUUID}`);
        updateDoc(refFiresrore, {
          myLocation: {
            latitude: locations[0].coords.latitude,
            longitude: locations[0].coords.longitude,
          },
          timestamp: serverTimestamp(),
        }).then(() => {
          console.log("watchPositionAsyncBackGround");
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
    latitude: props.campusData.location.latitude
      ? props.campusData.location.latitude
      : 0,
    longitude: props.campusData.location.longitude
      ? props.campusData.location.longitude
      : 0,
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
          if (Math.floor(Math.random() * 10) === 1) {
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
              ) &&
              mapUserObject.isLocationShare &&
              mapUserObject.locationSharingFriends.length !== 0
            ) {
              const refFiresrore = doc(db, `mapGPS/${userUUID}`);
              updateDoc(refFiresrore, {
                myLocation: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                timestamp: serverTimestamp(),
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
              } else if (!mapUserObject.isLocationShare) {
                setShareInfoMassage("共有を停止する");
              } else if (mapUserObject.locationSharingFriends.length == 0) {
                setShareInfoMassage("共有する相手がいません");
              }
            }
          }
        }
      );
    };

    const toggleFetchTask = async () => {
      if (TaskManager.isTaskRegisteredAsync("BACKGROUND_FETCH_TASK")) {
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
    if (
      isLogin &&
      mapUserObject.isLocationShare &&
      mapUserObject.locationSharingFriends.length !== 0
    ) {
      toggleFetchTask();
    }

    return () => {
      subscription?.remove();
      if (isLogin && mapUserObject.isLocationShare) {
        // toggleFetchTask();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapUserObject.isLocationShare) {
      if (TaskManager.isTaskRegisteredAsync("BACKGROUND_FETCH_TASK")) {
        TaskManager.unregisterTaskAsync("BACKGROUND_FETCH_TASK");
      }
    } else {
      if (TaskManager.isTaskRegisteredAsync("BACKGROUND_FETCH_TASK")) {
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
  }, [mapUserObject.isLocationShare]);

  const onSelectBuilding = (data) => {
    dispatch(setMapSearchWord(""));
    setMapCenterLocation({
      ...data.buildingLocation,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
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
        //  provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: props.campusData.location.latitude
            ? props.campusData.location.latitude
            : 0,
          longitude: props.campusData.location.longitude
            ? props.campusData.location.longitude
            : 0,
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
            imageURI={userObject.userImage}
            title={userObject.userName ? userObject.userName : "あなた"}
            location={myLocation}
          />
        )}
        {showBuildingIcon &&
          props.campusBuildingsArray.map((buildingData) => (
            <MapBuildingIcon buildingData={buildingData} />
          ))}
        {kitchenCarJSON &&
          kitchenCarJSON.length != 0 &&
          kitchenCarJSON.map((kitchenCarObject, index) => (
            <KitchenCarIconContainer
              kitchenCarObject={kitchenCarObject ? kitchenCarObject.fields : {}}
              key={index}
            />
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
          {kitchenCarJSON
            .filter(
              (word) => {
                if(mapSearchWord=="キッチンカー"){
                  return kitchenCarJSON
                }
                return(JSON.stringify(word.fields.storeName).indexOf(mapSearchWord) !== -1)}
            ).concat(
              kitchenCarJSON
            .filter(
              (word) => JSON.stringify(word.fields.herf).indexOf(mapSearchWord) !== -1
            ))
            .concat(
              kitchenCarJSON
            .filter(
              (word) => JSON.stringify(word.fields.message).indexOf(mapSearchWord) !== -1
            ))
            .map((kitchenCarObject) => (
              <TouchableOpacity
                onPress={() =>
                  setMapCenterLocation({
                    latitude:
                      kitchenCarObject.fields.position.mapValue.fields.latitude
                        .stringValue,
                    longitude:
                        kitchenCarObject.fields.position.mapValue.fields
                        .longitude.stringValue,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                  })
                }
              >
                <KitchenCarListItem kitchenCarObject={kitchenCarObject} />
              </TouchableOpacity>
            ))}
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
