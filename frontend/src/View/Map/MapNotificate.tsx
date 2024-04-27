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
        limit(4)
      );

      if (lastVisible) {
        q = query(
          notificationsCollection,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible), // 最後の可視ドキュメントの後に開始
          limit(4)
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
    <View style={{ flex: 1 ,backgroundColor:'white',borderTopWidth:3,borderColor:'#888888'}}>
      <View style={{ borderBottomWidth: 1 ,borderColor:'#888888'}}>
        <Text style={{ fontSize: 30, marginLeft: "35%" }}>お知らせ</Text>
      </View>
      <ScrollView style={{}}>
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={{borderBottomWidth: 1 ,borderColor:'888888',paddingVertical:20}}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginLeft: "3%" }}>
                  {notification.createdAt instanceof Date
                    ? notification.createdAt.toLocaleDateString()
                    : "Invalid Date"}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ backgroundColor: "#30CB89", marginLeft: 10 ,paddingHorizontal:5}}
                  >
                    <Text style={{color:'white',fontWeight:'600',textAlign:'center'}}>
                      {notification.selectedDepartment}
                    </Text>
                  </View>
                  {notification.username&&<Text>:{notification.username}</Text>}
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
                style={{ 
                  marginLeft: "3%",
                   marginTop: "1%" ,
                  fontSize:13}}
              >
                {notification.message}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {lastVisible && (
          <TouchableOpacity
            onPress={fetchNotifications}
            style={{
              width: "50%",
              marginTop: 10,
              marginLeft: "25%",
              backgroundColor: "#C8252B",
              borderRadius: 30,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              さらに表示
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <NotificationModal
        notification={selectedNotification}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default MapNotificateView;
