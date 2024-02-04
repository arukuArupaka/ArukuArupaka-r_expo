// TimeTableContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const TimeTableContext = createContext();

export const useTimeTable = () => useContext(TimeTableContext);

export const TimeTableProvider = ({ children }) => {
  const [weekTimeQty, setWeekTimeQty] = useState(5);
  const [sizechange, setSizechange] = useState(false);
  const [timesize, setTimesize] = useState(625.5);
  const [padding, setPadding] = useState(0);

  const toggleSwitch = () => setSizechange(previousState => !previousState);
  
  useEffect(() => {
    // sizechange または weekTimeQty が変更された場合にのみ実行
    const newSize = sizechange ? getTimeSize(weekTimeQty) : 625.5;
    const newPad = sizechange ? getpadding(weekTimeQty) : 100;
    setTimesize(newSize);
    setPadding(newPad);
  }, [sizechange, weekTimeQty]);

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
    <TimeTableContext.Provider value={{ timesize, weekTimeQty, setWeekTimeQty, sizechange, setSizechange, toggleSwitch, padding }}>
      { children }
    </TimeTableContext.Provider>
  );
};
