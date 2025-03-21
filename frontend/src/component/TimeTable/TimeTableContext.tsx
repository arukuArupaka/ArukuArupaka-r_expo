import React, { createContext, useState, useContext, useEffect } from "react";
import { ClassPeriod } from "./types/class-period";
import { UserSettingContent } from "./types/user-setting-content";
import * as Notifications from "expo-notifications";
import { AsyncFunctions } from "./classObject/async-functions";
import {
  collection,
  doc,
  getDoc,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { FirebaseNotification } from "./types/firebase-notification";

const TimeTableContext = createContext(null);

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [unreadMessagesJSON, setUnreadMessagesJSON] = useState([]);
  // ユーザーが登録した全ての時間割データ
  const [userClassPeriodData, setUserClassPeriodData] = useState<ClassPeriod[]>(
    []
  );
  const [hasNewFirebaseNotification, setHasNewFirebaseNotification] =
    useState(false);
  const [friendsClassPeriodData, setFriendsClassPeriodData] = useState<
    ClassPeriod[]
  >([]);
  const initialUserSettingContent = {
    department: "",
    semester: undefined,
    displayCount: 5,
    colorByUnits: false,
    colorBySubject: false,
    totalUnits: 0,
    schoolYear: 2025,
  };
  const [userSettingContent, setUserSettingContent] =
    useState<UserSettingContent>(initialUserSettingContent);
  const [firebaseNotificationList, setFirebaseNotificationList] = useState<
    any[]
  >([]);
  // 自分のアイコン画像のURI
  const [userIconImageUri, setUserIconImageUri] = useState("");

  const getClassPeriodData = async () => {
    const classPeriodData = await AsyncFunctions.getData<ClassPeriod[]>(
      "@classPeriods",
      "array"
    );
    setUserClassPeriodData(classPeriodData);
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
      userSettingContent.semester !== undefined
    ) {
      const selectedAllClassPeriods: ClassPeriod[] = userClassPeriodData.filter(
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
        const newData = userClassPeriodData
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
            year: userSettingContent.schoolYear,
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
      await getClassPeriodData();
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
    userClassPeriodData,
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

  const fetchFirebaseNotificationData = async () => {
    console.log("fetchFirebaseNotificationData");
    const localNotificationList = await AsyncFunctions.getData<
      FirebaseNotification[]
    >("@firebaseNotificationList", "array");
    const dockRef = doc(db, "users", auth.currentUser.uid);
    const userDocument = await getDoc(dockRef);
    console.log("userDocument:", userDocument.data().receivedFriendRequests);
    const data = userDocument.data();
    console.log(localNotificationList);
    const receivedFriendRequests = data.receivedFriendRequests
      .map((el) => {
        if (
          localNotificationList &&
          !localNotificationList.map((ntf) => ntf?.id).includes(el.id)
        ) {
          return {
            ...el,
            requestedAt: el.requestedAt.toDate(),
            isAccepted: false,
          };
        }
        return false;
      })
      .filter((el) => el !== false)
      .sort((a, b) => {
        return b.requestedAt - a.requestedAt;
      }); // 未読のフレンドリクエストを取得し時系列降順でソート

    console.log("receivedFriendRequests:", receivedFriendRequests);

    if (receivedFriendRequests.length > 0) {
      setHasNewFirebaseNotification(true);
    }

    console.log("fetchedFriendRequests:", receivedFriendRequests);

    const friendRequestList = receivedFriendRequests.concat(
      localNotificationList
    );
    console.log("friendRequestList:", friendRequestList);

    setFirebaseNotificationList(friendRequestList);

    await AsyncFunctions.saveData(
      "@firebaseNotificationList",
      friendRequestList
    );
  };

  return (
    <TimeTableContext.Provider
      value={{
        unreadMessagesJSON,
        setUnreadMessagesJSON,
        userClassPeriodData,
        setUserClassPeriodData,
        userSettingContent,
        setUserSettingContent,
        friendsClassPeriodData,
        setFriendsClassPeriodData,
        firebaseNotificationList,
        setFirebaseNotificationList,
        hasNewFirebaseNotification,
        setHasNewFirebaseNotification,
        fetchFirebaseNotificationData,
        userIconImageUri,
        setUserIconImageUri,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};
