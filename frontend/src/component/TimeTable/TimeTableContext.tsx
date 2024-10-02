import React, { createContext, useState, useContext, useEffect } from "react";
import { ClassPeriod } from "./types/class-period";
import { UserSettingContent } from "./types/user-setting-content";
import * as Notifications from "expo-notifications";
import { AsyncFunctions } from "./classObject/async-functions";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const TimeTableContext = createContext(null);

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [unreadMessagesJSON, setUnreadMessagesJSON] = useState([]);
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
    const classPeriodDatas = await AsyncFunctions.getData<ClassPeriod[]>(
      "@classPeriods",
      "array"
    );
    setUserClassPeriodDatas(classPeriodDatas);
  };

  const getUserSettingContent = async () => {
    const userSettingContentData =
      await AsyncFunctions.getData<UserSettingContent>(
        "@userSettingContent",
        "object"
      );

    if (userSettingContentData) {
      setUserSettingContent(userSettingContentData);
    }
  };

  const getTotalUnits = async () => {
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
  const setClassPeriodDataInFireBase = async () => {
    if (auth.currentUser.uid) {
      try {
        const classPeriodsDataRef = doc(
          db,
          `UserClassPeriodsData/${auth.currentUser.uid}`
        );
        // fireStoreはオブジェクトの中に一つでもundefinedのプロパティが存在したら保存できないから、undefinedの要素を消すための作業
        const newData = userClassPeriodDatas
          .map((el: ClassPeriod) => {
            const filteredData: Partial<ClassPeriod> = {};

            for (const key in el) {
              if (el[key] !== undefined) {
                filteredData[key] = el[key];
              }
            }

            return filteredData;
          })
          .filter((el) => Object.keys(el).length > 0);
        await setDoc(
          classPeriodsDataRef,
          {
            userId: auth.currentUser.uid,
            classPeriods: newData,
            department: userSettingContent.department,
            semester: userSettingContent.semester,
          },
          { merge: true }
        );
      } catch (e) {
        console.error(e.message);
      }
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
    const totalUnitsAndFirebase = async () => {
      getTotalUnits();
      setClassPeriodDataInFireBase();
    };
    totalUnitsAndFirebase();
  }, [
    userClassPeriodDatas,
    userSettingContent.department,
    userSettingContent.semester,
  ]);

  useEffect(() => {
    // 通知の許可をリクエスト
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("通知の許可が必要です！");
      }
    })();
  }, []);

  return (
    <TimeTableContext.Provider
      value={{
        unreadMessagesJSON,
        setUnreadMessagesJSON,
        userClassPeriodDatas,
        setUserClassPeriodDatas,
        userSettingContent,
        setUserSettingContent,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};
