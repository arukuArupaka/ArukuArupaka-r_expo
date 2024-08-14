import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';

const SendBox = (props) => {
    const [inputText, setInputText] = useState("");

    const handleSendMessage = () => {
        props.sendMessage(inputText);
        setInputText(""); // メッセージ送信後に入力フィールドをクリア
    };

    return (
        <View style={{ backgroundColor: 'orange', height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
            <TextInput
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    marginLeft: 30,
                    marginRight: 10,
                    height: 35,
                    borderRadius: 17,
                    paddingHorizontal: 10
                }}
                value={inputText} // TextInputにinputTextの状態をバインド
                onChangeText={(text) => setInputText(text)}
            />
            <TouchableOpacity 
                disabled={inputText === ""}
                onPress={handleSendMessage}>
                <Feather name="send" size={35} color={inputText !== "" ? 'white' : "blue"} />
            </TouchableOpacity>
        </View>
    )
}

export default SendBox;