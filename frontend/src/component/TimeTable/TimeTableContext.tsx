import React, { createContext, useState, useContext, useEffect } from "react";
import { ClassPeriod } from "./types/class-period";
import { AsyncFunctions } from "./classObject/TimeTableClassObject";

const TimeTableContext = createContext(null);

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [unreadMessagesJSON, setUnreadMessagesJSON] = useState([]);
  const [userClassPeriodDatas, setUserClassPeriodDatas] = useState<
    ClassPeriod[]
  >([]);

  const getClassPeriodDatas = async () => {
    const asyncFunctions = new AsyncFunctions("@classPeriods");
    const classPeriodDatas = await asyncFunctions.getClassPeriodDatas();
    setUserClassPeriodDatas(classPeriodDatas);
  };

  useEffect(() => {
    getClassPeriodDatas();
  }, []);

  return (
    <TimeTableContext.Provider
      value={{
        unreadMessagesJSON,
        setUnreadMessagesJSON,
        userClassPeriodDatas,
        setUserClassPeriodDatas,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};
