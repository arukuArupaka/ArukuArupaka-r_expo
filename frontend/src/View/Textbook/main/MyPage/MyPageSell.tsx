// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Modal,
//   TouchableOpacity,
// } from "react-native";
// import { HeaderforTextbook4 } from "../../../../component/Textbook/HeaderforTextbook4";
// import { db, collection, getDocs } from "../../../../../firebase";

// export const MyPageSell = ({}) => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const fetchProducts = async () => {
//     const querySnapshot = await getDocs(collection(db, "syuppinn"));
//     const productsData = [];
//     querySnapshot.forEach((doc) => {
//       productsData.push({ id: doc.id, ...doc.data() });
//     });
//     setProducts(productsData);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <View>
//       <HeaderforTextbook4 />
//       <View style={styles.draft}>
//         {products.map((product) => (
//           <TouchableOpacity key={product.id} onPress={() => openModal(product)}>
//             <View style={styles.productItem}>
//               <View style={{ flexDirection: "row" }}>
//                 {product.images &&
//                   product.images.map((imageUrl, index) => (
//                     <Image
//                       key={index}
//                       source={{ uri: imageUrl }}
//                       style={styles.image}
//                     />
//                   ))}
//               </View>
//               <View>
//                 <Text>商品名：{product.productName}</Text>
//                 <Text>値段：{product.price}円</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text>商品名：{selectedProduct?.productName}</Text>
//             <Text>使用学科：{selectedProduct?.department}</Text>
//             <Text>商品の状態：{selectedProduct?.condition}</Text>
//             <Text>説明：{selectedProduct?.description}</Text>
//             <Text>値段：{selectedProduct?.price}</Text>
//             {selectedProduct?.images &&
//               selectedProduct?.images.map((imageUrl, index) => (
//                 <Image
//                   key={index}
//                   source={{ uri: imageUrl }}
//                   style={styles.image}
//                 />
//               ))}
//             <TouchableOpacity onPress={closeModal}>
//               <Text style={styles.closeButton}>閉じる</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   draft: {
//     borderWidth: 1,
//   },
//   productItem: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   closeButton: {
//     backgroundColor: "gray",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     textAlign: "center",
//   },
// });
