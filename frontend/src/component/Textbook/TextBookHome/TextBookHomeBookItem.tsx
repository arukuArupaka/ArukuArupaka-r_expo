import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

const TextBookHomeBookItem = ({ textbook }) => {
  const navigation = useNavigation();

  const storeLabel = useMemo(
    () => textbook.storeType || textbook.department,
    [textbook.storeType, textbook.department]
  );

  const isNegotiating = useMemo(
    () => textbook.hasOwnProperty("buyUser"),
    [textbook]
  );

  const goToDetail = useCallback(() => {
    if (textbook.storeType === "yahoo") {
      Linking.openURL(
        textbook.shopUrl
      );
      return;
    }
    navigation.navigate("TextBookDetail", { ...textbook });
  }, [textbook, navigation]);

  return (
    <TouchableOpacity
      onPress={goToDetail}
      style={{
        width: "23%", // 約4列表示できるように
        backgroundColor: "#fff", // 通常は明るい背景
        borderRadius: 8,
        marginBottom: 12,
        marginHorizontal: "1%",
        position: "relative", // オーバーレイ用
        // iOS用シャドウ
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Android用シャドウ
        elevation: 2,
      }}
    >
      {/* 交渉中の場合、カード全体に暗いオーバーレイを表示 */}
      {isNegotiating && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
            borderRadius: 8,
            zIndex: 2,
          }}
        />
      )}
      <Image
        source={
            storeLabel === "yahoo"?{url:textbook.images}:(
          textbook.images && textbook.images.length !== 0
            ? { uri: textbook.images[0] }
            : require("../../../image/textbook/no_Image.png"))
        }
        style={{
          width: "100%",
          height: 100,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          resizeMode: "cover",
        }}
      />
      <View style={{ padding: 6 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: isNegotiating ? "#999" : "#333",
          }}
          numberOfLines={1}
        >
          {textbook.productName}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: isNegotiating ? "#999" : "#ff4500",
            marginVertical: 2,
          }}
        >
          ¥{textbook.price}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: isNegotiating ? "#bbb" : "#666",
            marginBottom: 2,
          }}
        >
          {storeLabel}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: isNegotiating ? "#bbb" : "#999",
          }}
          numberOfLines={1}
        >
          {textbook.condition || ""}
        </Text>
      </View>
      {/* 交渉中の場合、中央に赤いラベルを表示 */}
      {isNegotiating && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#D32F2F", // 赤を基調とした背景
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#fff",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              購入交渉中
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TextBookHomeBookItem;
