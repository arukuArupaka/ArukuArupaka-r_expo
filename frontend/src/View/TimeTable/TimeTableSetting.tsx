import {
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import SettingBody from "../../component/TimeTable/timeTableSetting/SettingBody";
import { useRef, useState } from "react";
import NotificationList from "../../component/TimeTable/timeTableSetting/NotificationList";

const TimeTableSetting = () => {
  const [settingScreen, setSettingScreen] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const a = 0;
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    if (x > 225) {
      setSettingScreen(false);
    } else if (x < 225) {
      setSettingScreen(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={{
              width: "40%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: settingScreen ? "#30CB89" : "gray",
            }}
            onPress={() => {
              scrollViewRef.current.scrollTo({ x: 0, animated: true });
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              設定
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "40%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: !settingScreen ? "#30CB89" : "gray",
            }}
            onPress={() => {
              scrollViewRef.current.scrollTo({ x: 450, animated: true });
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              通知一覧
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        ref={scrollViewRef}
        style={{ width: windowWidth }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        <SettingBody />
        <NotificationList />
      </ScrollView>
    </View>
  );
};
export default TimeTableSetting;
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
  },
  buttonsContainer: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
