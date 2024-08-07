import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HeaderforTextbook4 } from "../../../../component/Textbook/HeaderforTextbook4";
import { db, collection, getDocs } from "../../../../../firebase";
import { deleteDoc, doc, limit, orderBy, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";

export const MyPageSell = ({}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 const userUUID=useSelector((state:State)=>state.user.userUUID||"") 
  const getdata = async () => {

   


    try {
      setIsLoading(true);
      const textbookArray = [];

      const q = query(
          collection(db, "syuppinn"),
          where("userId", "==", userUUID),
          orderBy("createdAt", "desc"),
          limit(8)
        );
      
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        textbookArray.push({ id: doc.id, ...doc.data() });
      });
  
      // クエリで取得した最後のドキュメントを保存
      // if (!querySnapshot.empty) {
      //   lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      // }
      setProducts(textbookArray);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchProducts = async () => {
    
  //   const querySnapshot = await getDocs(collection(db, "syuppinn"));
  //   const productsData = [];
  //   querySnapshot.forEach((doc) => {
  //     productsData.push({ id: doc.id, ...doc.data() });
  //   });
  //   setProducts(productsData);
  // };

  useEffect(() => {
    getdata();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteProduct = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      await deleteDoc(doc(db, "syuppinn", selectedProduct.id));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedProduct.id)
      );
      closeModal();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <ScrollView style={styles.draft}>
        {products.map((product) => (
          <TouchableOpacity key={product.id} onPress={() => openModal(product)}>
            <View style={styles.productItem}>
              <View style={{ }}>
                {product.images &&
                  product.images.map((imageUrl, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageUrl }}
                      style={styles.image}
                    />
                  ))}
              </View>
              <View>
                <Text>商品名：{product.productName}</Text>
                <Text>値段：{product.price}円</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedProduct?.images &&
              selectedProduct?.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={styles.image}
                />
              ))}
            <Text>商品名：{selectedProduct?.productName}</Text>
            <Text>使用学科：{selectedProduct?.department}</Text>
            <Text>商品の状態：{selectedProduct?.condition}</Text>
            <Text>説明：{selectedProduct?.description}</Text>
            <Text>値段：{selectedProduct?.price}</Text>
            <TouchableOpacity onPress={()=>deleteProduct()}>
              <Text style={styles.deleteButton}>出品取り下げる。</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  draft: {
    borderWidth: 1,
  },
  productItem: {
    flexDirection: "row" ,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    textAlign: "center",
  },
  deleteButton: {
    color:"red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    textAlign: "center",
  },
});
