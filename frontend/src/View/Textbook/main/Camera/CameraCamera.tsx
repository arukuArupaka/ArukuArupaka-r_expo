import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { HeaderforTextbook3 } from "../../../../component/Textbook/HeaderforTextbook3";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export const CameraCamera = () => {
  const [images, setImages] = useState(Array(4).fill(null));

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
        ></TextInput>
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
    height: "15%",
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
});
