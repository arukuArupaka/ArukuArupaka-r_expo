import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import QRCode from "react-native-qrcode-svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Crypto from "expo-crypto";
import { useSelector } from "react-redux";
import FriendAddConfirmDialog from "./FriendAddConfirmDialog";
import { QRView } from "./component/QRView";
import { QRShowButton } from "./component/QRShowButton";

const FriendRegisterCamera = ({
  firebaseUserAddFriendConvertToken,
  getFriendData,
  confirmFriendData,
  onCloseConfirmDialog,
  addFriend,
}) => {
  const user = useSelector((state: any) => state.user.userObject);

  const [isShowQR, setIsShowQR] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const getCameraPermission = async () => {
      requestPermission();
    };
    getCameraPermission();
  }, []);

  const showQRCode = async () => {
    if (!user.hasOwnProperty("friendConvertToken")) {
      await firebaseUserAddFriendConvertToken(Crypto.randomUUID());
    }
    setIsShowQR(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {permission && (
        <>
          <CameraView
            onBarcodeScanned={({ type, data }) => getFriendData(data)}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={{ flex: 1 }}
          />
        </>
      )}
      {isShowQR && <QRView setIsShowQR={setIsShowQR} user={user} />}
      {!isShowQR && <QRShowButton showQRCode={showQRCode} />}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 200,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "white",
            width: "90%",
          }}
        >
          QRコードを読み取って友達申請を送ることができます。
        </Text>
      </View>
      <FriendAddConfirmDialog
        confirmFriendData={confirmFriendData}
        onClose={onCloseConfirmDialog}
        onConfirm={addFriend}
      />
    </View>
  );
};

export default FriendRegisterCamera;
