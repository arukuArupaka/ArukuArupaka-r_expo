import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CleanHowToSample = require("../../../assets/CleanHowToSample.png");
const broomRed = require("./assets/image/broom-red.png");
const broomBlue = require("./assets/image/broom-blue.png");
const broomGreen = require("./assets/image/broom-green.png");
const CleanHowToView = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* タイトル・説明 */}
      <View style={styles.content}>
        <Text style={styles.title}>
          学生のみんなで{"\n"}大学をもっとキレイにしよう！
        </Text>
        <Text style={styles.description}>
          キャンパス内で{"\n"}「ゴミが落ちてる…」「汚れてる…」{"\n"}
          という場所を見つけたら{"\n"}
          アプリ上の地図に掃除マークを置いて、{"\n"}
          コメントと一緒に投稿できる機能です🧹{"\n"}
          {"\n"}
          {"\n"}🧹使い方はとってもカンタン！
        </Text>
        {/* 使い方 */}
        <Text style={styles.usageStep}>1. 汚れている場所を見つける</Text>
        <Text style={styles.usageStep}>2. 地図上に掃除マークを置く</Text>
        <Text style={styles.usageStep}>3. コメントを添えて投稿！</Text>
        {/* 地図イメージ＋説明 */}
        <View style={styles.mapContainer}>
          <Image
            source={CleanHowToSample}
            style={styles.mapImage}
            resizeMode="contain"
          />
          <FontAwesome
            name="hand-o-left"
            size={20}
            color="black"
            style={styles.handIcon}
          />
          <View style={styles.tapTextBox}>
            <Text style={styles.tapText}>
              タップで{"\n"}掃除マークを置こう！
            </Text>
          </View>
        </View>
        {/* 掃除マークの種類 */}
        <View style={styles.pinContainer}>
          <Text style={styles.pinTitle}>掃除マークの種類</Text>
          <View style={styles.pinRow}>
            <View style={styles.pinItem}>
              <Image source={broomRed} style={styles.pinImage} />
              <Text style={styles.pinLabel}>掃除未完了</Text>
            </View>
            <View style={styles.pinItem}>
              <Image source={broomGreen} style={styles.pinImage} />
              <Text style={styles.pinLabel}>掃除完了</Text>
            </View>
            <View style={styles.pinItem}>
              <Image source={broomBlue} style={styles.pinImage} />
              <Text style={styles.pinLabel}>自分の投稿</Text>
            </View>
          </View>
        </View>

        {/* 補足文 */}
        <Text style={styles.additionalText}>
          投稿してくれた人にはご褒美があるかも…
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "ZenMaruGothicBlack",
    color: "red",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    fontFamily: "ZenMaruGothicBold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  usageStep: {
    fontSize: 20,
    fontFamily: "ZenMaruGothicBold",
    color: "black",
    marginBottom: 20,
    marginLeft: 60,
    alignSelf: "flex-start",
  },
  mapContainer: {
    width: "100%",
    alignItems: "center",
    marginLeft: 5,
  },
  mapImage: {
    width: 240,
    height: 150,
    borderRadius: 30,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
  },
  handIcon: {
    position: "absolute",
    right: "35%",
    top: "40%",
  },
  tapTextBox: {
    position: "absolute",
    right: "5%",
    top: "40%",
  },
  tapText: {
    fontSize: 13,
    fontFamily: "ZenMaruGothicBold",
    color: "#222",
    textAlign: "center",
  },
  pinContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },
  pinTitle: {
    fontSize: 18,
    fontFamily: "ZenMaruGothicBold",
    marginBottom: 12,
    textAlign: "left",
    marginLeft: 10,
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  pinItem: {
    alignItems: "center",
  },
  pinImage: {
    width: 28,
    height: 28,
    marginBottom: 6,
  },
  pinLabel: {
    fontSize: 15,
    fontFamily: "ZenMaruGothicBold",
    color: "#333",
    fontWeight: "500",
  },
  additionalText: {
    color: "#949494",
    fontFamily: "ZenMaruGothicBold",
    fontSize: 16,
    marginTop: 25,
    marginRight: 10,
    alignSelf: "flex-end",
  },
});

export default CleanHowToView;
