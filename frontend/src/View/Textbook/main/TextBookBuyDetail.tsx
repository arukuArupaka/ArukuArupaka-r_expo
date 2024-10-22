import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TextBookBuyDetail() {
  const userUUID = useSelector((state: State) => state.user.userUUID || "");
  const userName = useSelector(
    (state: State) => state.user.userObject.userName || ""
  );

  const route = useRoute();
  const TextBookData = route.params;

  const [isMyTextBook, setIsMyTextBook] = useState(false);

  useEffect(() => {
    if (TextBookData.userId === userUUID) {
      setIsMyTextBook(true);
    }
  }, [TextBookData, userUUID]);

  const buyConfirm = () => {
    Alert.alert("購入しますか？", "この操作は取り消せません。", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "購入",
        onPress: () => buyProducts(),
      },
    ]);
  };
  console.log(userUUID);

  const buyProducts = async () => {
    try {
      const productRef = doc(db, "syuppinn", `${TextBookData.id}`);

      await updateDoc(productRef, {
        buyUser: userUUID,
        buyAt: serverTimestamp(),
      });
      Alert.alert("購入しました。", "トーク画面から連絡を取りましょう。");
    } catch (e) {
      Alert.alert("エラーが発生しました。", "もう一度お試しください。");
      console.error(e);
    }
  };

  const confirmReport = () => {
    Alert.alert("本当に通報しますか？", "この操作は取り消せません。", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "通報",
        onPress: () => report(),
      },
    ]);
  }
  const report = async () => {
    try {
      const reportRef = doc(db, "ReportTextBook", `${TextBookData.id+userUUID}`);
      await setDoc(reportRef, {
        TextID:TextBookData.id,
        bookUserId: TextBookData.userId,
        reportUserId: userUUID,
        reportAt: serverTimestamp(),
      });
      Alert.alert("通報しました。", "運営に報告しました。");
    } catch (e) {
      Alert.alert("エラーが発生しました。", "もう一度お試しください。");
      console.error(e);
    }
  }
  console.log(TextBookData.images.lenght)

  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        style={styles.scrollView}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {TextBookData.images.length!==0?TextBookData.images.map((image, index) => (
          <Image style={styles.image} key={index} source={image?{ uri: image }:require('../../../image/textbook/no_Image.png')} />
        )):<Image style={styles.image} source={require('../../../image/textbook/no_Image.png')} />
      }

      </ScrollView>
      <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 35 }}>{TextBookData.productName}</Text>
        <Text style={{ fontSize: 20, marginLeft: 20, color: "gray" }}>
          {TextBookData.className}
        </Text>
        <Text style={{ fontSize: 35, margin: 20 }}>
          <Text style={{ fontSize: 25, color: "gray" }}>¥</Text>
          {TextBookData.price}
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 25 }}>商品説明</Text>
        <Text style={{ fontSize: 20 }}>{TextBookData.description}</Text>
        <Text style={{ fontSize: 25, marginTop: 10 }}>商品情報</Text>
        <Text style={{ fontSize: 20 }}>{TextBookData.condition}</Text>
        <Text style={{ fontSize: 25, marginTop: 10 }}>キャンパス</Text>
        <Text style={{ fontSize: 20 }}>{(TextBookData.location)}</Text>
      </View>
      <View style={{ flexDirection: "row-reverse" }}>
        {!("buyUser" in TextBookData)&&<View>{!isMyTextBook ? (
          <TouchableOpacity
            style={{
              width: 150,
              height: 40,
              marginRight: 10,
              borderWidth: 1,
              borderRadius: 50,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => buyConfirm()}
          >
            <Text style={{ fontSize: 20 }}>
              <Entypo name="shopping-cart" size={24} color="black" />
              購入する
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              width: 150,
              height: 40,
              marginRight: 10,
              borderWidth: 1,
              borderRadius: 50,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Alert.alert("確認", "この商品はあなたの商品です。")}
          >
            <Text style={{ fontSize: 20, color: "gray" }}>
              <Entypo name="shopping-cart" size={24} color="gray" />
              購入する
            </Text>
          </TouchableOpacity>
        )}</View>}
      </View>
      <TouchableOpacity
      onPress={() => confirmReport()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderRadius: 5,
          width: 100,
        }}
      >
        <Icon
          name="ban"
          size={20}
          color="#f44336"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "#f44336", fontSize: 16, fontWeight: "bold" }}>
          追放
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
  },
  image: {
    height: 400,
    width: 400,
    marginHorizontal: 10, // 画像の間にスペースを入れる
  },
});
