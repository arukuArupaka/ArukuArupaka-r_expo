import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, getDocs ,limit,startAfter, orderBy,startAt} from "firebase/firestore";
import { db } from "../../../../firebase";
import DepartmentSelectBotton from "../../../component/Textbook/departmentSelectBotton";
import { useNavigation } from "@react-navigation/native";

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
  let lastDoc ;
export const TextbookHome = () => {

  const navigation = useNavigation();


  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("すべて");
  const [textbookArray, setTextBookArray] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getdata = async () => {
    try {
      setIsLoading(true);
      const textbookArray = [];
      let q;
      if (selectedDepartment === "すべて") {
        q = query(collection(db, "syuppinn"), orderBy("createdAt", "desc"), limit(8));
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
      setIsLoading(true);
      const textbookArray = [];
      let q;
      if (selectedDepartment === "すべて") {
        q = query(
          collection(db, "syuppinn"), 
          orderBy("createdAt", "desc"),  
          startAfter(lastDoc),  // lastDocからスタート
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
  
      setTextBookArray(prevArray => [...prevArray, ...textbookArray]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getdata();
  }, [selectedDepartment]);

  const scrollPosition= (e: any)=> {
    let offsetY = e.nativeEvent.contentOffset.y // スクロール距離
    let contentSizeHeight = e.nativeEvent.contentSize.height // scrollView contentSizeの高さ
    let scrollViewHeight = e.nativeEvent.layoutMeasurement.height // scrollViewの高さ

    if (offsetY + scrollViewHeight >= contentSizeHeight-40) {
      console.log('End Scroll')
      getNextData()
    }
  }

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 80 }}
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
      {!isLoading && textbookArray.length !== 0 ? (
        <ScrollView           onMomentumScrollEnd={e=>scrollPosition(e)}
         style={{ flex: 1 }}>
          <View style={styles.row}>
            {textbookArray.map((textbook, index) => (
              <TouchableOpacity onPress={()=>navigation.navigate("TextBookDetail",{...textbook})} key={index} style={styles.textbookContainer}>
                <Text>{textbook.productName}</Text>
                {/* <Text>{textbook.id}</Text> */}
                {textbook.images && textbook.images[0] && (
                  <Image
                    source={
                      textbook.images
                        ? { uri: textbook.images[0] }
                        : require("../../../image/Logo.png")
                    }
                    style={styles.image}
                  />
                )}
                <Text>¥{textbook.price}</Text>
                <Text>{textbook.description}</Text>
                {textbook.hasOwnProperty("buyUser")&&<View style={{position:"absolute",top:'50%',width:'100%',marginHorizontal:10}}>
                  <Text style={{textAlign:'center',width:'100%',color:'white',fontWeight:'800',borderRadius:7,transform:[{rotate:'25deg'}],backgroundColor:'red'}}>SOLD OUT</Text>
                </View>}
              </TouchableOpacity>
            ))}
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
    marginBottom: 10,
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
