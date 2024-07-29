import { View, Text, Image ,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';

const KitchenCarIconContainer = (props) => {
    const navigation = useNavigation();

    const [description,setDescription]=useState("")

  return (
    <Marker
      style={{
        alignItems: "center",
        elevation: 10,
      }}
      coordinate={{
        longitude: props.kitchenCarObject.position.mapValue.fields.longitude
          .stringValue
          ? parseFloat(
              props.kitchenCarObject.position.mapValue.fields.longitude
                .stringValue
            )
          : 0,
        latitude: props.kitchenCarObject.position.mapValue.fields.latitude
          .stringValue
          ? parseFloat(
              props.kitchenCarObject.position.mapValue.fields.latitude
                .stringValue
            )
          : 0,
      }}
      title={props.kitchenCarObject.storeName.stringValue}
      description="アイコンを長押しして詳細表示"
    >
        <TouchableOpacity
        onLongPress={()=>navigation.navigate("MapKitchenCarDetail",{kitchenCarObject:props.kitchenCarObject})}>
      <Image
        style={{ height: 40, width: 40 }}
        source={
          props.kitchenCarObject.imageURI.stringValue
            ? { uri: props.kitchenCarObject.imageURI.stringValue }
            : require("../../image/Logo.png")
        }
      />
      </TouchableOpacity>
    </Marker>
  );
};

export default KitchenCarIconContainer;
