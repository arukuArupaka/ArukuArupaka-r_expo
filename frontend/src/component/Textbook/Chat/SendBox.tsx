import { View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const insertLineBreaks = (text: string, interval: number) => {
  const lines = text.split('\n');
  const formattedLines = lines.map((line) => {
    const regex = new RegExp(`.{1,${interval}}`, 'g');
    return line.match(regex)?.join('\n') ?? line;
  });
  return formattedLines.join('\n');
};

const SendBox = (props) => {
  const [inputText, setInputText] = useState('');
  const [inputHeight, setInputHeight] = useState(35); 

  const handleChangeText = (text: string) => {
    const formatted = insertLineBreaks(text, 15);
    setInputText(formatted);
  };

  const handleSendMessage = () => {
    props.sendMessage(inputText);
    setInputText('');
    setInputHeight(35); 
  };

  return (
    <View
      style={{
        backgroundColor: 'orange',
        minHeight: 60,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginLeft: 30,
          marginRight: 10,
          borderRadius: 17,
          paddingHorizontal: 10,
          paddingVertical: 5,
          height: inputHeight,
        }}
        multiline
        value={inputText}
        onChangeText={handleChangeText}
        onContentSizeChange={(event) => {
          setInputHeight(event.nativeEvent.contentSize.height);
        }}
      />
      <TouchableOpacity disabled={inputText === ''} onPress={handleSendMessage}>
        <Feather
          name="send"
          size={35}
          color={inputText !== '' ? 'white' : 'blue'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SendBox;
