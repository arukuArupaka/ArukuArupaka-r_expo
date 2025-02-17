import React from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PortalItem from "../component/PortalAccess/PortalItem";
import SelectItem from "../component/PortalAccess/SelectItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortalAccess = () => {
  const linklist = [
    {
      //   logoMark: 'https://th.bing.com/th?id=OIP.8Zyd4GpsM1tYW9vz1ELH8AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      name: "manaba+R 未提出レポート",
      webnavigate: "https://ct.ritsumei.ac.jp/ct/home_summary_report",
      category: ["学びサポート", "学生生活"],
      herf: "manaba, 学びサポート, オンライン学習, コース管理, 課題提出, 学習プラットフォーム, eラーニング, 教育ツール, 学習管理, 学生ポータル, 授業資料, 学習サポート, 課題管理, テスト, 学生連絡, コース内容, 学習進捗, 学生アシスタンス, 教育支援",
      id: "11",
    },
    {
      logoMark: "https://www.ritsumei.ac.jp/image.jsp?id=228380",
      name: "立命館大学図書館",
      webnavigate: "https://www.ritsumei.ac.jp/lib/",
      category: ["学内施設"],
      herf: "図書館, 学内施設, 本, 勉強, リサーチ, 読書, 学術資料, 文献, 資料検索, 図書館利用, 学生サポート, 研究, レファレンス, 自習室, 静かな場所, 学術書, 蔵書, 図書館サービス",
      id: "2",
    },
    {
      logoMark:
        "https://th.bing.com/th?id=OIP.8Zyd4GpsM1tYW9vz1ELH8AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      name: "manaba+R",
      webnavigate: "https://ct.ritsumei.ac.jp/ct/home",
      category: ["学びサポート"],
      herf: "manaba, 学びサポート, オンライン学習, コース管理, 課題提出, 学習プラットフォーム, eラーニング, 教育ツール, 学習管理, 学生ポータル, 授業資料, 学習サポート, 課題管理, テスト, 学生連絡, コース内容, 学習進捗, 学生アシスタンス, 教育支援",
      id: "9",
    },
    {
      name: "食堂メニュー",
      webnavigate: "https://west2-univ.jp/sp/ritsmei.php",
      category: ["学生生活", "フード"],
      herf: "食堂, メニュー, 学生生活, 食事, ランチ, 夕食, 学食, フード, キャンパスランチ, カフェテリア, レストラン, 学食メニュー, 食事の選択肢, 料理, 健康食, 食事の場所, 栄養, バランスの取れた食事, 学生食堂, 食事サービス",
      id: "10",
    },
    {
      logoMark: "https://www.ritsumei.ac.jp/image.jsp?id=228380",
      name: "キャンパス間バス",
      webnavigate: "https://www.ritsumei.ac.jp/infostudents/shuttlebus/",
      category: ["学内施設", "学生生活"],
      herf: "シャトルバス, キャンパス間バス, 学内施設, 学生生活, 交通, 通学, バス利用, 移動, 便利, バススケジュール, 交通手段, 学生交通, 通学手段, シャトルサービス, 交通案内, キャンパス間移動, バス停, 交通サポート, 通学支援",
      id: "8",
    },
    {
      logoMark: "https://www.ritsumei.ac.jp/image.jsp?id=228380",
      name: "立命館大学図書館（施設予約）",
      webnavigate: "https://runners.ritsumei.ac.jp/opac/rsv/?lang=0",
      category: ["学内施設"],
      herf: "図書館, 施設予約, 学内施設, 勉強スペース, 予約, 学習環境, 施設利用, 図書館予約, スペース確保, 研究室, 会議室, 自習スペース, 読書スペース, 図書館機能, 利用予約, 学生利用, 図書館システム",
      id: "3",
    },
    {
      logoMark: "https://www.ritsumei.ac.jp/image.jsp?id=228380",
      name: "ジム",
      webnavigate:
        "https://www.ritsumei.ac.jp/lifecareer/activity/facility/gym/bkc/",
      category: ["学内施設"],
      herf: "体育館, ジム, 学内施設, 運動, フィットネス, トレーニング, スポーツ, エクササイズ, 体力作り, 健康, ワークアウト, スポーツ施設, フィットネスセンター, ジム利用, スポーツサポート, 運動機器, 体育活動, 学生運動, スポーツクラブ",
      id: "7",
    },
    {
      logoMark: "https://www.ritsumei.ac.jp/image.jsp?id=228380",
      name: "2024年度 立命館大学 学年暦 学部",
      webnavigate: "https://www.ritsumei.ac.jp/file.jsp?id=603970&f=.pdf",
      category: ["学びサポート"],
      herf: "学年暦, 学部, 学び, 年度計画, スケジュール, 学生カレンダー, 学期, 授業期間, 休暇期間, 試験日程, 学内行事, 学習計画, 時間割, 大学生活, 学生スケジュール, アカデミックカレンダー, 授業スケジュール, 学生行事, 大学カレンダー",
      id: "4",
    },
    {
      name: "立命館サークルコレクション",
      webnavigate: "https://college.ritsumei.club/circle/",
      category: ["学生生活"],
      herf: "サークル, 学生生活, クラブ活動, コミュニティ, 趣味, 学生団体, サークル活動, 学生クラブ, 社交, 趣味活動, グループ活動, 学生ネットワーク, サークル参加, イベント, 学生活動, ボランティア, 文化活動, サークル紹介, 学生交流",
      id: "5",
    },
    {
      name: "SPORTS&CULTURE",
      webnavigate: "https://www.ritsumei.ac.jp/sports-culture/all/group/",
      category: ["学生生活"],
      herf: "スポーツ, 文化, 学生生活, クラブ, アクティビティ, 体育, 芸術, 文化活動, スポーツクラブ, 文化クラブ, 学生アクティビティ, 競技, トレーニング, 部活動, 体育施設, 文化施設, 学生イベント, 健康, フィットネス, スポーツ大会",
      id: "6",
    },
    {
      logoMark:
        "https://th.bing.com/th?id=ODLS.d7e6cdc6-a6e4-4e1c-85b1-c1e826e9975b&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2",
      name: "English Expedition",
      webnavigate: "https://www.ee.ritsumei.ac.jp/index.html",
      category: ["学びサポート", "留学"],
      herf: "英語, 留学, 学び, 英語学習, 海外, 言語学習, 英語スキル, 英会話, 英語教材, 海外留学, 語学, TOEFL, IELTS, 留学準備, 英語サポート, 英語教育, 英語能力, 英語力向上",
      id: "1",
    },
    //これ
    {
      logoMark: "https://www.ritsumei.ac.jp/image.jsp?id=228380",
      name: "出席カード",
      webnavigate: "https://ctat.ritsumei.ac.jp/attend/ctat?lang=ja",
      category: ["学びサポート", "学生生活"],
      herf: "出席カード, 出席管理, 学生, 授業出席, 出席確認, チェックイン, 学生生活, 登校, 大学システム, 教室出席, 講義参加, 自動出席, 時間管理, 出席記録, クラスルーム, キャンパスライフ, 学びサポート, 出席通知",
      id: "1",
    },
    {
      logoMark: "https://illustration-free.net/thumb/svg/ifn0891.svg",
      name: "JR遅延証明",
      webnavigate: "https://delay.trafficinfo.westjr.co.jp/pc",
      category: ["学生生活"],
      herf: "電車, 遅延, jr",
      id: "100",
    },
    {
      logoMark: "https://illustration-free.net/thumb/svg/ifn0891.svg",
      name: "阪急遅延証明",
      webnavigate: "https://www.hankyu.co.jp/delay/index.html",
      category: ["学生生活"],
      herf: "電車, 遅延, 阪急",
      id: "100",
    },
  ];
  const limitItem = [
    { name: "すべて" },
    { name: "学びサポート" },
    { name: "学生生活" },
    { name: "学内施設" },
    { name: "フード" },
    { name: "留学" },
    { name: "研究室" },
  ];

  const [text, onChangeText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("すべて");
  const [lockedItems, setLockedItems] = React.useState([]);

  React.useEffect(() => {
    const loadLockedItems = async () => {
      try {
        const lockedItemsJson = await AsyncStorage.getItem("lockedItems");
        if (lockedItemsJson) {
          setLockedItems(JSON.parse(lockedItemsJson));
        }
      } catch (error) {
        console.error("Failed to load locked items from AsyncStorage:", error);
      }
    };
    loadLockedItems();
  }, []);

  React.useEffect(() => {
    const saveLockedItems = async () => {
      try {
        await AsyncStorage.setItem("lockedItems", JSON.stringify(lockedItems));
      } catch (error) {
        console.error("Failed to save locked items to AsyncStorage:", error);
      }
    };
    saveLockedItems();
  }, [lockedItems]);

  const handleLockToggle = (id) => {
    setLockedItems((prev) => {
      const newLockedItems = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [id, ...prev];
      return newLockedItems;
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchSection: {
      height: 40,
      borderRadius: 20,
      borderColor: "gray",
      padding: 8,
      backgroundColor: "#eeeeee",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      width: "80%",
      marginTop: 50,
    },
    input: {
      borderRadius: 65,
      height: 40,
      margin: 10,
      width: "85%",
      padding: 10,
    },
  });

  const filteredLinks = linklist.filter(
    (item) =>
      (selectedCategory === "すべて" ||
        item.category.includes(selectedCategory)) &&
      (item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.herf.toLowerCase().includes(text.toLowerCase()))
  );

  const sortedLinks = [
    ...lockedItems.map((id) => linklist.find((item) => item.id === id)),
    ...filteredLinks.filter((item) => !lockedItems.includes(item.id)),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="なにかお探しですか？"
          />
          <TouchableOpacity>
            <Ionicons name="search" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 20 }} />
      <View style={{ height: 40 }}>
        <ScrollView horizontal={true} style={{ width: "100%" }}>
          {limitItem.map((item, index) => (
            <SelectItem
              key={index}
              name={item.name}
              onPress={() => setSelectedCategory(item.name)}
              isSelected={selectedCategory === item.name}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView style={{ borderBottomWidth: 1 }}>
        {sortedLinks.map((item, index) => (
          <PortalItem
            id={item.id}
            key={index}
            name={item.name}
            logoMark={item.logoMark}
            webnavigate={item.webnavigate}
            category={item.category}
            onLock={() => handleLockToggle(item.id)}
            locksite={lockedItems.includes(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PortalAccess;
