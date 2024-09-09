import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  arrayUnion,
  updateDoc,
  Timestamp,
  onSnapshot,
  orderBy,
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import TalkFriendListItemContainer from "../../../component/Textbook/Chat/TalkFriendListItemContainer";
import { db } from "../../../../firebase";
import { useSelector } from "react-redux";

const TalkBookChatView = ({ navigation }) => {
  const userUUID = useSelector((state: State) => state.user.userUUID || "");
  const windowWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      margin: 10,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#30CB89",
      height: "10%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: "95%",
      top: 50,
      backgroundColor: "white",
      zIndex: 1,
    },
    icon: {
      backgroundColor: "black",
      borderRadius: 30,
      height: 60,
      width: 60,
      marginLeft: 40,
      marginRight: 10,
    },
    informations: {
      flexDirection: "column",
    },
    NameHeart: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "75%",
      paddingLeft: "5%",
      paddingBottom: 5,
    },
    heart: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    heartCount: {
      backgroundColor: "silver",
      width: "60%",
      borderRadius: 20,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: "5%",
    },
    FucilityDate: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "70%",
      paddingLeft: "3%",
    },
    personlist: {
      width: "100%",
      height: 16000,
      marginTop: "45%",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: 900,
      // backgroundColor: 'red'
    },
    footer: {
      position: "absolute",
      bottom: 0,
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    personInfo: {
      width: windowWidth,
      justifyContent: "flex-start",
      borderTopWidth: 1,
      borderTopColor: "silver",
      flexDirection: "row",
      paddingLeft: "2%",
      alignItems: "center",
      paddingVertical: "4%",
      // backgroundColor: 'red'
    },
    buttonContainer: {
      width: "100%",
      justifyContent: "space-around",
      paddingHorizontal: "1%",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: "4%",
    },
    TalkButton: {
      height: "100%",
      width: "40%",
      alignItems: "center",
      marginVertical: "1%",
      borderRadius: 10,
    },
    MatchingButton: {
      height: "100%",
      width: "40%",
      alignItems: "center",
      marginVertical: "1%",
      borderRadius: 10,
    },
  });

  const [DMList, setDMList] = useState([]);
  const [DMExhibitList, setDMExhibitList] = useState([]);

  useEffect(() => {
    getbuyFriendData();
    getFriendData();
  }, []);

  const getbuyFriendData = async () => {
    const friendData = [];
    const syuppinnCollectionRef = collection(db, "syuppinn");

    // buyUserが指定したuserUUIDと一致するドキュメントを検索
    const q = query(syuppinnCollectionRef, where("buyUser", "==", userUUID));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // データをfriendDataに追加
        friendData.push({ bookID: doc.id, ...doc.data() });
      });

      // 取得したデータをセット
      setDMList(friendData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const scrollToPurchase = () => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };

  const scrollToExhibit = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const getFriendData = async () => {
    const friendData = [];
    const friendDocRef = doc(db, "TextBookChatUsers", userUUID);
    const friendDocSnap = await getDoc(friendDocRef);
    if (friendDocSnap.exists()) {
      friendDocSnap.data().TextBookChatUsers.map((friend) => {
        friendData.push({ id: friend });
      });
    }
    setDMExhibitList(friendData);
  };

  const mockFriendData = [
    {
      name: "soshi2",
      id: "po1dPfwz3LWusJaJcMOQZvKCTbk1",
    },
    {
      name: "soshi1",
      id: "pCwKh5hgOIebyR5jZW6qIzQf9OC2",
    },
    {
      name: "daichi",
      id: "mc9sTuiF4zLLkop0txfW2KW9NXb2",
    },
  ];

  console.log(DMList);

  if (!useSelector((state: any) => state.user.isLogin)) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ textAlign: "center" }}>ログインしてください</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} className="w-full bg-black">
      <View style={{ flexDirection: "row", width: "100%", marginTop: 10 }}>
        <TouchableOpacity
          onPress={scrollToPurchase}
          style={{
            backgroundColor: "orange",
            flex: 1,
            paddingVertical: 10,
            marginHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            購入
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={scrollToExhibit}
          style={{
            backgroundColor: "orange",
            flex: 1,
            paddingVertical: 10,
            marginHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            出品
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView ref={scrollViewRef} horizontal={true} pagingEnabled={true}>
        <ScrollView style={{ width: windowWidth, paddingTop: 5 }}>
          <Text style={{textAlign:"center"}}>購入</Text>
          <View
            style={{ width: windowWidth }}
            className="border-b border-silver"
          >
            {DMList.map((FriendData) => (
              <TalkFriendListItemContainer FriendData={FriendData} />
            ))}
            <Text>{JSON.stringify(DMList)}</Text>
          </View>
        </ScrollView>
        <ScrollView style={{ width: windowWidth, paddingTop: 5 }}>
          <Text style={{textAlign:"center"}}>出品</Text>
          <View
            style={{ width: windowWidth }}
            className="border-b border-silver"
          >
            {DMExhibitList.map((FriendData) => (
              <TalkFriendListItemContainer FriendData={FriendData} />
            ))}
            <Text>{JSON.stringify(DMList)}</Text>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default TalkBookChatView;
// [
//   {
//     buyUser: "k3KQIDC0z2ZakRa2XUqGvixu02e2",
//     className: "Eee",
//     condition: "やや傷や汚れあり",
//     createdAt: [Object],
//     department: "経営学部",
//     description: "Eee",
//     id: undefined,
//     images: [
//       "https://firebasestorage.googleapis.com/v0/b/arukuarupaka-6e101.appspot.com/o/syouhin%2Fp0hakIwubA4rWyTGvxIx%2Fimage0?alt=media&token=ea12a8d0-c5ac-4137-b1f5-2b9401b8ad7e",
//     ],
//     price: "111",
//     productName: "Aaa",
//     userId: "JoXEcpGeyueXE0fqlGSXVgqXD1a2",
//   },
// ];
