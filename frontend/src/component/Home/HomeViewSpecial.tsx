import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Image, TouchableOpacity, Text, Linking } from "react-native";
import { WebView } from "react-native-webview";

const Specialsite = ({navigation}) => {
  const [specials, setSpecials] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);

  useEffect(() => {
    // Django APIからデータを取得
    axios
      .get("https://render-test-db-h83h.onrender.com/special/specials/")
      .then((response) => {
        setSpecials(response.data);
      });
  }, []);

  return (
    <View>
        <View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', flexWrap: 'wrap'}}>
            {specials.map((special,index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 160,
                  minHeight: 65,
                  //marginLeft: "5%",
                  borderWidth: 2,
                  borderColor: special.frame_color,
                  borderRadius: 10,
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
                onPress={() => {
                  console.log('url',special.destination_url);
                  navigation.navigate("HomeWebSite", {uri: special.destination_url})}
                }
              >
                <View style={{ flexDirection: "row", alignItems: 'center', paddingLeft: 10}}>
                  <Image
                    source={{ uri: special.icon_image_url }}
                    style={{ width: 30, height: 30}}
                  />
                  <Text style={{ paddingLeft: "10%", paddingBottom: "5%", alignItems: 'center', fontSize: 17, width: 110}}>
                    {special.page_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
    </View>
  );
};

export default Specialsite;
