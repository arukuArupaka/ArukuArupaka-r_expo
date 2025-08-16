import { useState, useEffect, useLayoutEffect } from "react";
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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { supabase } from "../../lib/supabase";

export default function CleanLoginView() {
  const navigation = useNavigation<any>();
  const [nickname, setNickname] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("@ed.ritsumei.ac.jp");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBlack: require("../../../assets/fonts/ZenMaruGothic-Black.ttf"),
    ZenMaruGothicBold: require("../../../assets/fonts/ZenMaruGothic-Bold.ttf"),
  });
  // ① 画面表示時点で既にセッションがあれば即リダイレクト
  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted && session) {
        navigation.replace("CleanMainView");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigation]);

  // ② この画面でログインに成功した瞬間も自動で遷移（購読はこの画面だけ）
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) {
        navigation.replace("CleanMainView");
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigation]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFEFA" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFEFA",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: 12,
              right: 20,
              backgroundColor: "#D9D9D9",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "ZenMaruGothicBold",
                color: "#000",
              }}
            >
              戻る
            </Text>
          </TouchableOpacity>
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
                    {
                      label: "@ed.ritsumei.ac.jp",
                      value: "@ed.ritsumei.ac.jp",
                    },
                    {
                      label: "@st.ritsumei.ac.jp",
                      value: "@st.ritsumei.ac.jp",
                    },
                    { label: "@creotech.co.jp", value: "@creotech.co.jp" },
                  ]}
                  style={{
                    inputIOS: {
                      fontSize: 14,
                      fontFamily: "ZenMaruGothicBold",
                      color: "#444",
                      backgroundColor: "#D9D9D9",
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 6,
                    },
                    inputAndroid: {
                      fontSize: 14,
                      fontFamily: "ZenMaruGothicBold",
                      color: "#444",
                      backgroundColor: "#D9D9D9",
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
              backgroundColor: "#FF7A7A",
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 10,
            }}
            onPress={async () => {
              const email = emailLocal + emailDomain;

              const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                  data: {
                    nickname: nickname, // ユーザーのメタデータとして保存
                  },
                },
              });

              if (error) {
                alert("登録に失敗しました: " + error.message);
                return;
              }

              alert(
                "確認メールを送りました。メール内のリンクを開いたあと、ログインしてください。"
              );
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "ZenMaruGothicBold",
                color: "#fff",
              }}
            >
              アカウント作成
            </Text>
          </TouchableOpacity>
          {/* 追加：ログインボタン（メール確認後はこちらを押す） */}
          <TouchableOpacity
            style={{
              marginTop: 50,
              backgroundColor: "#D9D9D9",
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 10,
            }}
            onPress={async () => {
              const email = emailLocal + emailDomain;
              const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              if (error) {
                // 代表的なケース：Email not confirmed / Invalid login credentials
                alert("ログインに失敗しました: " + error.message);
                return;
              }
              // 成功するとこの画面の onAuthStateChange/useEffect でも検知されますが、
              // 明示的に置き換えておくと確実です
              navigation.replace("CleanMainView");
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "ZenMaruGothicBold",
              }}
            >
              ログイン
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
