import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import { arrayUnion, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useSelector } from "react-redux";

export default function TextBookBuyDetail() {

  const userUUID=useSelector((state:State)=>state.user.userUUID||"") 
  const userName=useSelector((state:State)=>state.user.userObject.userName||"") 
  
  const route = useRoute();
  const TextBookData = route.params;

  const buyConfirm = () => {
    Alert.alert("購入しますか？","この操作は取り消せません。",[{
      text: "キャンセル",
      style: "cancel",
    },
    {
      text: "購入",
      onPress: () => buyProducts(),
    }])
  }
  console.log(userUUID);

  const buyProducts=async()=>{

    try{
      const myDocRef = doc(
        db,
        "TextBookChatUsers",
        `${userUUID}`,
      );
      const friendDocRef = doc(
        db,
        "TextBookChatUsers",
        `${TextBookData.userId}`,
      );
      console.log("aaa")
      console.log(
        db,
        "TextBookChatUsers",
        `${TextBookData.userId}`,
      );
      const productRef = doc(
        db,
        "syuppinn",
        `${TextBookData.id}`,
      );
      const buyUser={id:userUUID,name:userName}
      const friendName={id:TextBookData.userId,name:TextBookData.userName?TextBookData.userName:"unknown "}
      await setDoc(myDocRef, {
        TextBookChatUsers: arrayUnion(TextBookData.userId)
      }, { merge: true });
      await setDoc(friendDocRef, {
        TextBookChatUsers: arrayUnion(userUUID)
      }, { merge: true });

      await setDoc(productRef, {
        buyUser:userUUID
      },{ merge: true });


    }catch(e){

      console.log(e);
    }
  }
  console.log(TextBookData);
  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        style={styles.scrollView}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {TextBookData.images.map((image, index) => (
          <Image style={styles.image} key={index} source={{ uri: image }} />
        ))}
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
      </View>
      <View style={{ flexDirection: "row-reverse" }}>
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
      </View>
    
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
