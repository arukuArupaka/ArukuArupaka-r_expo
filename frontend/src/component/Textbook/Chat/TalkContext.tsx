// TimeTableContext.js
import React, { useRef, createContext, useState, useContext, useEffect } from 'react';
import { ScrollView, View, Button } from 'react-native';

const TalkContext = createContext();

export const useTalkContext = () => useContext(TalkContext);

export const TalkProvider = ({ children }) => {
  
    const [chatmessage, setChatmessage] = useState([]);
    const [chatid, setChatid] = useState([]);
    const [chatroom, setChatroom] = useState([]);
    const [nameindi, setNameindi] = useState('');
    const [click, setClick] = useState('');
    const [lasttime, setLasttime] = useState(0);
    const [me, setMe] = useState('');

  return (
    <TalkContext.Provider value={{ me, setMe, click, setClick, nameindi, setNameindi, chatid, setChatid, chatroom, setChatroom, chatmessage, setChatmessage, lasttime, setLasttime}}>
      { children }
    </TalkContext.Provider>
  );
};