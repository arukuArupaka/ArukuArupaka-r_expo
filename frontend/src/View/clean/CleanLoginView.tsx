import * as Notifications from "expo-notifications";
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Checkbox from "expo-checkbox";
import { supabase } from "./lib/supabase";

export default function CleanLoginView() {
  const navigation = useNavigation<any>();
  const [nickname, setNickname] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("@ed.ritsumei.ac.jp");
  const emailDomainItems = [
    { label: "@ed.ritsumei.ac.jp", value: "@ed.ritsumei.ac.jp" },
    { label: "@st.ritsumei.ac.jp", value: "@st.ritsumei.ac.jp" },
    { label: "@creotech.co.jp", value: "@creotech.co.jp" },
    // { label: "@gmail.com", value: "@gmail.com" },
    // 追加ドメイン（必要に応じて増減してください）
    // { label: "@icloud.com ", value: "@icloud.com" },
  ];
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // 生協連携用 state
  const [coopMode, setCoopMode] = useState(false); // 生協と連携するか
  const [realName, setRealName] = useState("");
  const [birthDate, setBirthDate] = useState(""); // YYYY-MM-DD 形式想定
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [coopMemberNumber, setCoopMemberNumber] = useState("");
  const [coopConsent, setCoopConsent] = useState(false); // 情報提供承諾
  const [fontsLoaded] = useFonts({
    ZenMaruGothicBlack: require("../../../assets/fonts/ZenMaruGothic-Black.ttf"),
    ZenMaruGothicBold: require("../../../assets/fonts/ZenMaruGothic-Bold.ttf"),
  });
  // 端末のプッシュトークンを取得してSupabaseに保存
  const saveDeviceToken = React.useCallback(async () => {
    // 通知権限
    const { status: cur } = await Notifications.getPermissionsAsync();
    let status = cur;
    if (status !== "granted") {
      const req = await Notifications.requestPermissionsAsync();
      status = req.status;
    }
    if (status !== "granted") {
      console.log("Push permission not granted");
      return;
    }

    try {
      // Expoのプッシュトークン（ExponentPushToken[...]）
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      // ログイン中ユーザーを取得
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // 自分の行を更新（auth_id の列名はあなたの設計に合わせて）
      const { error } = await supabase
        .from("users")
        .update({ device_id: token })
        .eq("id", user.id);

      if (error) {
        console.log("Failed to save device token:", error);
      } else {
        console.log("Saved device token:", token);
      }
    } catch (e) {
      console.log("Push token error:", e);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted && session) {
        await saveDeviceToken();
        navigation.replace("CleanMainView");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigation, saveDeviceToken]);

  // 生年月日バリデーション (YYYY-MM-DD かつ実在日)
  const validateBirthDate = (value: string) => {
    if (!value) {
      setBirthDateError("必須です");
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setBirthDateError("YYYY-MM-DD 形式で入力してください");
      return false;
    }
    const [y, m, d] = value.split("-").map(Number);
    const date = new Date(value + "T00:00:00Z");
    if (
      date.getUTCFullYear() !== y ||
      date.getUTCMonth() + 1 !== m ||
      date.getUTCDate() !== d
    ) {
      setBirthDateError("存在しない日付です");
      return false;
    }
    // 年齢チェック (0~120歳程度)
    const nowY = new Date().getUTCFullYear();
    if (y < nowY - 120 || y > nowY) {
      setBirthDateError("年が不正です");
      return false;
    }
    setBirthDateError(null);
    return true;
  };

  // パスワードバリデーション（6文字以上かつ英数小文字のみ）
  const validatePassword = (value: string) => {
    if (!value || value.length < 6) {
      setPasswordError("6文字以上で入力してください");
      return false;
    }
    if (!/^[a-z0-9]+$/.test(value)) {
      setPasswordError("英数字の小文字のみで入力してください");
      return false;
    }
    setPasswordError(null);
    return true;
  };
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) {
        (async () => {
          await saveDeviceToken();
          navigation.replace("CleanMainView");
        })();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigation, saveDeviceToken]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFEFA" }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: "#FFFEFA" }}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: 20,
              paddingBottom: 40,
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
                marginBottom: 5,
                paddingHorizontal: 8,
                lineHeight: 26,
              }}
            >
              みんなでキャンパスを
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "ZenMaruGothicBold",
                textAlign: "center",
                marginBottom: 30,
                paddingHorizontal: 8,
                lineHeight: 26,
              }}
            >
              綺麗にしよう！
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
                  onChangeText={(text) => {
                    // 小文字英数字と記号（@、.、-、_）のみ許可
                    const filteredText = text.replace(/[^a-z0-9@.\-_]/g, "");
                    setEmailLocal(filteredText);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
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
                    items={emailDomainItems}
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
                onChangeText={(v) => {
                  setPassword(v);
                  if (passwordError) validatePassword(v);
                }}
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
                onBlur={() => validatePassword(password)}
              />
              {passwordError && (
                <Text
                  style={{
                    color: "#C00",
                    fontSize: 11,
                    marginTop: -18,
                    marginBottom: 24,
                    fontFamily: "ZenMaruGothicBold",
                  }}
                >
                  {passwordError}
                </Text>
              )}

              {/* 生協と連携 ボタン */}
              <TouchableOpacity
                onPress={() => setCoopMode((p) => !p)}
                style={{
                  backgroundColor: coopMode ? "#03A87C" : "#D9D9D9",
                  paddingVertical: 12,
                  borderRadius: 10,
                  marginBottom: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "ZenMaruGothicBold",
                    color: coopMode ? "#fff" : "#000",
                  }}
                >
                  {coopMode
                    ? "生協連携をやめる"
                    : "生協と連携して報酬を受け取る"}
                </Text>
              </TouchableOpacity>

              {coopMode && (
                <View style={{ marginBottom: 20 }}>
                  {/* 氏名 */}
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "ZenMaruGothicBold",
                      marginBottom: 6,
                    }}
                  >
                    氏名（本名）
                  </Text>
                  <TextInput
                    value={realName}
                    onChangeText={setRealName}
                    style={{
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      marginBottom: 14,
                      fontSize: 14,
                      backgroundColor: "#fff",
                    }}
                    placeholder="山田 太郎"
                  />
                  {/* 生年月日 */}
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "ZenMaruGothicBold",
                      marginBottom: 6,
                    }}
                  >
                    生年月日（YYYY-MM-DD）
                  </Text>
                  <TextInput
                    value={birthDate}
                    onChangeText={(v) => {
                      setBirthDate(v);
                      if (birthDateError) validateBirthDate(v); // 修正中も即時再検証
                    }}
                    keyboardType="numbers-and-punctuation"
                    placeholder="2003-04-01"
                    style={{
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      marginBottom: 14,
                      fontSize: 14,
                      backgroundColor: "#fff",
                    }}
                    onBlur={() => validateBirthDate(birthDate)}
                  />
                  {birthDateError && (
                    <Text
                      style={{
                        color: "#C00",
                        fontSize: 11,
                        marginTop: -10,
                        marginBottom: 12,
                        fontFamily: "ZenMaruGothicBold",
                      }}
                    >
                      {birthDateError}
                    </Text>
                  )}
                  {/* 生協会員番号 */}
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "ZenMaruGothicBold",
                      marginBottom: 6,
                    }}
                  >
                    生協会員番号
                  </Text>
                  <TextInput
                    value={coopMemberNumber}
                    onChangeText={setCoopMemberNumber}
                    keyboardType="number-pad"
                    placeholder="（学籍番号ではありません）"
                    style={{
                      borderWidth: 1,
                      borderColor: "#000",
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      marginBottom: 6,
                      fontSize: 14,
                      backgroundColor: "#fff",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#444",
                      marginBottom: 12,
                      fontFamily: "ZenMaruGothicBold",
                    }}
                  >
                    ※学籍番号ではありません。生協の会員カードに記載の番号を入力してください。
                  </Text>
                  {/* 承諾チェック */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <Checkbox
                      value={coopConsent}
                      onValueChange={setCoopConsent}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 12,
                        fontFamily: "ZenMaruGothicBold",
                        lineHeight: 18,
                      }}
                    >
                      インセンティブ付与のため、入力した個人情報を生協と共有することに同意します。
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
              {/* アカウント作成（プライマリ） */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor:
                    coopMode &&
                    (!realName ||
                      !birthDate ||
                      !coopMemberNumber ||
                      !coopConsent)
                      ? "#FFB2B2"
                      : "#FF7A7A",
                  paddingVertical: 14,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={
                  (coopMode &&
                    (!realName ||
                      !birthDate ||
                      !coopMemberNumber ||
                      !coopConsent ||
                      birthDateError !== null)) ||
                  passwordError !== null ||
                  false
                }
                onPress={async () => {
                  const email = emailLocal + emailDomain;
                  // パスワード最終チェック
                  if (!validatePassword(password)) {
                    alert(passwordError || "パスワードを確認してください");
                    return;
                  }
                  if (coopMode) {
                    const ok = validateBirthDate(birthDate);
                    if (
                      !realName ||
                      !birthDate ||
                      !coopMemberNumber ||
                      !coopConsent ||
                      !ok
                    ) {
                      alert(
                        birthDateError
                          ? `生協連携に必要な項目を確認してください\n(${birthDateError})`
                          : "生協連携に必要な項目を入力し、同意にチェックしてください。"
                      );
                      return;
                    }
                  }
                  const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                      data: {
                        nickname,
                        ...(coopMode
                          ? {
                              real_name: realName,
                              birth_date: birthDate,
                              coop_member_number: coopMemberNumber,
                              coop_consent: coopConsent,
                            }
                          : {}),
                      },
                    },
                  });
                  if (error) {
                    alert("登録に失敗しました: " + error.message);
                    return;
                  }
                  // user テーブルへも保存 / 行が無ければ挿入
                  try {
                    if (coopMode && data.user) {
                      const payload = {
                        id: data.user.id, // users.id = auth.users.id
                        real_name: realName,
                        birth_date: birthDate || null,
                        coop_member_number: coopMemberNumber,
                        coop_consent: coopConsent,
                        updated_at: new Date().toISOString(),
                      };
                      console.log("coop upsert payload", payload);
                      const { error: upsertError } = await supabase
                        .from("users")
                        .upsert(payload, { onConflict: "id" });
                      if (upsertError) {
                        console.log(
                          "userテーブルupsert失敗",
                          upsertError.message
                        );
                        alert("メールを送信しました確認してください");
                        return; // 生協情報失敗時は成功アラート出さない
                      }
                      console.log("coop info upsert success");
                    }
                  } catch (e) {
                    console.log("userテーブルupsert例外", e);
                    alert(
                      "アカウントは作成しましたが、生協情報保存で例外が発生しました。ログを確認してください。"
                    );
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

              {/* ログイン（セカンダリ） */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#D9D9D9",
                  borderColor: "#000",
                  paddingVertical: 14,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={async () => {
                  try {
                    const email = emailLocal + emailDomain;
                    // パスワードチェック（ログイン時も同一ポリシーを案内）
                    if (!validatePassword(password)) {
                      alert(passwordError || "パスワードを確認してください");
                      return;
                    }
                    const { data, error } =
                      await supabase.auth.signInWithPassword({
                        email,
                        password,
                      });
                    if (error) {
                      alert("ログインに失敗しました: " + error.message);
                      return;
                    }
                    navigation.replace("CleanMainView");
                  } catch (error: any) {
                    alert("ログインに失敗しました: " + error.message);
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "ZenMaruGothicBold",
                    color: "#000",
                  }}
                >
                  ログイン
                </Text>
              </TouchableOpacity>
            </View>

            {/* 確認メール再送信 */}
            <TouchableOpacity
              onPress={async () => {
                if (!emailLocal) {
                  alert("メールアドレスを入力してください");
                  return;
                }
                try {
                  const email = emailLocal + emailDomain;
                  const { error } = await supabase.auth.resend({
                    type: "signup",
                    email,
                  });
                  if (error) {
                    alert("再送信に失敗しました: " + error.message);
                    return;
                  }
                  alert("確認メールを再送信しました。メールをご確認ください。");
                } catch (error: any) {
                  alert("再送信に失敗しました: " + error.message);
                }
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ marginTop: 16 }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  textDecorationLine: "underline",
                  color: "#696969",
                  fontFamily: "ZenMaruGothicBold",
                }}
              >
                確認メールを再送信する
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
