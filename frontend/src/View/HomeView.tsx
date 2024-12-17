import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Vibration,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeCarousel from "../component/Home/HomeViewCarousel.tsx";
import Specialsite from "../component/Home/HomeViewSpecial";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import {
  handleLoginAction,
  handleLoginNotVerificationEmail,
  setUserUUIDAction,
  setUserObject,
} from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "@firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import NewAppList from "../component/Home/NewAppList.tsx";
import { Foundation } from "@expo/vector-icons";

//右上アクションボタンのコンポーネント
const Headerlist = (props) => {
  return (
    <TouchableOpacity
      style={{
        margin: 4,
        zIndex: 1000,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#EB3637",
        borderRadius: 100,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        props.props.navigation.navigate("settings");
      }}
    >
      <Ionicons name={props.iconName} size={24} color={"#EB3637"} />
    </TouchableOpacity>
  );
};

//アプリ一覧のコンポーネント
const AppList = (props) => {
  return (
    <TouchableOpacity
      style={{
        height: 75,
        width: 160,
        borderColor: props.color,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
        padding: 8,
        display: "flex",
      }}
      onPress={() => {
        props.test.navigation.navigate(props.jumpPage);
      }}
    >
      <MaterialCommunityIcons
        name={props.iconName}
        size={40}
        color={props.color}
      />
      <Text style={{ fontSize: 20, textAlign: "center", flex: 1 }}>
        {props.appName}
      </Text>
    </TouchableOpacity>
  );
};

//日付の取得
const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const week = today.getDay();
const weekItems = ["日", "月", "火", "水", "木", "金", "土"];
//日付表示のコンポーネント
const ShowDate = () => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 16,
          marginBottom: 5,
        }}
      >
        <Text style={{ marginBottom: 5, fontSize: 24 }}>{month}</Text>
        <Text style={{ marginBottom: 5, fontSize: 20 }}>月</Text>
        <Text style={{ marginBottom: 5, fontSize: 24 }}>{date}</Text>
        <Text style={{ marginBottom: 5, fontSize: 20 }}>日</Text>
        <Text style={{ marginBottom: 5, fontSize: 24 }}>（</Text>
        <Text style={{ marginBottom: 5, fontSize: 24 }}>{weekItems[week]}</Text>
        <Text style={{ marginBottom: 5, fontSize: 24 }}>）</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          position: "absolute",
          bottom: "10%",
          right: "0%",
        }}
      ></View>
    </View>
  );
};

