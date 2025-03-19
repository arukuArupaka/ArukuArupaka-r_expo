import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../firebase";

const FriendAddConfirmDialog = ({ onConfirm, onClose, confirmFriendData }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (confirmFriendData?.id) {
        try {
          const uri = await getDownloadURL(
            ref(storage, `users/${confirmFriendData.id}/mainPicture`)
          );
          setImageUri(uri);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };
    fetchImage();
  }, [confirmFriendData, storage]);

  return (
    <Modal
      visible={!!confirmFriendData && Object.keys(confirmFriendData).length > 0}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>友達追加</Text>

          {/* 写真の表示 */}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          )}

          {/* 友達情報の表示 */}
          {confirmFriendData && (
            <View style={styles.friendInfo}>
              <Text style={styles.friendText}>
                名前: {confirmFriendData.userName}
              </Text>
              <Text style={styles.friendText}>
                学部: {confirmFriendData.faculty}
              </Text>
              <Text style={styles.friendText}>
                学科: {confirmFriendData.department}
              </Text>
              <Text style={styles.friendText}>
                学年: {confirmFriendData.grade}
              </Text>
              <Text style={styles.friendText}>
                キャンパス: {confirmFriendData.campus}
              </Text>
              <Text style={styles.friendText}>
                学校: {confirmFriendData.school}
              </Text>
              <Text style={styles.friendText}>
                プロフィール: {confirmFriendData.profile}
              </Text>
            </View>
          )}

          <Text style={styles.message}>友達を追加しますか？</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onConfirm([confirmFriendData])}
            >
              <Text style={styles.buttonText}>はい</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>いいえ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  friendInfo: {
    marginBottom: 10,
  },
  friendText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default FriendAddConfirmDialog;
