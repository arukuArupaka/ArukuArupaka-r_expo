import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons, FontAwesome, } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CleanHowToSample = require('../../../assets/CleanHowToSample.png');//これって勝手に写真追加して大丈夫でしたか？
/*正直全ての機種に合うようにはなっていないかもです…*/
const CleanHowToView = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* タイトル・説明 */}
      <View style={styles.content}>
        <Text style={styles.title}>学生のみんなで{"\n"}大学をもっとキレイにしよう！</Text>
        <Text style={styles.description}>
          キャンパス内で「ゴミが落ちてる…」「汚れてる…」{"\n"}という場所を見つけたら{"\n"}
          アプリ上の地図にピンを立てて、{"\n"}コメントと一緒に投稿できる機能です🧹{"\n"}{"\n"}{"\n"}📍使い方はとってもカンタン！
        </Text>
        {/* 使い方 */}
        <Text style={styles.usageStep}>1. 汚れている場所を見つける</Text>
        <Text style={styles.usageStep}>2. 地図上にピンを立てる</Text>
        <Text style={styles.usageStep}>3. コメントを添えて投稿！</Text>
        {/* 地図イメージ＋説明 */}
        <View style={styles.mapContainer}>
          <Image 
            source={CleanHowToSample}
            style={styles.mapImage}
            resizeMode="contain"
          />
          <FontAwesome 
            name="hand-o-left" 
            size={20} 
            color='black' 
            style={styles.handIcon}
          />
          <View style={styles.tapTextBox}>
            <Text style={styles.tapText}>タップで{"\n"}ピンを立てよう！</Text>
          </View>
        </View>
        {/* 補足文 */}
        <Text style={styles.additionalText}>投稿してくれた人にはご褒美があるかも…</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  description: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  usageStep: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    marginLeft:60,
    alignSelf:'flex-start'
  },
  mapContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
    marginLeft: 5,
  },
  mapImage: {
    width: 240,
    height: 150,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  handIcon: {
    position: 'absolute',
    right:'35%',
    top: '40%'
},
  tapTextBox:{
    position: 'absolute',
    right:'5%',
    top: '40%'

},
  tapText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  additionalText: {
    color: '#949494',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 25,
    marginRight:10,
    alignSelf:'flex-end'}
});

export default CleanHowToView;
