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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

//コンポーネントの変数定義
type HeaderlistProps = {
  url: string;
};

type ApplistProps = {
  url: string;
  appName: string;
  color: string;
  natigation: string;
};





//右上アクションボタンのコンポーネント
const Headerlist = (props) => {
  return (
    <TouchableOpacity
      style={styles.homeSetting}
      onPress={() => {
        props.props.navigation.navigate("settings");
      }}
    >
      <Image
        style={{
          width: 24,
          height: 24,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
        }}
        source={{ uri: props.url }}
      />
    </TouchableOpacity>
  );
};

//アプリ一覧のコンポーネント
const AppList = (props) => {
  return (
    <View
      style={{
        height: 65,
        width: 140,
        borderColor: props.color,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        padding: 3,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.test.navigation.navigate(props.jumpPage);
        }}
      >
        <MaterialCommunityIcons name={props.iconName} size={40} color={props.color} />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            left: "10%",
            fontFamily: "Roboto",
          }}
        >
          {props.appName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


//日付の取得
const today = new Date();
const month = today.getMonth()+1;
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
        }}
      >
        <Text style={[styles.dateStyle, { fontSize: 24 }]}>{month}</Text>
        <Text style={styles.dateStyle}>月</Text>
        <Text style={[styles.dateStyle, { fontSize: 24 }]}>{date}</Text>
        <Text style={styles.dateStyle}>日</Text>
        <Text style={[styles.dateStyle, { fontSize: 24 }]}>（</Text>
        <Text style={[styles.dateStyle, { fontSize: 24 }]}>{weekItems[week]}</Text>
        <Text style={[styles.dateStyle, { fontSize: 24 }]}>）</Text>
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

//カルーセルのコンポーネント
const Carousel = () => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // サーバーから写真のデータを取得するAPIエンドポイントを呼び出す
    fetch("http://127.0.0.1:8000/image/photos/favicon_gmjZy5B.png")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // BlobオブジェクトからData URIを生成
        const reader = new FileReader();
        reader.onload = function () {
          // 読み込んだデータをstateにセット
          setImageUri(reader.result);
        };
        // Blobデータを読み込む
        reader.readAsDataURL(blob);
      })
      .catch((error) =>
        console.error("Error fetching image data:", error.message)
      );
  }, ['a']);
  return (
    <View style={{}}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.carouselMove}></View>
        <View style={styles.carousel}>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
        <View style={styles.carouselMove}></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <View style={styles.carouselSequence}></View>
        <View
          style={[styles.carouselSequence, { backgroundColor: "#30CB89" }]}
        ></View>
        <View style={styles.carouselSequence}></View>
        <View style={styles.carouselSequence}></View>
        <View style={styles.carouselSequence}></View>
      </View>
    </View>
  );
};

//実際に描画される部分
const HomeView = (props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.topScreen}></View>
        <View style={styles.profileIcon}></View>
        <View style={styles.headerListStyle}>
          <Headerlist
            props={props}
            url="https://cdn-icons-png.flaticon.com/512/126/126472.png"
          />
          <Headerlist url="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/640px-Home-icon.svg.png" />
        </View>
        <View
          style={{ marginLeft: 5, marginRight: 5, marginBottom: 20, flex: 1 }}
        >
          <View style={{ marginTop: 5 }}>
            <Text style={[styles.text, { fontSize: 16 }]}>歩くアルパカ</Text>
            <Text style={[styles.text, { fontSize: 24 }]}>マイページ</Text>
          </View>
          <ShowDate></ShowDate>
          <Text style={styles.title}>新着情報</Text>
          <Carousel></Carousel>
          <Text style={styles.title}>機能一覧</Text>
          <View style={{ flex: 10 }}>
            <View style={styles.appListFlex}>
              <AppList
                appName="駐輪場"
                color="#F36F21"
                test={props}
                jumpPage="Bike"
                iconName="bicycle"
              />
              <AppList
                appName="天気"
                color="#EB3637"
                test={props}
                jumpPage="weather"
                iconName="weather-partly-cloudy"
              />
            </View>
            <View style={styles.appListFlex}>
              <AppList appName="マップ" color="#1BB1E7" iconName="map-marker-radius-outline" />
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
                appName="SNS"
                color="#FFCB08"
                iconName="transit-connection-variant"
              />
              <AppList
                appName=""
                color="#30CB89"
                iconName="transit-connection-variant"
              />
            </View>
            <View style={styles.appListFlex}>
              <AppList
                appName=""
                color="#30CB89"
                url="https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"
              />
              <AppList
                appName=""
                color="#30CB89"
                url="https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"
              />
            </View>
          </View>
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
  dateStyle: {
    fontSize: 16,
    fontFamily: "Roboto",
  },
  title: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "Roboto",
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
    flexWrap: "wrap",
  },
  text: {
    marginLeft: 120,
    color: "#000000",
    fontFamily: "Roboto",
    fontWeight: "400",
  },
  homeSetting: {
    margin: 3,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#EB3637",
    borderRadius: 100,
    backgroundColor: "#ffffff",
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
    width: 60,
    height: 60,
    backgroundColor: "#F8F8F8",
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 9999,
  },
});

export default HomeView;
