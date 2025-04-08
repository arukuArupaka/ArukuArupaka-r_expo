import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderforTextbook3 } from "../../../../component/Textbook/HeaderforTextbook3";
import DepartmentPicker from "../../../../component/Textbook/DepartmentPicker";
import DepartmentPicker2 from "../../../../component/Textbook/DepartmentPicker2";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  db,
  collection,
  addDoc,
  ref,
  uploadBytes,
  storage,
  doc,
  updateDoc,
  docRef,
  deleteDoc,
  auth,
} from "../../../../../firebase";
import { getDownloadURL } from "firebase/storage";
import { FieldValue, serverTimestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import faculties from "../../../../data/faculties.json";
import {
  TextBookData,
  convertTextBookData,
  Department,
  Condition,
  translateCondition,
  checkImageFalsy,
  Campus,
} from "../../../../component/Textbook/interface/textBookData";
import { ARUPAKA_BACKEND_URL } from "../../../../../env";

const arupakaDbAdress = `${ARUPAKA_BACKEND_URL}/listing_item/create_item`;

const uploadArupakaDb = async (data: TextBookData) => {
  const dataDb = convertTextBookData(data);
  try {
    const response = await fetch(arupakaDbAdress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataDb), // JavaScriptオブジェクトをJSON文字列に変換
    });
    if (!response.ok) {
      throw new Error(`Error Status:${response.status}`);
    }
  } catch (error) {
    console.error("APIにデータを送信できませんでした:", error);
  }
};

