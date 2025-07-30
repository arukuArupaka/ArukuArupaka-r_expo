import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

const buildings = [
  { name: "アクトα", reading: "あくと" },
  { name: "アクトμ", reading: "あくと" },
  { name: "アクトβ", reading: "あくと" },
  { name: "アクトσ", reading: "あくと" },
  { name: "アクロスウィング", reading: "あくろす" },
  { name: "アスリートジム", reading: "あすりーと" },
  { name: "アドセミナリオ", reading: "あどせみなりお" },
  { name: "イーストウイング", reading: "いーすと" },
  { name: "ウエストウイング", reading: "うえすと" },
  { name: "エクセル1", reading: "えくせる" },
  { name: "エクセル2", reading: "えくせる" },
  { name: "エクセル3", reading: "えくせる" },
  { name: "エポック立命21", reading: "えぽっく" },
  {
    name: "学術フロンティア共同研究センター",
    reading: "がくじゅつふろんてぃあ",
  },
  { name: "シー・キューブ", reading: "しーきゅーぶ" },
  { name: "キャノピー", reading: "きゃのぴー" },
  { name: "クリエーションコア", reading: "くりえーしょんこあ" },
  { name: "コアステーション", reading: "こあすてーしょん" },
  { name: "コラーニングハウスI", reading: "こらーにんぐ" },
  { name: "コラーニングハウスII", reading: "こらーにんぐ" },
  { name: "サイエンスコア", reading: "さいえんすこあ" },
  { name: "セセル", reading: "せせる" },
  { name: "セントラルアーク", reading: "せんとらるあーく" },
  { name: "テクノコンプレクス", reading: "てくのこんぷれくす" },
  {
    name: "イントラフォトンリサーチセンター",
    reading: "いんとらふぉとんりさーちせんたー",
  },
  { name: "BKCジム", reading: "BKCじむ" },
  { name: "フォレストハウス", reading: "ふぉれすと" },
  { name: "プリズムハウス", reading: "ぷりずむ" },
  {
    name: "防災システムリサーチセンター",
    reading: "ぼうさいしすてむりさーちせんたー",
  },
  { name: "メディアセンター", reading: "めでぃあせんたー" },
  { name: "ユニオンスクエア", reading: "ゆにおんすくえあ" },
  {
    name: "立命館大学BKCインキュベータ",
    reading: "りつめいかんだいがくBKCいんきゅべーた",
  },
  { name: "命館大学ローム記念館", reading: "めいかんだいがくろーむきねんかん" },
  { name: "リンクスクエア", reading: "りんくすくえあ" },
  { name: "BKCスポーツ健康コモンズ", reading: "BKCすぽーつけんこうこもんず" },
  {
    name: "立命館先端クロスバースイノベーションコモンズ",
    reading: "りつめいかんせんたんくろすばーすいのべーしょんこもんず",
  },
  {
    name: "グラスルーツイノベーションセンター",
    reading: "ぐらするーついのべーしょんせんたー",
  },
  { name: "バイオフロンティア", reading: "ばいおふろんてぃあ" },
  { name: "その他", reading: "そのた" },
];

