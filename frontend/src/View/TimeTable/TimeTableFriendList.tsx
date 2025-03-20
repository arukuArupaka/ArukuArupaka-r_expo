import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import TimeTableFriendListItem from "../../component/TimeTable/common/TimeTableFriendListItem";

const TimeTableFriendList = ({ route }) => {
  const { friendList, onSelectFriend, onSelectMine } = route.params;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={onSelectMine}
          style={{
            backgroundColor: "lightblue",
            padding: 5,
            borderRadius: 50,
            alignItems: "center",
            marginTop: 10,
            width: "65%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            自分の時間割に戻す
          </Text>
        </TouchableOpacity>
        <View style={{ width: "100%", justifyContent: "flex-start" }}>
          {friendList.map((friendID: any, key) => {
            return (
              <TimeTableFriendListItem
                key={key}
                id={friendID}
                onSelect={onSelectFriend}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};
export default TimeTableFriendList;
