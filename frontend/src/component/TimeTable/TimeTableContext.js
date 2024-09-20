// TimeTableContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const TimeTableContext = createContext();

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [unreadMessagesJSON, setUnreadMessagesJSON] = useState([]);

  return (
    <TimeTableContext.Provider
      value={{
        unreadMessagesJSON,
        setUnreadMessagesJSON,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};
