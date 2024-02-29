import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { HeaderforTextbook3 } from "../../../../component/Textbook/HeaderforTextbook3";
import { db, collection, getDocs } from "../../../../../firebase";

export const CameraDraw = () => {
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

  return (
    <View>
      <HeaderforTextbook3 />
      <View>
        {products.map((product) => (
          <View key={product.id}>
            <Text>{product.productName}</Text>
            <Text>{product.department}</Text>
            <Text>{product.condition}</Text>
            <Text>{product.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
