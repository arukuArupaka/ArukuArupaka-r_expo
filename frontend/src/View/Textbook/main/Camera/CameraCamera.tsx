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
import RNPickerSelect from 'react-native-picker-select';

export const CameraCamera = ({ route }) => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  // const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  // const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [productName, setproductName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [faculty, setFaculty] = useState('');
  const [condition, setCondition] = useState('');

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
      newImages[index] = result.uri;
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
        await updateDoc(doc(db, "syuppinn", product.id), {
          productName: productName,
          department: department,
          condition: condition,
          description: description,
          price: price,
          createdAt: new Date(),
        });
      } else {
        const docRef = await addDoc(collection(db, "syuppinn"), {
          productName: productName,
          department: department,
          condition: condition,
          description: description,
          price: price,
          createdAt: new Date(),
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
      await updateDoc(doc(db, "syuppin", product ? product.id : docRef.id), {
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
    if (!auth.currentUser) {
      // ユーザーがログインしていない場合は、ログインページにリダイレクトするなどの処理を行う
      return;
    }

    // ユーザーのuidを取得する
    const userId = auth.currentUser.uid;

    // 全ての項目が入力されているか確認する
    if (!productName || !department || !condition || !description || !price) {
      alert("全ての項目を入力してください");
      return; // 出品を中止する
    }

    try {
      const docRef = await addDoc(collection(db, "syuppinn"), {
        productName,
        department,
        condition,
        description,
        price,
        userId: userId, // ユーザーのuidを保存する
      });
      console.log("Document written with ID: ", docRef.id);

      // 画像をアップロードしてURLを取得し、Firestoreに保存
      const imageUrls = await Promise.all(
        images.map(async (image, index) => {
          if (image) {
            const blob = await fetch(image).then((response) => response.blob());
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

      // Firestoreに画像のURLを保存
      await updateDoc(doc(db, "syuppinn", docRef.id), {
        images: imageUrls.filter((url) => url !== null),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // Delete the document from the freeMarket collection
    if (product) {
      await deleteDoc(doc(db, "syuppinn", product.id));
    }
  };

  // const handleDepartmentSelect = (department) => {
  //   setSelectedDepartment(department);
  //   setDepartmentModalVisible(false);
  // };

  // const handleConditionSelect = (condition) => {
  //   setSelectedCondition(condition);
  //   setConditionModalVisible(false);
  // };

  return (
    <View>

      <HeaderforTextbook3 />

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
          style={{ marginLeft: "3%" }}
          placeholder="商品名"
          value={productName}
          onChangeText={setproductName}
        ></TextInput>
      </View>

      <View style={styles.syousai}>
        <Text>商品情報</Text>

        <Text>使用学部</Text>
        <RNPickerSelect
          value={faculty}
          onValueChange={(value) => setFaculty(value)}
          items={[
            { label: '法学部', value: '法学部', key: 'hougaku' },
            { label: '経済学部', value: '経済学部', key: 'keizai' },
            { label: '経営学部', value: '経営学部', key: 'keiei' },
            { label: '産業社会学部', value: '産業社会学部', key: 'sansha' },
            { label: '国際関係学部', value: '国際関係学部', key: 'kokusai' },
            { label: '政策科学部', value: '政策科学部', key: 'seisaku' },
            { label: '文学部', value: '文学部', key: 'bun' },
            { label: '映像学部', value: '映像学部', key: 'eizou' },
            { label: '総合心理学部', value: '総合心理学部', key: 'sougou' },
            { label: '理工学部', value: '理工学部', key: 'rikou' },
            { label: 'グローバル教養学部', value: 'グローバル教養学部', key: 'gurokyou' },
            { label: '食マネジメント学部', value: '食マネジメント学部', key: 'shokumane' },
            { label: '情報理工学部', value: '情報理工学部', key: 'jouri' },
            { label: '生命科学部', value: '生命科学部', key: 'seimei' },
            { label: '薬学部', value: '薬学部', key: 'yakugaku' },
            { label: 'スポーツ健康学部', value: 'スポーツ健康学部', key: 'supoken' }
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: '選択してください', value: 'notSelectCanpans' }}
          Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
        />
        <Text>商品の状態</Text>
        <RNPickerSelect
          value={condition}
          onValueChange={(value) => setCondition(value)}
          items={[
            { label: '新品、未使用', value: '新品、未使用', key: 'condition1' },
            { label: '未使用に近い', value: '未使用に近い', key: 'condition2' },
            { label: '目立った傷や汚れなし', value: '目立った傷や汚れなし', key: 'condition3' },
            { label: 'やや傷や汚れあり', value: 'やや傷や汚れあり', key: 'condition4' },
            { label: '傷や汚れあり', value: '傷や汚れあり', key: 'condition5' },
            { label: '全体的に状態が悪い', value: '政策科学部', key: 'condition' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: '選択してください', value: 'notSelectCanpans' }}
          Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
        />

        <Text>商品説明</Text>


        <View
          style={{
            width: "90%",
            height: "40%",
            marginLeft: "5%",
            marginBottom: "5%",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <TextInput
            value={description}
            onChangeText={setdescription}
          ></TextInput>
        </View>
        <View
          style={{ flexDirection: "row", marginLeft: "2.5%" }}
        >
          <Text>値段</Text>
          <View
            style={{
              width: "40%",
              height: "80%",
              borderWidth: 1,
            }}
          >
            <TextInput value={price} onChangeText={setprice}></TextInput>
          </View>
          <Text>円</Text>
        </View>
        <View>
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              exhibit(
                productName,
                selectedDepartment,
                selectedCondition,
                description,
                price
              );
            }}
          >
            <Text>出品する</Text>
          </TouchableOpacity>
        </View>

      </View>




    </View>
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 5,
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    width: '100%'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
    backgroundColor: '#eee'
  },
});
