import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [tomorrowWeatherData, setTomorrowWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [rainyHours, setRainyHours] = useState([]);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const apiKey = "8c2f6bbbd0df6dcd73cd7cf494b66bce";
  const city = "Kusatsu";
  const sunriseSunsetApiUrl = `https://api.sunrise-sunset.org/json?lat=35.016&lng=135.850&date=today&formatted=0`;
  const [votes, setVotes] = useState({
    sunny: 0,
    cloudy: 0,
    rainy: 0,
    other: 0,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchTomorrowWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        // Find tomorrow's data
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tomorrowData = response.data.list.find((item) => {
          const itemDate = new Date(item.dt * 1000);
          return (
            itemDate.getDate() === tomorrow.getDate() &&
            itemDate.getMonth() === tomorrow.getMonth() &&
            itemDate.getFullYear() === tomorrow.getFullYear()
          );
        });

        setTomorrowWeatherData(tomorrowData);
      } catch (error) {
        console.error("Error fetching tomorrow's weather data:", error);
      }
    };

    const fetchHourlyWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const currentTime = new Date().getTime() / 1000;
        const filteredData = response.data.list.filter(
          (item) => item.dt < currentTime + 36 * 3600
        );
        setHourlyWeatherData(filteredData);

        // Find rainy hours
        const rainyHours = filteredData.filter(
          (item) => item.weather[0].main === "Rain"
        );
        setRainyHours(rainyHours);
      } catch (error) {
        console.error("Error fetching hourly weather data:", error);
      }
    };

    const fetchSunriseSunset = async () => {
      try {
        const response = await axios.get(sunriseSunsetApiUrl);
        setSunrise(response.data.results.sunrise);
        setSunset(response.data.results.sunset);
      } catch (error) {
        console.error("Error fetching sunrise/sunset data:", error);
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/weather/votes/"
        );
        setVotes(response.data);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchWeatherData();
    fetchTomorrowWeather();
    fetchHourlyWeather();
    fetchSunriseSunset();
    fetchVotes();
  }, []);

  const ICON_URL = "https://openweathermap.org/img/wn/";

  const vote = async (option) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/weather/vote/",
        `option=${option}`
      );
      // 更新された投票結果を再取得
      const response = await axios.get(
        "http://127.0.0.1:8000/weather/votes/"
      );
      setVotes(response.data);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <View>
      {weatherData &&
      tomorrowWeatherData &&
      hourlyWeatherData &&
      sunrise &&
      sunset &&
      rainyHours ? (
        <View>
          <View
            style={{
              backgroundColor: "#00ff7f",
              marginLeft: "10%",
              marginTop: "1%",
              width: "80%",
              height: "5%",
              borderRadius: 5,
            }}
          >
            <View style={{ paddingLeft: "10%", paddingTop: "2%" }}>
              {rainyHours.length > 0 ? (
                <Text>{rainyHours[0].dt_txt}から雨が降る予報です。</Text>
              ) : (
                <Text>今日は一日，雨は降らない予報です。</Text>
              )}
            </View>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: "5%", height: "28%" }}
          >
            {/* 今日の天気 */}

            <View
              style={{
                backgroundColor: "#1BB1E7",
                marginLeft: "7%",
                width: "40%",
                borderRadius: 5,
              }}
            >
              <View>
                <Text style={{ textAlign: "center", marginTop: "3%" }}>
                  今日
                </Text>
                <Image
                  source={{
                    uri: `${ICON_URL}${weatherData.weather[0].icon}@2x.png`,
                  }}
                  style={{
                    width: "50%",
                    height: "42%",
                    marginLeft: "25%",
                    marginTop: "10%",
                  }}
                />
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>
                  降水確率:{" "}
                  {weatherData.rain ? `${weatherData.rain["1h"]} mm` : "なし"}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    padding: "1%",
                  }}
                >
                  {weatherData.weather[0].main}
                </Text>
                <View>
                  <Text style={{ textAlign: "center" }}>
                    {Math.floor(weatherData.main.temp_max)}° -{" "}
                    {Math.floor(weatherData.main.temp_min)}°
                  </Text>
                </View>
              </View>
            </View>

            {/* 明日の天気 */}
            <View
              style={{
                backgroundColor: "#F88E8F",
                width: "40%",
                marginLeft: "8%",
                borderRadius: 5,
              }}
            >
              <View>
                <Text style={{ textAlign: "center", marginTop: "3%" }}>
                  明日
                </Text>
                <Image
                  source={{
                    uri: `${ICON_URL}${tomorrowWeatherData.weather[0].icon}@2x.png`,
                  }}
                  style={{
                    width: "50%",
                    height: "42%",
                    marginLeft: "25%",
                    marginTop: "10%",
                  }}
                />
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>
                  降水確率:{" "}
                  {tomorrowWeatherData.rain
                    ? `${tomorrowWeatherData.rain["3h"]} mm`
                    : "なし"}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {tomorrowWeatherData.weather[0].main}
                </Text>
                <View>
                  <Text style={{ textAlign: "center" }}>
                    {Math.floor(tomorrowWeatherData.main.temp_max)}° -{" "}
                    {Math.floor(tomorrowWeatherData.main.temp_min)}°
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: "5%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "40%",
                backgroundColor: "#FAE494",
                marginLeft: "8%",
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center" }}>日の出</Text>
              <Image
                source={require("./snurise.png")}
                style={{ marginLeft: "40%", paddingTop: "12%" }}
              />
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: "3%",
                  paddingBottom: "10%",
                }}
              >
                {sunrise}
              </Text>
            </View>
            <View
              style={{
                width: "40%",
                height: "100%",
                marginLeft: "8%",
                backgroundColor: "#1BB1E7",
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center" }}>日の入り</Text>
              <Image
                source={require("./sunset.png")}
                style={{ marginLeft: "35%" }}
              />
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: "5%",
                  paddingBottom: "10%",
                }}
              >
                {sunset}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: "25%",
              marginTop: "5%",
              width: "100%",
            }}
          >
            {/* 一時間ごとの天気予報を横スクロールできるように表示 */}
            <View
              style={{
                height: "80%",
                backgroundColor: "#a9a9a9",
                borderRadius: 5,
              }}
            >
              {hourlyWeatherData && hourlyWeatherData.length > 0 ? (
                <ScrollView
                  horizontal
                  style={{ flexDirection: "row", flex: 1 }}
                >
                  {hourlyWeatherData.map((hourData, index) => (
                    <View key={index} style={{ width: "10%", padding: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          height: "20%",
                        }}
                      >
                        {hourData.dt_txt}
                      </Text>
                      <Image
                        source={{
                          uri: `${ICON_URL}${hourData.weather[0].icon}@2x.png`,
                        }}
                        style={{ width: 50, height: 50, alignSelf: "center" }}
                      />
                      <Text style={{ textAlign: "center" }}>
                        {hourData.weather[0].main}
                      </Text>
                      <Text style={{ textAlign: "center" }}>
                        {Math.floor(hourData.main.temp)}°
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text>一時間ごとの天気予報がありません。</Text>
              )}
            </View>
          </View>
          {/*投票機能 */}
          <View>
            <Text style={{ textAlign: "center" }}>
              リアルタイムで投票しよう！
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                width: "15%",
                height: "100%",
                borderRadius: 5,
                borderColor: "orange",
              }}
            >
              <TouchableOpacity onPress={() => vote("sunny")}>
                <Text style={{ textAlign: "center" }}>晴れ</Text>
                <Image
                  source={require("./sunny.png")}
                  style={{ marginLeft: "35%" }}
                />
                <Text style={{ textAlign: "center" }}>{votes.sunny}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "15%",
                height: "100%",
                marginLeft: "10%",
                borderRadius: 5,
                borderColor: "yellow",
              }}
            >
              <TouchableOpacity onPress={() => vote("cloudy")}>
                <Text style={{ textAlign: "center" }}>くもり</Text>
                <Image
                  source={require("./cloud.png")}
                  style={{ marginLeft: "35%" }}
                />
                <Text style={{ textAlign: "center" }}>{votes.cloudy}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "15%",
                height: "100%",
                marginLeft: "10%",
                borderRadius: 5,
                borderColor: "blue",
              }}
            >
              <TouchableOpacity onPress={() => vote("rainy")}>
                <Text style={{ textAlign: "center" }}>雨</Text>
                <Image
                  source={require("./rainy.png")}
                  style={{ marginLeft: "35%" }}
                />
                <Text style={{ textAlign: "center" }}> {votes.rainy}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "15%",
                height: "100%",
                marginLeft: "10%",
                borderRadius: 5,
                borderColor: "green",
              }}
            >
              <TouchableOpacity onPress={() => vote("other")}>
                <Text style={{ textAlign: "center" }}>その他</Text>
                <Image
                  source={require("./question.png")}
                  style={{ marginLeft: "35%" }}
                />
                <Text style={{ textAlign: "center" }}> {votes.other}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Text>天気情報が取得できませんでした。</Text>
      )}
    </View>
  );
};

export default Weather;
