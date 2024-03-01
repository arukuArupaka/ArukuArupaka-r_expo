// TimeTableContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const TimeTableContext = createContext();

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [weekTimeQty, setWeekTimeQty] = useState(5);
  const [sizechange, setSizechange] = useState(false);
  const [timesize, setTimesize] = useState(625.5);
  const [padding, setPadding] = useState(0);
  const [department, setDepartment] = useState();
  const [season, setSeason] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [dodata, setDodata] = useState(false);
  const [pushedClassFrameDetail,setPushedClassFrameDetail]=useState({
    day:"",
    period:"",
  });

  const toggleSwitch = () => setSizechange(previousState => !previousState);
  
  useEffect(() => {
    // sizechange または weekTimeQty が変更された場合にのみ実行
    const newSize = sizechange ? getTimeSize(weekTimeQty) : 625.5;
    const newPad = sizechange ? getpadding(weekTimeQty) : 100;
    setTimesize(newSize);
    setPadding(newPad);
  }, [sizechange, weekTimeQty]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/time_table/get/all/search/?kamoku_department=${department}&kamoku_day=${day}&kamoku_time=${time}&kamoku_season=${season}`);
        if (!response.ok) {
          console.log('HTTP status code:', response.status);
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        // ここでデータを加工してからセット
        const processedData = json.map(item => ({
          kamoku_name: item.kamoku_name, // 仮のプロパティ名
          kamokuid: item.kamokuid,
          kamoku_resume: item.kamoku_resume, // 仮のプロパティ名
          kamoku_class: item.kamoku_class,
          kamoku_day: item.kamoku_day,
          kamoku_time: item.kamoku_time,
          kamoku_unit: item.kamoku_unit,
          kamoku_department: item.kamoku_department,
          kamoku_season: item.kamoku_season,
          kamoku_num: item.kamoku_num // 必要に応じて加工
        }));
        setData(processedData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [dodata]); // dodataが更新されたときに再フェッチ

  useEffect(() => {
    setDodata(false)
}, [dodata]);

  

  // Timesize の計算
  const getTimeSize = (qty) => {
    let top = 625.5;
    switch (qty) {
      case 5:
        top = 625.5;
        break;
      case 6:
        top = 750.6;
        break;
      case 7:
        top = 875.7;
        break;
      default:
        top = 625.5;
    }
    return top;
  };

  const getpadding = (qty) => {
    switch(qty){
      case 5:
        pad = 100;
        break;
      case 6:
        pad = 100;
        break;
      case 7:
        pad = 100;
        break;
      default:
        pad = 0;
    }
    return pad;

    };

  return (
    <TimeTableContext.Provider value={{ timesize, weekTimeQty, setWeekTimeQty, sizechange, setSizechange, toggleSwitch, padding, department, setDepartment, show, setShow, season, setSeason, time, setTime, day, setDay, data, setData, dodata, setDodata, pushedClassFrameDetail, setPushedClassFrameDetail}}>
      { children }
    </TimeTableContext.Provider>
  );
};
