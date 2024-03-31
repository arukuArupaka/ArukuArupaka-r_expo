import React from "react";
import { View, ScrollView } from "react-native";
import Weather from "../component/weather/Weather";

const WeatherView = () => {
  return (
    <ScrollView>
      <Weather />
    </ScrollView>
  );
};

export default WeatherView;
