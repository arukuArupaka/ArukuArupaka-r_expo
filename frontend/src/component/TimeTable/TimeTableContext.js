// TimeTableContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const TimeTableContext = createContext();

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [weekTimeQty, setWeekTimeQty] = useState(5);
  const [sizechange, setSizechange] = useState(false);
  const [timesize, setTimesize] = useState(625.5);
  const [padding, setPadding] = useState(0);
  const [department, setDepartment] = useState();
  const [season, setSeason] = useState();
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(0);
  const [period, setPeriod] = useState(NaN);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [dodata, setDodata] = useState(false);
  const [indata, setIndata] = useState(false);
  const [nodata, setNodata] = useState();
  const [isInfoShow, setIsInfoShow] = useState(false);
  const [kamokuShow, setKamokuShow] = useState(false);
  const [count, setCount] = useState(0);
  const [searchword, setSearchword] = useState("");
  const [deletekoma, setDeletekoma] = useState(false);
  const [komaborder, setKomaborder] = useState(false);
  const [unitCalc, setUnitCalc] = useState(false);
  const [unitSum, setUnitSum] = useState(0);
  const [multicolor, setMulticolor] = useState("#888888");
  const [colorset, setColorset] = useState(false);
  const [kamokuStatus, setKamokuStatus] = useState();
  const [pushedClassFrameDetail, setPushedClassFrameDetail] = useState({
    day: NaN,
    period: NaN,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://render-test-db-h83h.onrender.com/time_table/get/all/search/?kamoku_department=${department}&kamoku_day=${day}&kamoku_time=${time}&kamoku_season=${season}`
        );
        if (!response.ok) {
          console.log("HTTP status code:", response.status);
          throw new Error("Network response was not ok");
        }
        const json = await response.json();

        const processedData = json.map((item) => ({
          kamoku_name: item.kamoku_name,
          kamokuid: item.kamokuid,
          kamoku_resume: item.kamoku_resume,
          kamoku_class: item.kamoku_class,
          kamoku_day: item.kamoku_day,
          kamoku_time: item.kamoku_time,
          kamoku_unit: item.kamoku_unit,
          kamoku_department: item.kamoku_department,
          kamoku_season: item.kamoku_season,
          kamoku_num: item.kamoku_num,
          kamoku_teacher: item.kamoku_teacher,
          kamoku_status: item.kamoku_status,
        }));
        setData(processedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    if (isNaN(pushedClassFrameDetail.day)) {
      console.log("pushedClassFrameDetail.dayはNaNです");
    } else {
      console.log("pushedClassFrameDetail.dayはNaNではありません");
    }

    setDodata(false);
  }, [dodata]);

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
