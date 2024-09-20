import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { ClassPeriodOptionDatas } from "../types/class-period-option-datas";

type Props = {
  isShow: boolean;
  data?: ClassPeriodOptionDatas;
  onClose: () => void;
};

const SetClassPeriodModal: FC<Props> = ({ isShow, data, onClose }) => {
  const [className, setClassName] = useState(data?.kamoku_name);
  const [classRoom, setClassRoom] = useState(data?.kamoku_class);
  useEffect(() => {
    setClassName(data?.kamoku_name);
    setClassRoom(data?.kamoku_class);
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
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      backgroundColor: "#30CB89",
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
                      追加
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