//実際に描画される部分
const HomeView = (props) => {
  //fireBaseログイン確認
  const dispatch = useDispatch();
  const [userID, setUserID] = useState("");
  const [userIconImageUri, setUserIconImageUri] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ユーザーがログインしている場合
        dispatch(handleLoginAction(user.emailVerified));
        dispatch(setUserUUIDAction(user.uid));
      } else {
        // ユーザーがログインしていない場合、保存されたemailとpasswordを使用してログインを試みる
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        if (savedEmail && savedPassword) {
          signInWithEmailAndPassword(auth, savedEmail, savedPassword)
            .then((userCredential) => {
              // ログイン成功時の処理
              const user = userCredential.user;
              dispatch(handleLoginAction(user.emailVerified));
              dispatch(setUserUUIDAction(user.uid));

              fetchUserObject(user.uid);
              // getDownloadURL(ref(storage, `users/${user.uid}/mainPicture`)).then(
              //   (getURI) => {
              //     setUserIconImageUri(getURI);
              //   }
              // );
            })
            .catch((error) => {
              // ログイン失敗時の処理
              console.error("自動ログインエラー:", error);
            });
        } else {
          // 保存されたemailとpasswordがない場合の処理
          dispatch(handleLoginAction(false));
          dispatch(setUserUUIDAction(""));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserObject = async (userUUID) => {
    //const dispatch = useDispatch();
    console.log("getDoc HomeView 185");

    const refFiresrore = doc(db, `users/${userUUID}`);
    const appUser = (await getDoc(refFiresrore)).data(); //appUserがデータベースから取得したオブジェクト
    getDownloadURL(ref(storage, `users/${userUUID}/mainPicture`))
      .then((getURI) => {
        setUserIconImageUri(getURI);
        dispatch(setUserObject({ ...appUser, userImage: getURI }));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(setUserObject({ ...appUser, userImage: "" }));
      });
  };
  console.log("image");
  console.log(userIconImageUri);
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "rgba(235, 54, 55, 0.30)" }}
      />
      <ScrollView
        bounces={false} // オーバースクロールを有効化
        style={{ flex: 1 }}
      >
        <View style={styles.topScreen}></View>
        <Image
          style={{
            position: "absolute",
            width: 70,
            height: 70,
            borderRadius: 40,
            borderWidth: 4,
            borderColor: "black",
            top: 55,
            left: 20,
            zIndex: 1000,
          }}
          source={
            userIconImageUri
              ? {
                  uri: userIconImageUri,
                }
              : require("../image/Logo.png")
          }
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 5 }}>
            <Text style={[styles.titleText, { fontSize: 16 }]}>
              歩くアルパカ
            </Text>
            <Text style={styles.titleText}>マイページ</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}>
            <Headerlist props={props} iconName="settings-outline" />
          </View>
        </View>
        <ShowDate></ShowDate>
        <HomeCarousel navigation={props.navigation}></HomeCarousel>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <View>
            <Specialsite navigation={props.navigation} />
          </View>
        </View>
        <View style={{ backgroundColor: "", flex: 1 }}>
          <View style={styles.appListFlex}>
            <AppList
              appName="駐輪場"
              color="#F36F21"
              test={props}
              jumpPage="Bike"
              iconName="bicycle"
            />
            <AppList
              appName="天気予報"
              color="#EB3637"
              test={props}
              jumpPage="weather"
              iconName="weather-partly-cloudy"
            />
          </View>
          <View style={styles.appListFlex}>
            <AppList
              appName="マップ"
              color="#1BB1E7"
              test={props}
              jumpPage="Map"
              iconName="map-marker-radius-outline"
            />
            <AppList
              appName="時間割"
              color="#00A651"
              test={props}
              jumpPage="TimeTable"
              iconName="file-table"
            />
          </View>
          <View style={styles.appListFlex}>
            <NewAppList
              appName="リンク一覧"
              color="#EB97A8"
              test={props}
              jumpPage="PortalAccess"
              iconName="page-copy"
              item={() => (
                <Foundation name="page-copy" size={30} color="#EB97A8" />
              )}
            />
            <AppList
              appName="教科書     フリマ"
              color="#FFCB08"
              test={props}
              jumpPage="ホーム"
              iconName="book-multiple"
            />
          </View>
          {Platform.OS !== "ios" && (
            <View style={styles.appListFlex}>
              <AppList
                appName="教科書     フリマ"
                color="#FFCB08"
                test={props}
                jumpPage="ホーム"
                iconName="book-multiple"
              />
              <AppList
                appName="Ritsu-  Match"
                color="#30CB89"
                test={props}
                jumpPage="RitsuMatch"
                iconName="contacts"
              />
            </View>
          )}
        </View>
      </ScrollView>
      <SafeAreaView />
    </>
  );
};

//使いまわすものをスタイルシートで記述
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },
  title: {
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 20,
  },
  headerListStyle: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    // position: "absolute",
    top: 50,
    right: 16,
  },
  topScreen: {
    width: "100%",
    height: 35,
    backgroundColor: "rgba(235, 54, 55, 0.30)",
  },
  profileIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#000000",
    borderRadius: 9999,
    position: "absolute",
    top: 50,
    left: 28,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  appListFlex: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    justifyContent: "center",
    display: "flex",
  },
  titleText: {
    marginLeft: 120,
    color: "#000000",
    fontSize: 24,
  },
  carousel: {
    width: 272,
    height: 186,
    backgroundColor: "#F8F8F8",
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  carouselSequence: {
    width: 10,
    height: 10,
    backgroundColor: "#BBBBBB",
    borderRadius: 9999,
    margin: 3,
  },
  carouselMove: {
    width: 50,
    height: 50,
    backgroundColor: "#F8F8F8",
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default HomeView;
