// TimeTableContext.js
import React, { useRef, createContext, useState, useContext, useEffect } from 'react';
import { ScrollView, View, Button } from 'react-native';

const TalkContext = createContext();

export const useTalkContext = () => useContext(TalkContext);

export const TalkProvider = ({ children }) => {
  
    const [chatmessage, setChatmessage] = useState([]);

  return (
    <TalkContext.Provider value={{chatmessage, setChatmessage}}>
      { children }
    </TalkContext.Provider>
  );
};