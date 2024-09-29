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
import {KeyboardAvoidingView, } from "react-native";

export const CameraCamera = ({ route }) => {
  const navigation = useNavigation();

  const [images, setImages] = useState(Array(4).fill(null));
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [productName, setproductName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");

  const { product } = route.params || {};

  useEffect(() => {
    if (product) {
      setproductName(product.productName);
      setSelectedDepartment(product.department);
      setSelectedCondition(product.condition);
      setdescription(product.description);
      setprice(product.price);
      setImages(product.images || Array(4).fill(null));
    }
  }, [product]);

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

  const saveDraft = async (
    productName,
    department,
    condition,
    description,
    price
  ) => {
    try {
      if (product) {
        await updateDoc(doc(db, "freeMarket", product.id), {
          productName,
          department,
          condition,
          description,
          price,
        });
      } else {
        const docRef = await addDoc(collection(db, "freeMarket"), {
          productName,
          department,
          condition,
          description,
          price,
        });
        console.log("Document written with ID: ", docRef.id);
      }

      // 画像をアップロードしてURLを取得し、Firestoreに保存
      const imageUrls = await Promise.all(
        images.map(async (image, index) => {
          if (image) {
            const blob = await fetch(image).then((response) => response.blob());
            const storageRef = ref(
              storage,
              `syouhin/${product ? product.id : docRef.id}/image${index}`
            );
            await uploadBytes(storageRef, blob);
            return getDownloadURL(storageRef);
          }
          return null;
        })
      );

      // Firestoreに画像のURLを保存
      await updateDoc(doc(db, "freeMarket", product ? product.id : docRef.id), {
        images: imageUrls.filter((url) => url !== null),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const exhibit = async (
    productName,
    department,
    condition,
    description,
    price
  ) => {
    // ユーザーのログイン状態を確認する
    try {
      if (!auth.currentUser) {
        Alert.alert("ログイン白や", "出品するにはログインが必要です");
        return;
      }

      const userId = auth.currentUser.uid;

      // 全ての項目が入力されているか確認する
      if (!productName || !department || !condition || !description || !price) {
        Alert.alert("error", "全ての項目を入力してください");
        return; // 出品を中止する
      }

      try {
        const docRef = await addDoc(collection(db, "syuppinn"), {
          productName,
          department,
          condition,
          description,
          price,
          userId: userId,
          createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);

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

        // Delete the document from the freeMarket collection
        if (product) {
          await deleteDoc(doc(db, "freeMarket", product.id));
        }

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
    }
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setDepartmentModalVisible(false);
  };

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    setConditionModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    style={{ flex: 1 }}
  >
    <ScrollView>
    <View>
      <View style={styles.infomation}>
        <Ionicons
          name="information-circle"
          size={26}
          style={{ height: 30, marginLeft: "4%" }}
        ></Ionicons>
        <Text style={{ fontSize: 15, marginLeft: "2%", marginTop: "0.5%" }}>
          商品情報
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageWrapper}
            onPress={() => pickImage(index)}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons
                  name="camera"
                  size={50}
                  color="white"
                  style={{ marginLeft: "17%", marginTop: "13%" }}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.productname}>
        <FontAwesome
          name="tag"
          size={22}
          style={{ height: 20, paddingLeft: "5%", marginTop: "4%" }}
        ></FontAwesome>
        <TextInput
          style={{ marginLeft: "3%", flex: 1 }}
          placeholder="商品名"
          value={productName}
          onChangeText={setproductName}
        ></TextInput>
      </View>

      <View style={styles.syousai}>
        <Text>商品情報</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>使用学部</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDepartment(value)}
            placeholder={{ label: "選択されていません", value: null }}
            items={Object.keys(faculties.学部).map((key) => ({
              label: faculties.学部[key].名称,
              value: faculties.学部[key].名称,
            }))}
            style={{ inputIOS: { marginLeft: "5%" } }} // iOS向けのスタイル調整
            value={selectedDepartment}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>商品の状態</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCondition(value)}
            placeholder={{ label: "選択されていません", value: null }}
            items={[
              { label: "新品、未使用", value: "新品、未使用" },
              { label: "未使用に近い", value: "未使用に近い" },
              { label: "目立った傷や汚れなし", value: "目立った傷や汚れなし" },
              { label: "やや傷や汚れあり", value: "やや傷や汚れあり" },
              { label: "傷や汚れあり", value: "傷や汚れあり" },
              { label: "全体的に状態が悪い", value: "全体的に状態が悪い" },
              // 他の状態もここに追加できます
            ]}
            style={{
              inputIOS: { marginLeft: "5%" },
              inputAndroid: { marginLeft: "5%" },
            }} // iOS & Android向けのスタイル調整
            value={selectedCondition}
          />
        </View>
        <Text>商品説明</Text>

        <View
          style={{
            width: "90%",
            height: "100%",
            marginLeft: "5%",
            marginBottom: "5%",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: "100%",
            }}
            value={description}
            onChangeText={setdescription}
          ></TextInput>
        </View>
        <View
          style={{ flexDirection: "row", marginTop: "5%", marginLeft: "2.5%" }}
        >
          <Text>値段</Text>
          <View
            style={{
              width: "40%",
              height: "80%",
              borderWidth: 1,
            }}
          >
            <TextInput 
            value={price} 
            onChangeText={setprice}　 
            keyboardType="numeric" // 数字入力用キーボード
            ></TextInput>
          </View>
          <Text>円</Text>
        </View>
        <View>
          {/* <TouchableOpacity
            onPress={() => {
              saveDraft(
                productName,
                selectedDepartment,
                selectedCondition,
                description,
                price
              );
            }}
          >
            <Text>下書きを保存する</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              width: "90%",
              height: 30,
              marginLeft: "5%",
              marginTop: "5%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              Alert.alert(
                "出品しますか？",
                "出品すると元に戻すことはできません",
                [
                  {
                    text: "キャンセル",
                    style: "cancel",
                  },
                  {
                    text: "出品する",
                    onPress: () => {
                      exhibit(
                        productName,
                        selectedDepartment,
                        selectedCondition,
                        description,
                        price
                      );
                    },
                  },
                ]
              );
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>出品する</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
