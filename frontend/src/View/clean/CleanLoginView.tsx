import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function SignupScreen() {
  const navigation = useNavigation();
  1;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFEFA" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFEFA",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require("../../../assets/arupaka_clean.png")}
          style={{
            width: 200,
            height: 200,
            marginTop: 20,
            marginBottom: 10,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: "ZenMaruGothicBold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          みんなでキャンパス内を{"\n"}綺麗にしよう！
        </Text>

        {/* フォーム */}
        <View style={{ width: "100%" }}>
          {/* ニックネーム */}
          <Text
            style={{
              fontSize: 14,
              fontFamily: "ZenMaruGothicBold",
              marginBottom: 6,
            }}
          >
            ニックネーム
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 16,
              fontSize: 14,
              backgroundColor: "#fff",
            }}
          />

          {/* メールアドレス */}
          <Text
            style={{
              fontSize: 14,
              fontFamily: "ZenMaruGothicBold",
              marginBottom: 6,
            }}
          >
            メールアドレス
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 4,
                paddingHorizontal: 10,
                paddingVertical: 8,
                flex: 1,
                fontSize: 14,
                backgroundColor: "#fff",
              }}
            />
            <View
              style={{
                backgroundColor: "#eee",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 6,
                marginLeft: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "ZenMaruGothicBold",
                  color: "#444",
                }}
              >
                @ed.ritsumei.ac.jp ⌄
              </Text>
            </View>
          </View>

          {/* パスワード */}
          <Text
            style={{
              fontSize: 14,
              fontFamily: "ZenMaruGothicBold",
              marginBottom: 6,
            }}
          >
            パスワード
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginBottom: 24,
              fontSize: 14,
              backgroundColor: "#fff",
            }}
            secureTextEntry
          />
        </View>

        {/* アカウント作成ボタン */}
        <TouchableOpacity
          style={{
            backgroundColor: "#ddd",
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("CleanMainView")} // Navigate to CleanMainView
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "ZenMaruGothicBold",
            }}
          >
            アカウント作成
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