export default function PostScreen() {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleBuildingInput = (text) => {
    setSelectedBuilding(text);

    if (text.trim() === "") {
      setShowSuggestions(false);
      setFilteredBuildings([]);
      return;
    }
    // 入力をカタカナに変換
    const katakanaText = toKatakana(text);
    const filtered = buildings.filter(
      (bld) => bld.reading.includes(text) || bld.reading.includes(katakanaText)
    );
    // 「その他」を候補の最後に追加（既に含まれていなければ）
    if (!filtered.some((bld) => bld.name === "その他")) {
      filtered.push({ name: "その他", reading: "その他" });
    }
    setFilteredBuildings(filtered);
    setShowSuggestions(true);
  };
  const toKatakana = (str) => {
    return str.replace(/[\u3041-\u3096]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) + 0x60)
    );
  };
  const [locationDetail, setLocationDetail] = useState("");
  const [comment, setComment] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [isRequestingCleaning, setIsRequestingCleaning] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      a{" "}
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          keyboardShouldPersistTaps="always"
        >
          <Text
            style={{
              fontSize: 32,
              fontFamily: "ZenMaruGothicBlack",
              textAlign: "center",
              marginBottom: 20,
              color: "#4C4C4C",
            }}
          >
            投稿
          </Text>

          {/* 建物 */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "ZenMaruGothicBold",
              marginBottom: 6,
              color: "#4C4C4C",
            }}
          >
            建物
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#B6B6B6",
              borderRadius: 6,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 16,
            }}
          >
            <FontAwesome6
              name="magnifying-glass"
              size={16}
              color="#999"
              style={{ marginRight: 6 }}
            />
            <TextInput
              placeholder="建物を選択..."
              value={selectedBuilding}
              onChangeText={handleBuildingInput}
              onFocus={() => {
                if (selectedBuilding !== "") setShowSuggestions(true);
              }}
              style={{ flex: 1, fontSize: 14 }}
            />
          </View>
          {showSuggestions && filteredBuildings.length > 0 && (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
                marginBottom: 16,
                backgroundColor: "white",
                overflow: "visible",
                position: "absolute",
                top: 150,
                left: 20,
                right: 20,
                zIndex: 10,
              }}
            >
              <ScrollView
                style={{ maxHeight: 150 }}
                keyboardShouldPersistTaps="handled"
              >
                {filteredBuildings.map((building, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedBuilding(building.name);
                      setShowSuggestions(false);
                    }}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderBottomWidth:
                        index !== filteredBuildings.length - 1 ? 1 : 0,
                      borderColor: "#eee",
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>{building.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* 場所 */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "ZenMaruGothicBold",
              marginBottom: 6,
              color: "#4C4C4C",
            }}
          >
            場所
          </Text>
          <TextInput
            placeholder="例：一階の男子トイレ、103号室の床"
            value={locationDetail}
            onChangeText={setLocationDetail}
            style={{
              borderWidth: 1,
              borderColor: "#B6B6B6",
              borderRadius: 6,
              padding: 10,
              fontSize: 14,
              marginBottom: 16,
            }}
          />

          {/* コメント */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "ZenMaruGothicBold",
              marginBottom: 6,
              color: "#4C4C4C",
            }}
          >
            コメント
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder={`例：廊下を綺麗にして欲しい\n例：ペットボトル拾いました`}
            value={comment}
            onChangeText={setComment}
            style={{
              borderWidth: 1,
              borderColor: "#B6B6B6",
              borderRadius: 6,
              padding: 10,
              height: 100,
              fontSize: 14,
              marginBottom: 16,
              textAlignVertical: "top",
            }}
          />

          {/* 写真 */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "ZenMaruGothicBold",
              marginBottom: 6,
              color: "#4C4C4C",
            }}
          >
            写真
          </Text>
          <TouchableOpacity
            onPress={() => {
              // ここで写真添付処理を追加
            }}
            style={{
              height: 150,
              borderWidth: 1,
              borderColor: "#B6B6B6",
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{ width: "100%", height: "100%", borderRadius: 6 }}
              />
            ) : (
              <FontAwesome6 name="camera" size={45} color="black" />
            )}
          </TouchableOpacity>

          {/* チェックボックス */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "ZenMaruGothicBold",
                marginRight: 8,
              }}
            >
              掃除を依頼する
            </Text>
            <TouchableOpacity
              onPress={() => setIsRequestingCleaning(!isRequestingCleaning)}
            >
              <FontAwesome5
                name={isRequestingCleaning ? "check-square" : "square"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* 投稿ボタン */}
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#FF7A7A",
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 4,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "ZenMaruGothicBold",
              }}
            >
              投稿
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