export const CameraCamera = ({ route }) => {
  const navigation = useNavigation();

  const [images, setImages] = useState<string[]>(Array(4).fill(null));
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition>(null);
  const [selectedLocation, setSelectedLocation] = useState<Campus>(null);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [productName, setproductName] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const { product } = route.params || {};

  useEffect(() => {
    if (product) {
      setproductName(product.productName);
      setSelectedDepartment(product.department);
      setSelectedLocation(product.location);
      setSelectedCondition(product.condition);
      setdescription(product.description);
      setPrice(product.price);
      setImages(product.images || Array(4).fill(null));
    }
  }, [product]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (product && images.every((image) => image === null)) {
      setImages(product.images || Array(4).fill(null));
    }
  }, [product, images]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("カメラロールへのアクセスが許可されていません");
        }
      }
    })();
  }, []);

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const newImages = [...images];
      console.log(newImages);
      newImages[index] = result.assets[0].uri;
      console.log(result.assets[0].uri);
      console.log(newImages);

      setImages(newImages);
    }
  };

  const exhibitProduct = async (
    productName: string,
    department: Department,
    location: Campus,
    condition: Condition,
    description: string,
    price: string
  ) => {
    if (Number(price) < 0 || isNaN(Number(price))) {
      Alert.alert("error", "価格が不正な値です");
      return;
    }
    // ユーザーのログイン状態を確認する
    try {
      setIsLoading(true);
      if (!auth.currentUser) {
        Alert.alert("ログイン白や", "出品するにはログインが必要です");
        return;
      }

      const userId = auth.currentUser.uid;

      // 全ての項目が入力されているか確認する
      if (
        !productName ||
        !department ||
        !condition ||
        !location ||
        !description ||
        !price
      ) {
        Alert.alert("error", "全ての項目を入力してください");
        return; // 出品を中止する
      }

      try {
        const docRef = await addDoc(collection(db, "syuppinn"), {
          productName,
          department,
          location,
          condition,
          description,
          price,
          userId: userId,
          createdAt: serverTimestamp(),
        });

        const imageUrls = await Promise.all(
          images.map(async (image, index) => {
            if (image) {
              const blob = await fetch(image).then((response) =>
                response.blob()
              );
              const storageRef = ref(
                storage,
                `syouhin/${docRef.id}/image${index}`
              );
              await uploadBytes(storageRef, blob);
              return getDownloadURL(storageRef);
            }
            return null;
          })
        );

        await updateDoc(doc(db, "syuppinn", docRef.id), {
          images: imageUrls.filter((url) => url !== null),
        });

        //Delete the document from the freeMarket collection
        if (product) {
          await deleteDoc(doc(db, "freeMarket", product.id));
        }

        console.log(
          "add arupaka db textbook" +
            {
              id: docRef.id,
              condition: translateCondition(condition), //フロント内では日本語で扱われているので変換
              createdAt: new Date(),
              department: department,
              description: description,
              images: checkImageFalsy(imageUrls),
              price: price,
              productName: productName,
              userID: userId,
            }
        );
        uploadArupakaDb({
          id: docRef.id,
          condition: translateCondition(condition), //フロント内では日本語で扱われているので変換
          createdAt: new Date(),
          department: department,
          description: description,
          images: checkImageFalsy(imageUrls),
          price: price,
          productName: productName,
          userID: userId,
        });
        // 出品成功時のみダイアログを表示
        Alert.alert("成功", "出品しました", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } catch (e) {
        console.error("Error adding document: ", e);
        Alert.alert("エラー", "エラー");
      }
    } catch (e) {
      console.error("Error: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F8F8F8" }}
      keyboardVerticalOffset={50}
    >
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)", // 半透明の背景
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* 商品画像 */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 4,
                }}
                onPress={() => pickImage(index)}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: "100%", height: "100%", borderRadius: 8 }}
                  />
                ) : (
                  <Ionicons name="camera" size={40} color="#888" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 商品名 */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>
          商品名
        </Text>
        <TextInput
          style={{
            borderColor: "#CCC",
            borderWidth: 1,
            borderRadius: 8,
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: "#FFF",
          }}
          value={productName}
          placeholder="※必須"
          onChangeText={setproductName}
        />

        {/* 商品詳細 */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>
          商品情報
        </Text>

        {/* 使用学部 */}
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor:"red"
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 10, flex: 1 }}>
            カテゴリー
          </Text>
          <View style={{ width: 100 }}>
            <RNPickerSelect
              onValueChange={setSelectedDepartment}
              placeholder={{ label: "※必須", value: null }}
              items={Object.keys(faculties.学部).map((key) => ({
                label: faculties.学部[key].名称,
                value: faculties.学部[key].名称,
              }))}
              style={{
                inputIOS: {
                  fontSize: 16,
                  textAlign: "center",
                  height: 40,
                  width: 100,
                }, // iOS向け調整
                inputAndroid: { fontSize: 16, textAlign: "center", height: 40 }, // Android向け調整
              }}
              Icon={() => (
                <View style={{ position: "absolute", right: 3, top: 6 }}>
                  <FontAwesome name="angle-down" size={25} color="black" />
                </View>
              )}
            />
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor:"red"
          }}
        >
          {/* 取引キャンパス */}
          <Text style={{ fontSize: 16, marginRight: 10, flex: 1 }}>
            キャンパス取引
          </Text>
          <RNPickerSelect
            onValueChange={setSelectedLocation}
            placeholder={{ label: "※必須", value: null }}
            items={[
              { label: "衣笠キャンパス", value: "衣笠キャンパス" },
              {
                label: "びわこ・くさつキャンパス",
                value: "びわこ・くさつキャンパス(BKC)",
              },
              {
                label: "大阪いばらきキャンパス",
                value: "大阪いばらきキャンパス",
              },
            ]}
            style={{
              inputIOS: {
                fontSize: 16,
                height: 40,
                width: 200,
                textAlign: "right",
                marginRight: 30,
              }, // iOS向け調整
              inputAndroid: { fontSize: 16, textAlign: "center", height: 40 }, // Android向け調整
            }}
            Icon={() => (
              <View style={{ position: "absolute", right: 3, top: 6 }}>
                <FontAwesome name="angle-down" size={25} color="black" />
              </View>
            )}
          />
        </View>
        {/* 商品の状態 */}
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            // backgroundColor:"red"
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 10, flex: 1 }}>
            商品の状態
          </Text>
          <RNPickerSelect
            onValueChange={setSelectedCondition}
            placeholder={{ label: "※必須", value: null }}
            items={[
              { label: "新品、未使用", value: "BRAND_NEW" },
              { label: "未使用に近い", value: "LIKE_NEW" },
              { label: "目立った傷や汚れなし", value: "GOOD" },
              { label: "やや傷や汚れあり", value: "FAIR" },
              { label: "傷や汚れあり", value: "POOR" },
              { label: "全体的に状態が悪い", value: "BAD" },
            ]}
            style={{
              inputIOS: {
                fontSize: 16,
                height: 40,
                width: 150,
                textAlign: "right",
                marginRight: 30,
              }, // iOS向け調整
              inputAndroid: { fontSize: 16, textAlign: "center", height: 40 }, // Android向け調整
            }}
            Icon={() => (
              <View style={{ position: "absolute", right: 3, top: 6 }}>
                <FontAwesome name="angle-down" size={25} color="black" />
              </View>
            )}
          />
        </View>

        {/* 商品説明 */}
        <Text style={{ marginTop: 10 }}>商品説明</Text>
        <TextInput
          style={{
            borderColor: "#CCC",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            backgroundColor: "#FFF",
            height: 80,
          }}
          value={description}
          onChangeText={setdescription}
          placeholder="※必須"
          multiline
        />

        {/* 価格 */}
        <Text style={{ marginTop: 10 }}>価格</Text>
        <TextInput
          style={{
            borderColor: "#CCC",
            borderWidth: 1,
            borderRadius: 8,
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: "#FFF",
          }}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="※必須"
        />

        {/* 出品ボタン */}
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => {
            Alert.alert("出品しますか？", "出品すると元に戻せません", [
              { text: "キャンセル", style: "cancel" },
              {
                text: "出品する",
                onPress: () =>
                  exhibitProduct(
                    productName,
                    selectedDepartment,
                    selectedLocation,
                    selectedCondition,
                    description,
                    price
                  ),
              },
            ]);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>出品する</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  infomation: {
    flexDirection: "row",
    borderWidth: 1,
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "2%",
    borderRadius: 5,
  },
  productname: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 90,
    width: "95%",
    height: "8%",
    marginLeft: "2.5%",
    marginTop: "5%",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
    marginLeft: "2.5%",
    width: "95%",
  },
  imageWrapper: {
    width: "20%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: "5%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  placeholder: {
    flex: 1,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  syousai: {
    width: "95%",
    height: "30%",
    marginLeft: "2.5%",
    marginTop: "5%",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
