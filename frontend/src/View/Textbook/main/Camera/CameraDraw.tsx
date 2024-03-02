import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HeaderforTextbook3 } from "../../../../component/Textbook/HeaderforTextbook3";
import { db, collection, getDocs } from "../../../../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export const CameraDraw = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "freeMarket"));
    const productsData = [];
    querySnapshot.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() });
    });
    setProducts(productsData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDraftPress = (product) => {
    navigation.navigate("出品する", { product });
  };

  return (
    <View>
      <HeaderforTextbook3 />
      <View style={styles.draft}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productContainer}
            onPress={() => handleDraftPress(product)}
          >
            <View style={styles.productItem}>
              <Text>商品名：{product.productName}</Text>
              <Text>使用学科：{product.department}</Text>
              <Text>商品の状態：{product.condition}</Text>
              <Text>説明：{product.description}</Text>
              <Text>値段：{product.price}</Text>
              {product.images &&
                product.images.map((imageUrl, index) => (
                  <Image
                    key={index}
                    source={{ uri: imageUrl }}
                    style={styles.image}
                  />
                ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  draft: {
    borderWidth: 1,
  },
  productContainer: {
    marginBottom: 10,
    padding: 10,
  },
  productItem: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
