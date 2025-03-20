import { Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { FriendData } from "./types/friendData";

const TimeTableFriendListItem = ({ id, onSelect }) => {
  useEffect(() => {
    getFriendData(id);
  }, [id]);
  const [friendData, setFriendData] = useState<FriendData>(null);
  const getFriendData = async (id: string) => {
    try {
      const docRef = await getDoc(doc(db, "users", id));
      if (docRef.exists()) {
        const data = docRef.data();
        if (data && typeof data.userName === "string") {
          setFriendData(data as FriendData);
        } else {
          console.error("Invalid data format:", data);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error; // エラーハンドリング
    }
  };

  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (id) {
        try {
          const uri = await getDownloadURL(
            ref(storage, `users/${id}/mainPicture`)
          );
          setImageUri(uri);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };
    fetchImage();
  }, [id, storage]);

  return (
    <TouchableOpacity
      onPress={() => onSelect(friendData)}
      style={{
        flexDirection: "row",
        gap: 10,
        paddingVertical: 10,
        alignItems: "center",
        marginLeft: 10,
      }}
    >
      <Image
        source={{ uri: imageUri }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        {friendData?.userName}
      </Text>
    </TouchableOpacity>
  );
};

export default TimeTableFriendListItem;
