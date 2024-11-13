import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  searchSection: {
    height: 40,
    borderRadius: 20,
    borderColor: 'gray',
    padding: 8,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: "80%",
    marginTop: 50
  },
  input: {
    borderRadius: 65,
    height: 40,
    margin: 10,
    width: "85%",
    padding: 10,
  },
  common: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  facilityname: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  update: {
    height: 35,
    width: 180,
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    marginLeft: 100,
    justifyContent: 'center',
  },
  box1: {
    flexDirection: 'row',
    height: 35,
    width: 300,
    paddingRight: 100,
  },
  box2: {
    height: 500,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d3d3d3",
    marginBottom: 80,
    alignItems: 'center',
  },
  box3: {
    borderTopWidth: 2,
    borderColor: "#d3d3d3",
    width: 260,
    height: 60,
    flexDirection: 'row',
    textAlign: 'center',
  },
  iconb: {
    marginTop: 15,
    color: 'blue',
  },
});

const CrowdRoom = () => {
  const [text, onChangeText] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [crowdInfo, setCrowdInfo] = useState([
    { room: "ぴあら", crowd: null }, // APIから取得予定   
  ]);

  // 現在時刻を取得する関数
  const updateCurrentTime = () => {
    const now = new Date();
    const formattedTime = `${now.getMonth() + 1}月${now.getDate()}日${now.getHours()}時${now.getMinutes()}分`;
    setCurrentTime(formattedTime);
  };

  // APIから「ぴあら」の混雑割合を取得
  const fetchCrowdData = async () => {
    try {
      const response = await axios.get('https://people-count-ngyx.onrender.com/counter/get-count/');
      const updatedCrowdInfo = crowdInfo.map(info =>
        info.room === "ぴあら" ? { ...info, crowd: `${response.data.current_count}人` } : info
      );
      setCrowdInfo(updatedCrowdInfo);
    } catch (error) {
      console.error('Failed to fetch count:', error);
    }
  };

  // コンポーネントの初期表示時に時刻とデータを更新
  useEffect(() => {
    updateCurrentTime();
    fetchCrowdData();
  }, []);

  // ボタンを押すと時刻とデータを更新
  const handleRefresh = () => {
    updateCurrentTime();
    fetchCrowdData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="なにかお探しですか？"
        />
        <TouchableOpacity>
          <Ionicons name='search' size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.box1}>
        <View style={styles.update}>
          <Text style={styles.common}>更新日時: {currentTime} </Text>
        </View>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name='sync-sharp' size={32} color={"#ee82ee"} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.box2}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`\n施設名　　　　　　　混雑割合\n`}</Text>
        
        {crowdInfo.filter(info => info.room === "ぴあら").map((info, index) => (
          <View key={index} style={styles.box3}>
            <Text style={styles.facilityname}>{`\n${info.room}`}</Text>
            <Text style={styles.percentage}>{`\n${info.crowd || "情報を取得中..."}\n`}</Text>
            <Ionicons name='person-sharp' size={35} style={styles.iconb} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CrowdRoom;