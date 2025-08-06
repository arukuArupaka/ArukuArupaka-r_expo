import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
// import { supabase } from "../../lib/supabase";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("@ed.ritsumei.ac.jp");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBlack: require("../../../assets/fonts/ZenMaruGothic-Black.ttf"),
    ZenMaruGothicBold: require("../../../assets/fonts/ZenMaruGothic-Bold.ttf"),
  });
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
            value={nickname}
            onChangeText={setNickname}
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
              value={emailLocal}
              onChangeText={setEmailLocal}
              style={{
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 4,
                paddingHorizontal: 10,
                paddingVertical: 8,
                fontSize: 14,
                width: "60%",
                backgroundColor: "#fff",
              }}
            />
            <View
              style={{
                marginLeft: 10,
                width: "40%",
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => setEmailDomain(value)}
                value={emailDomain}
                items={[
                  { label: "@ed.ritsumei.ac.jp", value: "@ed.ritsumei.ac.jp" },
                  { label: "@st.ritsumei.ac.jp", value: "@st.ritsumei.ac.jp" },
                  { label: "@creotech.co.jp", value: "@creotech.co.jp" },
                ]}
                style={{
                  inputIOS: {
                    fontSize: 14,
                    fontFamily: "ZenMaruGothicBold",
                    color: "#444",
                    backgroundColor: "#eee",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 6,
                  },
                  inputAndroid: {
                    fontSize: 14,
                    fontFamily: "ZenMaruGothicBold",
                    color: "#444",
                    backgroundColor: "#eee",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 6,
                  },
                }}
                Icon={() => (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#444",
                      paddingVertical: 9,
                      width: 150,
                      textAlign: "right",
                      paddingRight: 5,
                      fontFamily: "ZenMaruGothicBold",
                    }}
                  >
                    ⌄
                  </Text>
                )}
              />
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry
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
          //   onPress={async () => {
          //     const email = emailLocal + emailDomain;

          //     const { data, error } = await supabase.auth.signUp({
          //       email: email,
          //       password: password,
          //       options: {
          //         data: {
          //           nickname: nickname, // ユーザーのメタデータとして保存
          //         },
          //       },
          //     });

          //     if (error) {
          //       alert("登録に失敗しました: " + error.message);
          //       return;
          //     }

          //     alert("登録完了しました！");
          //     navigation.navigate("CleanMainView");
          //   }}
          onPress={() => navigation.navigate("CleanMainView")}
        >
          <Text style={{ fontSize: 16, fontFamily: "ZenMaruGothicBold" }}>
            アカウント作成
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
