import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeCarousel from "../component/Home/HomeViewCarousel";
import Specialsite from "../component/Home/HomeViewSpecial";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import {
  handleLoginAction,
  handleLoginNotVerificationEmail,
} from "../redux/actions/userAction";
import { useDispatch } from "react-redux";

//右上アクションボタンのコンポーネント
const Headerlist = (props) => {
  return (
    <TouchableOpacity
      style={{
        margin: 4,
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
        }}
      >
        <Text style={{ fontSize: 24 }}>{month}</Text>
        <Text style={{ fontSize: 20 }}>月</Text>
        <Text style={{ fontSize: 24 }}>{date}</Text>
        <Text style={{ fontSize: 20 }}>日</Text>
        <Text style={{ fontSize: 24 }}>（</Text>
        <Text style={{ fontSize: 24 }}>{weekItems[week]}</Text>
        <Text style={{ fontSize: 24 }}>）</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          position: "absolute",
          bottom: "0%",
          right: "0%",
        }}
      ></View>
    </View>
  );
};

//実際に描画される部分
const HomeView = (props) => {
  //fireBaseログイン確認
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(handleLoginAction(user.emailVerified));
      } else {
        dispatch(handleLoginAction(false));
        dispatch(handleLoginNotVerificationEmail(false));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.topScreen}></View>
        <View style={styles.profileIcon}></View>
        <View style={styles.headerListStyle}>
          <Headerlist props={props} iconName="settings-outline" />
          <Headerlist iconName="home-outline" />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={[styles.titleText, { fontSize: 16 }]}>歩くアルパカ</Text>
          <Text style={styles.titleText}>マイページ</Text>
        </View>
        <ShowDate></ShowDate>
        <Text style={styles.title}>新着情報</Text>
        <HomeCarousel></HomeCarousel>
        <Specialsite></Specialsite>
        <Text style={styles.title}>機能一覧</Text>
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
          <AppList
            appName="教科書     フリマ"
            color="#FFCB08"
            iconName="book-multiple"
          />
          <AppList
            appName="Ritsu-  Match"
            color="#30CB89"
            iconName="contacts"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    position: "absolute",
    top: 50,
    right: 16,
  },
  topScreen: {
    width: "100%",
    height: 80,
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
