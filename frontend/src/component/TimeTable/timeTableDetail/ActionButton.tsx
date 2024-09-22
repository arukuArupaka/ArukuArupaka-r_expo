import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  color?: string;
};

const ActionButton: FC<ActionButtonProps> = ({
  label,
  onPress,
  color = "black",
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View>
        <Text style={[styles.label, { color: color }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginTop: 5,
    width: "95%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ActionButton;
