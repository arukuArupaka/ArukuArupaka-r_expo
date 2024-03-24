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
  const [searchword, setSearchword] = useState('');
  const [deletekoma, setDeletekoma] = useState(false);
  const [komaborder, setKomaborder] = useState(false);
  const [unitCalc, setUnitCalc] = useState(false);
  const [unitSum, setUnitSum] = useState(0);
  const [multicolor, setMulticolor] = useState('#888888');
  const [colorset, setColorset] = useState(false);
  const [kamokuStatus, setKamokuStatus] = useState();
  const [pushedClassFrameDetail,setPushedClassFrameDetail]=useState({
    day: NaN,
    period: NaN,
  });

  const weekTimeSaveData=[
    [{day:0,period:0,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:0,period:1,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:0,period:2,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:0,period:3,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:0,period:4,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:0,period:5,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:0,period:6,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"}],
    [{day:1,period:0,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:1,period:1,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:1,period:2,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:1,period:3,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:1,period:4,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:1,period:5,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:1,period:6,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"}],
    [{day:2,period:0,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:2,period:1,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:2,period:2,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:2,period:3,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:2,period:4,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:2,period:5,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:2,period:6,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"}],
    [{day:3,period:0,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:3,period:1,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:3,period:2,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:3,period:3,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:3,period:4,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:3,period:5,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:3,period:6,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"}],
    [{day:4,period:0,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:4,period:1,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:4,period:2,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:4,period:3,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:4,period:4,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:4,period:5,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"},{day:4,period:6,className:"",classRoom:"",memo:"",notifion:false,notification:"",department:"",unit:0,num:"",resume:"",teacher:"",status:"",color:"#888888",mulcolor:"#888888",statuscolor:"#888888"}],
  ]

  const [weekTime,setWeekTime]=useState(weekTimeSaveData);

  const [kamokuItem, setKamokuItem] = useState({
    day: pushedClassFrameDetail.day,
    period: pushedClassFrameDetail.period,
    classRoom: "",
    className: "",
    memo: "",
    notifion: false,
    notification: "",
    department: "",
    unit: 0,
    num: "",
    resume: "",
    teacher: "",
    status: "",
    color: "#888888",
    mulcolor: "#888888",
    statuscolor: "#888888"
  });

  const toggleSwitch = () => setSizechange(previousState => !previousState);
  const notifiSwitch = () => setNodata(previousState => !previousState);
  const statusSwitch = () => setKamokuStatus(previousState => !previousState);
  
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
          kamoku_num: item.kamoku_num,
          kamoku_teacher: item.kamoku_teacher, // 必要に応じて加工
          kamoku_status: item.kamoku_status
        }));
        setData(processedData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
    //console.log(time);
    console.log(pushedClassFrameDetail.day);
    console.log(typeof weekTime);
    if (isNaN(pushedClassFrameDetail.day)) {
      console.log('pushedClassFrameDetail.dayはNaNです');
  } else {
      console.log('pushedClassFrameDetail.dayはNaNではありません');
  }
  
    
    //setPushedClassFrameDetail({day: day-0, period: period-0});
    //console.log('コンポーネントマウントされました');
    setDodata(false);
  }, [dodata]); // dodataが更新されたときに再フェッチ  

  useEffect(() => {
    if(isNaN(pushedClassFrameDetail.day)){
      console.log('存在しないため削除が実行されませんでした');
    }else{
      const nullKamoku = {
        day: pushedClassFrameDetail.day,
        period: pushedClassFrameDetail.period,
        classRoom: "",
        className: "",
        memo: "",
        notifion: false,
        notification: "",
        department: "",
        unit: "",
        num: "",
        resume: "",
        teacher: "",
        status: "",
        color: "#888888",
        mulcolor: "#888888",
        statuscolor: "#888888"
      };
    
    setWeekTime((prev) => {prev[pushedClassFrameDetail.day][pushedClassFrameDetail.period]=nullKamoku; return prev});
    console.log(weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].color);
    }
    setDeletekoma(false);
    console.log('delete時の色分けは');
    //console.log(weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period]);
  },[deletekoma]);

  useEffect(() => {
    const onSubmit = async (pushedClassFrameDetail, classDetail) => {
      setWeekTime((prev) => {
        // 範囲チェックを追加
        if (isNaN(pushedClassFrameDetail.day)) {
          console.log('NaNだからonSubmitは実行できません');
        }else{
          //console.log(kamokuItem);
          prev[pushedClassFrameDetail.day][pushedClassFrameDetail.period] = classDetail;
          console.log('onSubmitでobject');
          if(kamokuShow == true){
            setIsInfoShow(true);
          }
        }
        return [...prev];
      });
    };
    onSubmit(pushedClassFrameDetail, kamokuItem);

    setIndata(false);
    console.log('indataをfalseに変更');
    console.log(kamokuItem);
    //console.log(weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].className);
    //if(pushedClassFrameDetail){
      //if(weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].className){
        //console.log('存在します');
      //}
    //}
  }, [indata]); 

  useEffect(() => {

    const onSubmit = async (pushedClassFrameDetail) => {
        let dayof=0;
        let periof=0;
        let sumof = 0;
        let ids = [];
        let redu = 0;
        let res = 0;
      if(isNaN(pushedClassFrameDetail.day)){
        sumof = 0;
      }else{
        for(dayof=0;dayof<5;dayof++){
          for(periof=0;periof<7;periof++){
            if(weekTime[dayof][periof].unit != ""){
              sumof += Number(weekTime[dayof][periof].unit);
              if(ids.length > 0){
                ids.map((id, index) => {
                  if(id == weekTime[dayof][periof].num){
                    redu += Number(weekTime[dayof][periof].unit);
                  }
                });
                ids = [...ids, weekTime[dayof][periof].num]
              }else{
                ids = [...ids, weekTime[dayof][periof].num];
              }
            }
          }
        }
        res = sumof - redu;
      }
        return res; 

    };
    
    const fetchSum = async () => {
      const sum = await onSubmit(pushedClassFrameDetail);
      setUnitSum(sum);
      setUnitCalc(false);
    };
    //console.log(weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].className);
    //if(pushedClassFrameDetail){
      //if(weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].className){
        //console.log('存在します');
      //}
    //}
    fetchSum();
  }, [unitCalc]);

  useEffect(() => {
    // 条件に一致するアイテムの数をカウントする
    const matchingCount = data.reduce((acc, item) => {
      const index = item.kamoku_name.indexOf(searchword);
      return index !== -1 ? acc + 1 : acc;
    }, 0);
  
    // カウントをステートに保存
    setCount(matchingCount);
  }, [data, searchword]);

  useEffect(()=>{
    if(isNaN(pushedClassFrameDetail.day)){
      console.log('初期コンポーネントマウントです');
    }else{
      console.log('色変えが実行されたよ');
      const nullKamoku = {
        day: pushedClassFrameDetail.day,
        period: pushedClassFrameDetail.period,
        classRoom: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].classRoom,
        className: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].className,
        memo: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].memo,
        notifion: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].notifion,
        notification: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].notification,
        department: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].department,
        unit: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].unit,
        num: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].num,
        resume: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].resume,
        teacher: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].teacher,
        status: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].status,
        color: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].color,
        mulcolor: `${multicolor}`,
        statuscolor: weekTime[pushedClassFrameDetail.day][pushedClassFrameDetail.period].statuscolor
      };
      setWeekTime((prev) => {prev[pushedClassFrameDetail.day][pushedClassFrameDetail.period]=nullKamoku; return prev});
      setColorset(false);
    }

  },[colorset]);

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
    <TimeTableContext.Provider value={{ kamokuStatus, setKamokuStatus, statusSwitch, colorset, setColorset, multicolor, setMulticolor, timesize, weekTimeQty, setWeekTimeQty, sizechange, setSizechange, toggleSwitch, padding, department, setDepartment, show, setShow, season, setSeason, time, setTime, day, setDay, data, setData, dodata, setDodata, pushedClassFrameDetail, setPushedClassFrameDetail, weekTime, setWeekTime, indata, setIndata, kamokuItem, setKamokuItem, period, setPeriod, nodata, setNodata, notifiSwitch, isInfoShow, setIsInfoShow, kamokuShow, setKamokuShow, count, setCount, searchword, setSearchword, deletekoma, setDeletekoma, unitCalc, setUnitCalc, unitSum, setUnitSum}}>
      { children }
    </TimeTableContext.Provider>
  );
};
