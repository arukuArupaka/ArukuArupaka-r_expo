import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../../firebase';
import DepartmentSelectBotton from '../../../component/Textbook/departmentSelectBotton';

const departmentList = [
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
  { departmantName: "経済学部" },
  { departmantName: "スポーツ健康科学部" },
  { departmantName: "食マネージメント学部" },
  { departmantName: "生命科学部" },
  { departmantName: "薬学部" },
  { departmantName: "教養科目" },
];

export const TextbookHome = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("すべて");
  const [textbookArray, setTextBookArray] = useState([]);

  const getdata = async () => {
    const textbookArray = [];
    let q;
    {
      q = query(collection(db, "syuppinn"), where("department", "==", selectedDepartment));
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      textbookArray.push({ id: doc.id, ...doc.data() });
    });
    setTextBookArray(textbookArray);
  };

  useEffect(() => {
    getdata();
  }, [selectedDepartment]);

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {departmentList.map((department) => (
          <DepartmentSelectBotton 
            key={department.departmantName} 
            name={department.departmantName} 
            selectedDepartment={selectedDepartment} 
            onSelected={() => setSelectedDepartment(department.departmantName)} 
          />
        ))}
      </ScrollView>
      <ScrollView>
        {textbookArray.map((textbook, index) => (
          <View key={index} style={styles.textbookContainer}>
            <Text>{textbook.productName}</Text>
            {textbook.images && textbook.images[0] && (
              <Image source={{ uri: textbook.images[0] }} style={styles.image} />
            )}
            <Text>¥{textbook.price}</Text>
            <Text>{textbook.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textbookContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});
