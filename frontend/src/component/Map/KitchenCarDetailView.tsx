import { View, Text,TouchableOpacity,Linking } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const KitchenCarDetailView = () => {
    const navigation=useNavigation()
  const route = useRoute();

  console.log(route.params);

  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          marginVertical: 10,
          padding: 10,
          backgroundColor: "yellow",
          borderRadius: 8,
        }}
      >
        ※予告せず変更になる場合があります。
      </Text>

      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 20 }}>
        {route.params.kitchenCarObject.storeName.stringValue}
      </Text>

      <Text style={{ fontSize: 18, marginVertical: 4 }}>おすすめ情報</Text>
      <Text style={{ fontSize: 18 }}>
        {route.params.kitchenCarObject.message.stringValue}
      </Text>
      <Text style={{ fontSize: 18, marginVertical: 4, marginTop: 15 }}>
        関連ワード
      </Text>
      <Text style={{ fontSize: 18 }}>
        {route.params.kitchenCarObject.herf.stringValue}
      </Text>
      <Text style={{ fontSize: 15, marginVertical: 4, marginTop: 15 }}>
        本日の営業時間
      </Text>
      <Text style={{ fontSize: 18 }}>
        {route.params.kitchenCarObject.startTime.stringValue +
          "から" +
          route.params.kitchenCarObject.endTime.stringValue +
          "まで"}
      </Text>
      {route.params.kitchenCarObject.url.stringValue && (
        <TouchableOpacity onPress={()=>navigation.navigate('HomeWebSite',{uri:route.params.kitchenCarObject.url.stringValue})}>
          <Text style={{ fontSize: 18, marginVertical: 4, marginTop: 60 ,textAlign:'center',color:'blue'}}>
            WEBサイトに移動
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default KitchenCarDetailView;
