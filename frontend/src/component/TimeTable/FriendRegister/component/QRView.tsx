import React, { FC } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  setIsShowQR: React.Dispatch<React.SetStateAction<Boolean>>;
  user: any;
};

export const QRView: FC<Props> = ({ setIsShowQR, user }) => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: 300,
          height: 390,
          paddingTop: 5,
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: 10,
        }}
      >
        <TouchableOpacity onPress={() => setIsShowQR(false)}>
          <MaterialIcons
            style={{ textAlign: "right", margin: 10 }}
            name="cancel"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <View
          style={{ marginRight: "auto", marginLeft: "auto", marginTop: 10 }}
        >
          {user.hasOwnProperty("friendConvertToken") && (
            <QRCode value={user.friendConvertToken} size={230} />
          )}
        </View>
      </View>
    </View>
  );
};
