// TimeTableContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

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