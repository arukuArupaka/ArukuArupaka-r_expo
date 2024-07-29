import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Weather from "../component/weather/Weather";

const WeatherView = () => {
  return (
    <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Weather />
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeatherView;
