import { FC } from "react";
import { View, TouchableOpacity, Text } from "react-native";

type Props = {
  showQRCode: () => void;
};

export const QRShowButton: FC<Props> = ({ showQRCode }) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          bottom: 210,
          marginHorizontal: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 100,
          zIndex: 10,
        }}
        onPress={showQRCode}
      >
        <Text style={{ fontSize: 20, fontWeight: "400", color: "white" }}>
          QRを表示
        </Text>
      </TouchableOpacity>
    </View>
  );
};
