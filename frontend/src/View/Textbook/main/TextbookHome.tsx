import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  orderBy,
  startAt,
  documentId,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import DepartmentSelectBotton from "../../../component/Textbook/departmentSelectBotton";
import { useNavigation } from "@react-navigation/native";
import {
  TextBookData,
  TextBookDataDB,
} from "../../../component/Textbook/interface/textBookData";
import { FontAwesome } from "@expo/vector-icons"; // アイコン用
import { ARUPAKA_BACKEND_URL } from '@env';

const departmentList = [
  { departmantName: "すべて" },
  { departmantName: "教養科目" },
  { departmantName: "法学部" },
  { departmantName: "産業社会学部" },
  { departmantName: "国際関係学部" },
  { departmantName: "文学部" },
  { departmantName: "経営学部" },
  { departmantName: "政策科学部" },
  { departmantName: "総合心理学部" },
  { departmantName: "グローバル教養学部" },
  { departmantName: "映像学部" },
  { departmantName: "情報理工学部" },
  { departmantName: "理工学部" },
  { departmantName: "経済学部" },
  { departmantName: "スポーツ健康科学部" },
  { departmantName: "食マネージメント学部" },
  { departmantName: "生命科学部" },
  { departmantName: "薬学部" },
];
let lastDoc;

