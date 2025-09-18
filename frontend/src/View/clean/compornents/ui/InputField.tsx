import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TextInputProps, Keyboard } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onSave?: () => void | Promise<void>;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  returnKeyType?: TextInputProps["returnKeyType"];
};

const InputField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  onSave,
  placeholder,
  keyboardType,
  returnKeyType = "done",
}) => {
  const [focused, setFocused] = useState(false);
  const lastSavedValueRef = useRef<string>(value);

  const callSave = useCallback(() => {
    try {
      if (!onSave) return;
      if (lastSavedValueRef.current === value) return;
      onSave();
      lastSavedValueRef.current = value;
    } catch (e) {
      // noop
    }
  }, [onSave, value]);

  useEffect(() => {
    lastSavedValueRef.current = value;
  }, []);

  useEffect(() => {
    const sub = Keyboard.addListener("keyboardDidHide", () => {
      if (focused) {
        callSave();
        setFocused(false);
      }
    });
    return () => sub.remove();
  }, [focused, callSave]);

  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "ZenMaruGothicBlack",
          color: "#555555",
        }}
      >
        {label}
      </Text>
      <View>
        <TextInput
          style={{
            borderWidth: 3,
            borderColor: "#989898",
            marginTop: 10,
            padding: 8,
            fontSize: 16,
          }}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onSubmitEditing={callSave}
          onEndEditing={callSave}
          onBlur={callSave}
          returnKeyType={returnKeyType}
          blurOnSubmit={true}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default InputField;
