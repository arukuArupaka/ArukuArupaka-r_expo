import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { UserSettingContent } from "../types/user-setting-content";
import { useTimeTable } from "../TimeTableContext";
import DepartmentSelect from "./components/DepartmentSelect";
import SemesterSelect from "./components/SemesterSelect";
import DisplayCountSelect from "./components/DisplayCountSelect";
import { AsyncFunctions } from "../classObject/async-functions";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import SchoolYearSelect from "./components/SchoolYearSelect";
import { RootStackParamList } from "../types/root-stack-param-list";

const windowWidth = Dimensions.get("window").width;
const SettingBody = () => {
  const { userSettingContent, setUserSettingContent } = useTimeTable();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const saveUserSettingContent = async () => {
    await AsyncFunctions.saveData<UserSettingContent>(
      "@userSettingContent",
      userSettingContent
    );
  };

  const toggleSwitchAction = (switchName: string) => {
    if (switchName === "units") {
      setUserSettingContent((data: UserSettingContent) => ({
        ...data,
        colorByUnits: !data.colorByUnits,
        colorBySubject: !data.colorByUnits ? false : data.colorBySubject,
      }));
    } else if (switchName === "subjects") {
      setUserSettingContent((data: UserSettingContent) => ({
        ...data,
        colorBySubject: !data.colorBySubject,
        colorByUnits: !data.colorBySubject ? false : data.colorByUnits,
      }));
    }
  };

  useEffect(() => {
    saveUserSettingContent();
  }, [userSettingContent]);

  const [isEnabledShare, setIsEnabledShere] = useState(false);

  const userObject = useSelector((state: any) => state.user.userObject);

  useEffect(() => {
    if (userObject) {
      getUserDataIsEnabledShare();
    }
  }, [userObject]);

  const getUserDataIsEnabledShare = async () => {
    try {
      console.log(userObject, 46);
      const docRef = doc(db, "users", userObject.id);

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;
      console.log(docSnap.data(), 47);

      if ("EnabledTimeTableShare" in docSnap.data()) {
        console.log(docSnap.data(), 47);
        setIsEnabledShere(docSnap.data().EnabledTimeTableShare);
        return;
      }

      initialSetting();
    } catch (e) {
      console.log(e, 77);
    }
  };

  const setEnabledShare = async () => {
    try {
      setDoc(
        doc(db, "users", userObject.id),
        {
          EnabledTimeTableShare: true,
        },
        { merge: true }
      );
      setIsEnabledShere(true);
    } catch (e) {
      Alert.alert(
        "ログインしてください",
        "この機能を使用するにはログインが必要です",
        [
          {
            text: "OK",
          },
          {
            text: "ログイン画面へ",
            onPress: () => navigation.navigate("login"),
          },
        ]
      );
      console.log(e, 92);
    }
  };

  const setDisableShare = async () => {
    try {
      setDoc(
        doc(db, "users", userObject.id),
        {
          EnabledTimeTableShare: false,
        },
        { merge: true }
      );
      setIsEnabledShere(false);
    } catch (e) {
      Alert.alert(
        "ログインしてください",
        "この機能を使用するにはログインが必要です",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("login"),
          },
        ]
      );
      console.log(e, 92);
    }
  };

  const onChangeIsEnabledShare = (value) => {
    if (value) {
      setEnabledShare();
    } else {
      setDisableShare();
    }
  };

  const initialSetting = async () => {
    try {
      setDoc(
        doc(db, "users", userObject.id),
        {
          EnabledTimeTableShare: true,
        },
        { merge: true }
      );
      setIsEnabledShere(true);
    } catch (e) {
      Alert.alert(
        "ログインしてください",
        "この機能を使用するにはログインが必要です",
        [
          {
            text: "OK",
          },
          {
            text: "ログイン画面へ",
            onPress: () => navigation.navigate("login"),
          },
        ]
      );
      console.log(e, 92);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <DepartmentSelect />
          <SchoolYearSelect />
          <SemesterSelect />
          <DisplayCountSelect />
          <View style={styles.toggleContainer}>
            <Text style={styles.textType}>単位数ごとに自動で色分け</Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                onValueChange={() => toggleSwitchAction("units")}
                value={userSettingContent.colorByUnits}
              />
            </View>
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.textType}>科目の種類ごとに自動で色分け</Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                onValueChange={() => toggleSwitchAction("subjects")}
                value={userSettingContent.colorBySubject}
              />
            </View>
          </View>
          <View style={styles.totalUnitsContainer}>
            <Text style={styles.textType}>合計単位数</Text>
            <View style={styles.totalUnitsValueContainer}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {userSettingContent.totalUnits}
              </Text>
            </View>
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.textType}>時間割共有</Text>
            <View style={styles.toggleSwitchContainer}>
              <Switch
                onValueChange={onChangeIsEnabledShare}
                value={isEnabledShare}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SettingBody;

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
    alignItems: "center",
    width: windowWidth,
  },
  bodyContent: {
    height: 700,
    width: "90%",
    // height: "90%",
  },
  toggleContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  toggleSwitchContainer: {
    width: "35%",
    justifyContent: "center",
  },
  totalUnitsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  totalUnitsValueContainer: {
    width: "30%",
  },
  textType: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