export const TextbookHome = () => {
  const navigation = useNavigation();

  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("すべて");
  const [textbookArray, setTextBookArray] = useState<TextBookData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEndLoading, setIsEndLoading] = useState<boolean>(false);

  const getdata = async () => {
    try {
      setIsLoading(true);
      const textbookArray = [];
      let q;
      if (selectedDepartment === "すべて") {
        q = query(
          collection(db, "syuppinn"),
          orderBy("createdAt", "desc"),
          limit(8)
        );
      } else {
        q = query(
          collection(db, "syuppinn"),
          where("department", "==", selectedDepartment),
          orderBy("createdAt", "desc"),
          limit(8)
        );
      }

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        textbookArray.push({ id: doc.id, ...doc.data() });
      });

      // クエリで取得した最後のドキュメントを保存
      if (!querySnapshot.empty) {
        lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      }
      setTextBookArray(textbookArray);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextData = async () => {
    try {
      setIsEndLoading(true);
      const textbookArray = [];
      let q;
      if (selectedDepartment === "すべて") {
        q = query(
          collection(db, "syuppinn"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc), // lastDocからスタート
          limit(8) // 追加の制限
        );
      } else {
        q = query(
          collection(db, "syuppinn"),
          where("department", "==", selectedDepartment),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc), // lastDocからスタート
          limit(8)
        );
      }

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        textbookArray.push({ id: doc.id, ...doc.data() });
      });
      // 新しいデータがあればlastDocを更新
      if (!querySnapshot.empty) {
        lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      }

      setTextBookArray((prevArray) => [...prevArray, ...textbookArray]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsEndLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [selectedDepartment]);

  const scrollPosition = (e: any) => {
    let offsetY = e.nativeEvent.contentOffset.y; // スクロール距離
    let contentSizeHeight = e.nativeEvent.contentSize.height; // scrollView contentSizeの高さ
    let scrollViewHeight = e.nativeEvent.layoutMeasurement.height; // scrollViewの高さ

    if (offsetY + scrollViewHeight >= contentSizeHeight - 40) {
      console.log("End Scroll");
      getNextData();
    }
  };

  const textInputRef = useRef("");

  const fetchDB = async (searchWord: string): Promise<TextBookDataDB[]> => {
    try {
      const response = await fetch(
        `${ARUPAKA_BACKEND_URL}/listing_item/search_item?name=${searchWord}`
      );

      if (!response.ok) {
        throw new Error(`Error Status:${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("APIの取得に失敗:", error);
    }
  };

  const getFromFireBase = async (products: TextBookDataDB[]) => {
    try {
      setIsLoading(true);
      if (products.length === 0) {
        Alert.alert("商品が見つかりませんでした");
        return;
      }
      const idList = products.map((product) => {
        return product.documentId;
      });
      const q = query(
        collection(db, "syuppinn"),
        where(documentId(), "in", idList),
        orderBy("createdAt", "desc")
      );
      setTextBookArray([]);
      const querySnapshot = (await getDocs(q)).forEach((doc) => {
        //newDocのエラーは恐らく、...doc.dataの中身をtypescriptが認識していないため
        //firebaseに入ってるdocumentはTextBookData型に必要なプロパティをちゃんと持っているため、恐らく問題ない
        const newDoc: TextBookData = { id: doc.id, ...doc.data() };
        setTextBookArray((prevTexts) => {
          return [...prevTexts, newDoc];
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 50 }}
      >
        {departmentList.map((department) => (
          <DepartmentSelectBotton
            key={department.departmantName}
            name={department.departmantName}
            selectedDepartment={selectedDepartment}
            onSelected={() => setSelectedDepartment(department.departmantName)}
          />
        ))}
      </ScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f1f1f1", // 背景を淡いグレーにしてフラットなデザインに
            borderRadius: 10,
            paddingHorizontal: 10,
            height: 40, // 高さ統一
            marginBottom: 10, // 検索バーの下に余白
          }}
        >
          {/* 検索アイコン */}
          <FontAwesome
            name="search"
            size={16}
            color="gray"
            style={{ marginRight: 8 }}
          />

          {/* 入力フィールド */}
          <TextInput
            style={{
              flex: 1,
              height: 40,
              fontSize: 14,
              color: "#333", // 文字色を濃く
            }}
            placeholder="検索"
            placeholderTextColor="#999" // メルカリ風の薄いグレー
            onChangeText={(text) => {
              textInputRef.current = text;
            }}
          />

          {/* 検索ボタン */}
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={async () => {
              fetchDB(textInputRef.current).then((data) => {
                console.log(data);
                getFromFireBase(data);
              });
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              検索
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isLoading && textbookArray.length !== 0 ? (
        <ScrollView
          onMomentumScrollEnd={(e) => scrollPosition(e)}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start", // 左詰めにする
              paddingHorizontal: 5, // 画面端の余白を最小限に
            }}
          >
            {textbookArray.map((textbook, index) => {
              const isNegotiating = textbook.hasOwnProperty("buyUser");

              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TextBookDetail", { ...textbook })
                  }
                  key={index}
                  style={{
                    width: "24%", // 4列均等
                    marginRight: "1%", // 4の倍数だけ右マージンなし
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    overflow: "hidden",
                    marginBottom: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3, // Android用
                    opacity: isNegotiating ? 0.6 : 1, // 交渉中アイテムを暗くする
                    // pointerEvents: isNegotiating ? "none" : "auto", // クリック無効化
                  }}
                >
                  {/* 商品画像 */}
                  <View style={{ position: "relative" }}>
                    <Image
                      source={
                        textbook.images?.length
                          ? { uri: textbook.images[0] }
                          : require("../../../image/textbook/no_Image.png")
                      }
                      style={{
                        width: "100%",
                        height: 140, // 画像を強調
                        resizeMode: "cover",
                      }}
                    />

                    {/* 購入交渉中ラベル */}
                    {isNegotiating && (
                      <View
                        style={{
                          position: "absolute",
                          top: "40%",
                          left: "10%",
                          backgroundColor: "red",
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          transform: [{ rotate: "-10deg" }], // 斜めにしてメルカリ風
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 14,
                            textAlign: "center",
                          }}
                        >
                          購入交渉中
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* 商品情報 */}
                  <View style={{ padding: 5 }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#333",
                        minHeight: 32, // タイトルの高さを固定しガタつきをなくす
                      }}
                    >
                      {textbook.productName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#FF4444",
                        marginTop: 2,
                      }}
                    >
                      ¥{textbook.price.toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#666",
                        marginTop: 2,
                      }}
                    >
                      {textbook.condition}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View>
            {isEndLoading && <ActivityIndicator size="large" color="orange" />}

            {/* Android限定の追加表示ボタン */}
            {Platform.OS === "android" && !isEndLoading && (
              <TouchableOpacity
                style={{
                  backgroundColor: "orange",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  alignSelf: "center",
                  marginVertical: 10,
                }}
                onPress={getNextData}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
                >
                  もっと見る
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View>
            {isEndLoading && <ActivityIndicator size="large" color="orange" />}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          {textbookArray.length === 0 ? (
            <Text>商品がありません</Text>
          ) : (
            <ActivityIndicator size="large" color="orange" />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: 'space-between',
  },
  textbookContainer: {
    width: "25%", // 横に4つ並べるため
    marginBottom: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginVertical: 3,
  },
});
