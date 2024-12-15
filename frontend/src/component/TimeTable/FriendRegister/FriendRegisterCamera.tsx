import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import QRCode from "react-native-qrcode-svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Crypto from "expo-crypto";
import { useSelector } from "react-redux";
import FriendAddConfirmDialog from "./FriendAddConfirmDialog";

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
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            backgroundColor: "white",
            bottom: 120,
            marginHorizontal: 20,
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 10,
            zIndex: 10,
          }}
          onPress={showQRCode}
        >
          <Text style={{ fontSize: 30, fontWeight: "800" }}>QRで友達登録</Text>
        </TouchableOpacity>
      </View>
      {isShowQR && (
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
              width: 270,
              height: 300,
              paddingTop: 5,
              marginRight: "auto",
              marginLeft: "auto",
              borderRadius: 10,
            }}
          >
            <Text style={{textAlign:"center"}}>お互いにQRコードを読み合ってください</Text>
            <TouchableOpacity onPress={() => setIsShowQR(false)}>
              <MaterialIcons
                style={{ textAlign: "right" }}
                name="cancel"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            <View
              style={{ marginRight: "auto", marginLeft: "auto", marginTop: 5 }}
            >
              {user.hasOwnProperty("friendConvertToken") && (
                <QRCode value={user.friendConvertToken} size={230} />
              )}
            </View>
          </View>
        </View>
      )}
      <FriendAddConfirmDialog
        confirmFriendData={confirmFriendData}
        onClose={onCloseConfirmDialog}
        onConfirm={addFriend}
      />
    </View>
  );
};

export default FriendRegisterCamera;
