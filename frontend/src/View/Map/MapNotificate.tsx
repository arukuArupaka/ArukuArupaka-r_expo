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
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"; // Firestoreからインポート

const MapNotificateView = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsCollection = collection(db, "notifications");
        const q = query(
          notificationsCollection,
          orderBy("createdAt", "desc"),
          limit(10)
        ); // クエリの作成

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

        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

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
                  borderBottomWidth: 1,
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
                      style={{ backgroundColor: "#00ff7f", marginLeft: "4%" }}
                    >
                      <Text style={{ marginLeft: "5%" }}>
                        {notification.selectedDepartment}
                      </Text>
                    </View>
                    <Text>:{notification.username}</Text>
                  </View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {notification.subject}
                </Text>
                <Text>{notification.message}</Text>
              </View>
            </ScrollView>
          )}
          <Button title="閉じる" onPress={onClose} />
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ fontSize: 30, borderBottomWidth: 1 }}>お知らせ</Text>
      <View style={{ alignContent: "center", marginTop: "5%" }}>
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={{ marginTop: 10, borderBottomWidth: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Text>
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
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {notification.subject}
              </Text>
              <Text numberOfLines={1}>{notification.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <NotificationModal
        notification={selectedNotification}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default MapNotificateView;
