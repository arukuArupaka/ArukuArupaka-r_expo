import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from "react-native";
import { useTimeTable } from "../TimeTableContext";
import { AsyncFunctions } from "../classObject/TimeTableClassObject";
import { ClassPeriod } from "../types/class-period";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/root-stack-param-list";
import { UserSettingContent } from "../types/user-setting-content";

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
  const {
    userClassPeriodDatas,
    setUserClassPeriodDatas,
    userSettingContent,
    setUserSettingContent,
  } = useTimeTable();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [className, setClassName] = useState(data?.className);
  const [classRoom, setClassRoom] = useState(data?.classRoom);

  useEffect(() => {
    setClassName(data?.className);
    setClassRoom(data?.classRoom);
  }, [isShow]);

  const setUserClassPeriods = async (data: ClassPeriod) => {
    setUserClassPeriodDatas((prev: ClassPeriod[]) => {
      const updated = [...prev, data];
      return updated;
    });

    const updatedClassPeriods = [...userClassPeriodDatas, data];
    await AsyncFunctions.saveClassPeriodDatas(
      "classPeriod",
      updatedClassPeriods
    );
  };

  const changeUserClassPeriod = async (data: ClassPeriod) => {
    setUserClassPeriodDatas((prev: ClassPeriod[]) => {
      const deletePrevData: ClassPeriod[] = prev.filter(
        (el) => el.num !== data.num
      );
      const updated = [...deletePrevData, data];
      return updated;
    });
    const updatedClassPeriods = [
      ...userClassPeriodDatas.filter((el) => el.num !== data.num),
      data,
    ];
    await AsyncFunctions.saveClassPeriodDatas(
      "classPeriod",
      updatedClassPeriods
    );
  };

  const handleSave = (from: string) => {
    if (from === "classPeriodDetail") {
      const updatedData = { ...data, className, classRoom };
      onUpdate(updatedData);
      onClose();
      changeUserClassPeriod(updatedData);
    }
    if (from === "classPeriodOptions") {
      onClose();
      setUserClassPeriods(data);
      navigation.navigate("TimeTable");
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
