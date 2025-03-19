import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Switch,
} from "react-native";
import { useTimeTable } from "../TimeTableContext";
import RNPickerSelect from "react-native-picker-select";
import { ClassPeriod } from "../types/class-period";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/root-stack-param-list";
import { NotificationMethods } from "../classObject/notification-methods";
import { ConvertMethods } from "../classObject/convert-methods";
import { AsyncFunctions } from "../classObject/async-functions";

type Props = {
  from: string;
  isShow: boolean;
  data?: ClassPeriod;
  onClose: () => void;
  onUpdate?: (updatedData: ClassPeriod) => void;
};

const SetClassPeriodModal: FC<Props> = ({
  from,
  isShow,
  data,
  onClose,
  onUpdate,
}) => {
  const { userClassPeriodData, setUserClassPeriodData, userSettingContent } = useTimeTable();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [className, setClassName] = useState(data?.className);
  const [classRoom, setClassRoom] = useState(data?.classRoom);
  const [isNotify, setIsNotify] = useState<boolean>(data?.isNotify || true);
  const [notificationTime, setNotificationTime] = useState<number>(
    data?.notificationTime || 10
  );

  const setUserClassPeriods = async (data: ClassPeriod) => {
    setUserClassPeriodData((prev: ClassPeriod[]) => {
      const updated = [...prev, data];
      return updated;
    });

    const updatedClassPeriods = [...userClassPeriodData, data];
    await AsyncFunctions.saveData("@classPeriods", updatedClassPeriods);
  };

  const changeUserClassPeriod = async (newData: ClassPeriod) => {
    setUserClassPeriodData((prev: ClassPeriod[]) => {
      const deletePrevData: ClassPeriod[] = prev.filter(
        (el) => el.num !== newData.num
      );
      const updated = [...deletePrevData, newData];
      return updated;
    });
    const updatedClassPeriods = [
      ...userClassPeriodData.filter((el) => el.num !== newData.num),
      newData,
    ];
    await AsyncFunctions.saveData("@classPeriods", updatedClassPeriods);
  };

  const handleSave = async (from: string) => {
    try {
      const notifyTime = ConvertMethods.convertPeriodToTime(data.period);
      const weekOfTheDay = ConvertMethods.convertWeekOfTheDayToNumber(
        data.weekOfTheDay
      );

      let updatedData = {
        ...data,
        className,
        classRoom,
        isNotify,
        notificationTime,
      };

      if (isNotify) {
        const notificationId =
          await NotificationMethods.scheduleWeeklyNotification(
            weekOfTheDay,
            notifyTime.hour,
            notifyTime.minute,
            notificationTime,
            updatedData
          );
        updatedData.notificationId = notificationId;
      }

      if (from === "classPeriodDetail") {
        await NotificationMethods.cancelNotification(
          data.num,
          userClassPeriodData,
          setUserClassPeriodData
        );
        await changeUserClassPeriod(updatedData);
        if (onUpdate) onUpdate(updatedData);
      } else if (from === "classPeriodOptions") {
        updatedData = {
          ...updatedData,
          statusColor: ConvertMethods.setClassPeriodStatusColor(data),
          mulColor: ConvertMethods.setClassPeriodUnitColor(data),
        };
        console.log("updatedData", updatedData);
        await setUserClassPeriods(updatedData);
        navigation.navigate("TimeTable", { 
          headerTitle:`${userSettingContent.schoolYear} ${userSettingContent.semester}`
        });
      }

      onClose();
    } catch (e) {
      console.error(e.message);
    }
  };

  function buttonText(from: string): string {
    switch (from) {
      case "classPeriodOptions":
        return "追加";
      case "classPeriodDetail":
        return "変更";
    }
  }

  useEffect(() => {
    setClassName(data?.className);
    setClassRoom(data?.classRoom);
  }, [isShow]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShow}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                ></TouchableOpacity>
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={styles.modalText}>授業名</Text>
                </View>
                <TextInput
                  placeholder="授業名を入力してください"
                  style={styles.input}
                  placeholderTextColor="#888"
                  value={className}
                  onChangeText={(text) => setClassName(text)}
                />
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={styles.modalText}>教室名</Text>
                </View>
                <TextInput
                  placeholder="教室名を入力してください"
                  style={styles.input}
                  placeholderTextColor="#888"
                  value={classRoom}
                  onChangeText={(text) => setClassRoom(text)}
                />
                <View
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    通知する
                  </Text>
                  <Switch
                    value={isNotify} // 状態を制御
                    onValueChange={() => setIsNotify((prev) => !prev)} // スイッチの変化に対応
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginTop: 10,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={styles.modalText}>何分前に通知</Text>
                  {isNotify && (
                    <RNPickerSelect
                      value={notificationTime}
                      onValueChange={(value) => setNotificationTime(value)}
                      items={[
                        {
                          label: "10",
                          value: 10,
                          key: "10",
                        },
                        {
                          label: "15",
                          value: 15,
                          key: "15",
                        },
                        {
                          label: "20",
                          value: 20,
                          key: "20",
                        },
                        {
                          label: "30",
                          value: 30,
                          key: "30",
                        },
                        {
                          label: "40",
                          value: 40,
                          key: "40",
                        },
                        {
                          label: "50",
                          value: 50,
                          key: "50",
                        },
                        {
                          label: "60",
                          value: 60,
                          key: "60",
                        },
                      ]}
                      style={{
                        inputIOS: {
                          ...pickerSelectStyles.inputIOS,
                          backgroundColor: isNotify ? "#D9D9D9" : "white",
                          color: isNotify ? "black" : "white",
                        },
                        inputAndroid: {
                          ...pickerSelectStyles.inputAndroid,
                          backgroundColor: isNotify ? "#D9D9D9" : "white",
                          color: isNotify ? "black" : "white",
                          width: "70%",
                        },
                        placeholder: {
                          color: "black",
                        },
                      }}
                      placeholder={{}}
                      disabled={!isNotify}
                    />
                  )}
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      backgroundColor: "#30CB89",
                      borderRadius: 7,
                    }}
                    onPress={() => {
                      handleSave(from);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "800",
                      }}
                    >
                      {`${buttonText(from)}`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      backgroundColor: "#a9a9a9",
                      borderRadius: 7,
                    }}
                    onPress={onClose}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "800",
                      }}
                    >
                      キャンセル
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default SetClassPeriodModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: 300,
    paddingTop: 35,
    paddingHorizontal: 35,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#000",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    width: "100%",
    padding: 10,
    fontWeight: "bold",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#789",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    width: 280,
    marginLeft: 30,
    backgroundColor: "#eee",
    fontWeight: "bold",
  },
});
