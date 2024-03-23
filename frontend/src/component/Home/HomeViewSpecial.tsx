import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Image, TouchableOpacity, Text, Linking } from "react-native";
import { WebView } from "react-native-webview";

const Specialsite = () => {
  const [specials, setSpecials] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);

  useEffect(() => {
    // Django APIからデータを取得
    axios
      .get("http://192.168.2.125:8000/special/specials/")
      .then((response) => {
        setSpecials(response.data);
      });
  }, []);

  return (
    <View>
      {selectedUrl ? (
        <WebView source={{ uri: selectedUrl }} />
      ) : (
        <View>
          <View style={{ flexDirection: "row" }}>
            {specials.map((special) => (
              <TouchableOpacity
                key={special.id}
                style={{
                  width: "35%",
                  marginLeft: "5%",
                  borderWidth: 1,
                  borderColor: special.frame_color,
                  borderRadius: 5,
                }}
                onPress={() => setSelectedUrl(special.destination_url)}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: special.icon_image_url }}
                    style={{ width: 10, height: 10 }}
                  />
                  <Text style={{ paddingLeft: "10%", paddingBottom: "5%" }}>
                    {special.page_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Specialsite;
