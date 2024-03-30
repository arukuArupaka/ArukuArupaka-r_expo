import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { db } from "../../../firebase"; // Firebaseからdbをインポート
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore"; // Firestoreからインポート

const MapNotificateView = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [lastVisible, setLastVisible] = useState(null); // 最後の可視ドキュメントの参照を格納する状態

  useEffect(() => {
    fetchNotifications(); // 初回の通知の取得
  }, []);

  const fetchNotifications = async () => {
    try {
      const notificationsCollection = collection(db, "notifications");
      let q = query(
        notificationsCollection,
        orderBy("createdAt", "desc"),
        limit(10)
      );

      if (lastVisible) {
        q = query(
          notificationsCollection,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible), // 最後の可視ドキュメントの後に開始
          limit(10)
        );
      }

      const querySnapshot = await getDocs(q);

      const fetchedNotifications = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt instanceof Date) {
          fetchedNotifications.push(data);
        } else if (
          data.createdAt &&
          data.createdAt.toDate instanceof Function
        ) {
          data.createdAt = data.createdAt.toDate();
          fetchedNotifications.push(data);
        } else {
          console.warn(
            "無効な 'createdAt' フィールドを含むドキュメント:",
            doc.id,
            data
          );
        }
      });

      setNotifications([...notifications, ...fetchedNotifications]);
      // 最後の可視ドキュメントを更新
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const NotificationModal = ({ notification, onClose }) => {
    return (
      <Modal visible={notification !== null} animationType="slide">
        <View style={{ flex: 1 }}>
          {notification && (
            <ScrollView>
              <View
                style={{
                  marginTop: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>
                    {notification.createdAt instanceof Date
                      ? notification.createdAt.toLocaleDateString()
                      : "Invalid Date"}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{ backgroundColor: "#00ff7f", marginLeft: "10%" }}
                    >
                      <Text style={{ marginLeft: "10%" }}>
                        {notification.selectedDepartment}
                      </Text>
                    </View>
                    <Text style={{ marginLeft: "10%" }}>
                      :{notification.username}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, marginTop: "5%" }}
                >
                  {notification.subject}
                </Text>
                <Text style={{ marginTop: "5%" }}>{notification.message}</Text>
              </View>
            </ScrollView>
          )}
          <Button title="閉じる" onPress={onClose} />
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 30, marginLeft: "35%" }}>お知らせ</Text>
      </View>
      <View style={{ marginTop: "10%" }}>
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={{ marginTop: "5%", borderBottomWidth: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginLeft: "3%" }}>
                  {notification.createdAt instanceof Date
                    ? notification.createdAt.toLocaleDateString()
                    : "Invalid Date"}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ backgroundColor: "#00ff7f", marginLeft: "4%" }}
                  >
                    <Text style={{ marginLeft: "5%" }}>
                      {notification.selectedDepartment}
                    </Text>
                  </View>
                  <Text>:{notification.username}</Text>
                </View>
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: "3%",
                  marginTop: "1%",
                }}
              >
                {notification.subject}
              </Text>
              <Text
                numberOfLines={1}
                style={{ marginLeft: "3%", marginTop: "1%" }}
              >
                {notification.message}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {lastVisible && (
          <Button title="さらに表示" onPress={fetchNotifications} />
        )}
      </View>
      <NotificationModal
        notification={selectedNotification}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default MapNotificateView;
