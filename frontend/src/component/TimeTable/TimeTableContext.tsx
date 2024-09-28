import React, { createContext, useState, useContext, useEffect } from "react";
import { ClassPeriod } from "./types/class-period";
import { AsyncFunctions } from "./classObject/TimeTableClassObject";
import { UserSettingContent } from "./types/user-setting-content";

const TimeTableContext = createContext(null);

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [unreadMessagesJSON, setUnreadMessagesJSON] = useState([]);
  const [settingScreen, setSettingScreen] = useState(true);
  const [userClassPeriodDatas, setUserClassPeriodDatas] = useState<
    ClassPeriod[]
  >([]);
  const initialUserSettingContent = {
    department: "",
    semester: "",
    displayCount: 5,
    colorByUnits: false,
    colorBySubject: false,
    totalUnits: 0,
  };
  const [userSettingContent, setUserSettingContent] =
    useState<UserSettingContent>(initialUserSettingContent);

  const getClassPeriodDatas = async () => {
    const classPeriodDatas = await AsyncFunctions.getClassPeriodDatas<
      ClassPeriod[]
    >("@classPeriods", "array");
    setUserClassPeriodDatas(classPeriodDatas);
  };

  const getUserSettingContent = async () => {
    const userSettingContentData =
      await AsyncFunctions.getClassPeriodDatas<UserSettingContent>(
        "@userSettingContent",
        "object"
      );

    if (userSettingContentData) {
      console.log("user", userSettingContentData);
      setUserSettingContent(userSettingContentData);
    }
  };

  const getTotalUnits = () => {
    if (
      userSettingContent.department !== "" &&
      userSettingContent.semester !== ""
    ) {
      const selectedAllClassPeriods: ClassPeriod[] =
        userClassPeriodDatas.filter(
          (el: ClassPeriod) =>
            el.department === userSettingContent.department &&
            el.season === userSettingContent.semester
        );

      const uniqueClassPeriods: ClassPeriod[] = selectedAllClassPeriods.filter(
        (value, index, self) =>
          index === self.findIndex((obj) => obj.num === value.num)
      );

      const totalUnits = uniqueClassPeriods.reduce(
        (acc, obj: ClassPeriod) => acc + obj.unit,
        0
      );

      setUserSettingContent((data) => ({
        ...data,
        totalUnits: totalUnits,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getClassPeriodDatas();
      await getUserSettingContent();
      getTotalUnits();
    };

    fetchData();
  }, []);

  useEffect(() => {
    getTotalUnits();
  }, [
    userClassPeriodDatas,
    userSettingContent.department,
    userSettingContent.semester,
  ]);

  return (
    <TimeTableContext.Provider
      value={{
        unreadMessagesJSON,
        setUnreadMessagesJSON,
        userClassPeriodDatas,
        setUserClassPeriodDatas,
        userSettingContent,
        setUserSettingContent,
        settingScreen,
        setSettingScreen,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};
