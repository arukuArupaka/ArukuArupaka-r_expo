import React from "react";
import { Text, View, StyleSheet, Switch, TouchableOpacity } from "react-native";
import TimeTableQty from "../component/TimeTable/TimeTableQty";
import { useState, useEffect } from "react";
import TimrTableView from "./TimeTableView";
import { useTimeTable } from "../component/TimeTable/TimeTableContext";
import TimeTableChange from "../component/TimeTable/TimeTableChange";
import HelloWorldApp from "../component/TimeTable/TimeTableNotficationListView";

const TimeTableSetting = () => {
  const {
    timesize,
    weekTimeQty,
    setWeekTimeQty,
    sizechange,
    setSizechange,
    toggleSwitch,
  } = useTimeTable();

  // その他のコンポーネントのコード...

  const styles = StyleSheet.create({
    body: {
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      height: 80,
    },
    Qty: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "center",
      textAlign: "center",
      paddingLeft: "5%",
      paddingRight: "5%",
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "black",
      width: "90%",
      height: "20%",
    },
    QtySet: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    PageSize: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignContent: "center",
      textAlign: "center",
      paddingLeft: "5%",
      paddingRight: "5%",
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "black",
      width: "90%",
      height: "20%",
    },
    QtySets: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    SizeSet: {
      paddingLeft: "30%",
    },
    changebutton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "20%",
    },
  });

  const [showsetting, setShowsetting] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: "" }}>
      <View style={{ flexDirection: "row" ,marginTop:5}}>
        <TouchableOpacity
          style={{
            flex: 1,
            margin:10,
            padding:5,
            borderRadius:6,
            backgroundColor: showsetting ? "#98fb98" : "#d3d3d3",
          }}
          onPress={()=>setShowsetting(true)}
        >
          <Text style={{ textAlign: "center" }}>設定</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            margin:10,
            padding:5,
            borderRadius:6,
            backgroundColor: showsetting ? "#d3d3d3" : "#98fb98",
          }}
          onPress={()=>setShowsetting(false)}
        >
          <Text style={{ textAlign: "center" }}>通知一覧</Text>
        </TouchableOpacity>
      </View>
   
                {showsetting ? <TimeTableChange/> : <HelloWorldApp/>}
    </View>
  );
};
export default TimeTableSetting;
