import { View, Text, Dimensions } from "react-native";

const NotificationList = () => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={{ width: windowWidth, marginTop: 20 }}>
      <Text>こんにちは</Text>
    </View>
  );
};
export default NotificationList;
