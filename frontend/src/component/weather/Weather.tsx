import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  backendWeatherVotesUrl,
  currentWeatherUrl,
  weatherForecastUrl,
  weatherIconUrl,
  moonInformationUrl,
} from "../../consts/urls";
import {
  formatDateAsHHmm,
  formatDateAsISO8601WithoutTime,
} from "../../utils/formatDate";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const Weather = () => {
  const apiKey = "8c2f6bbbd0df6dcd73cd7cf494b66bce";
  const weatherDictionary = {
    // 日本になさそうな天気が多くて訳語が難しい
    Thunderstorm: "雷雨",
    Drizzle: "小雨",
    Rain: "雨",
    Snow: "雪",
    Mist: "靄",
    Smoke: "煙",
    Haze: "煙霧",
    Dust: "粉塵",
    Fog: "霧",
    Sand: "砂",
    Ash: "灰",
    Squall: "スコール",
    Tornado: "竜巻",
    Clear: "晴れ",
    Clouds: "曇り",
  };

  const moonAgeToMoonPhase = (moonAge: number) => {
    if ((0 <= moonAge && moonAge <= 1) || (29 <= moonAge && moonAge <= 30)) {
      return "moon-new";
    } else if (2 <= moonAge && moonAge <= 4) {
      return "moon-waxing-crescent";
    } else if (5 <= moonAge && moonAge <= 8) {
      return "moon-first-quarter";
    } else if (9 <= moonAge && moonAge <= 12) {
      return "moon-waxing-gibbous";
    } else if (13 <= moonAge && moonAge <= 17) {
      return "moon-full";
    } else if (18 <= moonAge && moonAge <= 21) {
      return "moon-waning-gibbous";
    } else if (22 <= moonAge && moonAge <= 25) {
      return "moon-last-quarter";
    } else if (26 <= moonAge && moonAge <= 28) {
      return "moon-waning-crescent";
    }
  };
  const [city, setCity] = useState("Kusatsu");
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [tomorrowWeatherData, setTomorrowWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const [rainyHours, setRainyHours] = useState([
    {
      clouds: { all: 100 },
      dt: 1711907000,
      dt_txt: "2024-03-31 18:00:00",
      main: {
        feels_like: 12.71,
        grnd_level: 997,
        humidity: 89,
        pressure: 1010,
        sea_level: 1010,
        temp: 13.03,
        temp_kf: 1.66,
        temp_max: 13.03,
        temp_min: 11.37,
      },
      pop: 0,
      rain: { "3h": 0.21 },
      sys: { pod: "n" },
      visibility: 10000,
      weather: [[Object]],
      wind: { deg: 6, gust: 1.62, speed: 1.1 },
    },
  ]);
  const [sunrise, setSunrise] = useState(new Date());
  const [sunset, setSunset] = useState(new Date());
  const [moonAge, setMoonAge] = useState(null);
  const [votes, setVotes] = useState({
    sunny: 0,
    cloudy: 0,
    rainy: 0,
    other: 0,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        console.log("weatherURL:", currentWeatherUrl(city, apiKey));
        const response = await axios.get(currentWeatherUrl(city, apiKey));
        setCurrentWeatherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather dataooo:", error);
      }
    };

    const fetchTomorrowWeather = async () => {
      try {
        const response = await axios.get(weatherForecastUrl(city, apiKey));
        //console.log("API Response1:", response.data); // デバッグ情報としてレスポンスをログに出力

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const listFiltered =
          response.data.list?.filter((item) => item !== undefined) || []; // undefinedをフィルタリング
        const tomorrowData =
          listFiltered.find((item) => {
            // `dt`プロパティへの安全なアクセス
            if (item && typeof item.dt === "number") {
              console.log("item.dt:", item.dt);
              const itemDate = new Date(item.dt * 1000);
              return (
                itemDate.getDate() === tomorrow.getDate() &&
                itemDate.getMonth() === tomorrow.getMonth() &&
                itemDate.getFullYear() === tomorrow.getFullYear()
              );
            }
            return false;
          }) || null;

        if (tomorrowData === null) {
          console.error("No weather data available for tomorrow.");
        } else {
          setTomorrowWeatherData(tomorrowData);
        }
      } catch (error) {
        console.error("Error fetching tomorrow's weather dataooo:", error);
      }
    };

    const fetchHourlyWeather = async () => {
      try {
        const response = await axios.get(weatherForecastUrl(city, apiKey));
        const currentTime = new Date().getTime() / 1000;
        const filteredData = response.data.list.filter(
          (item) => item.dt >= currentTime + 36 * 3600
        );
        setHourlyWeatherData(filteredData);

        // Find rainy hours
        const rainyHours = filteredData.filter(
          (item) =>
            item.weather[0].main === "Rain" &&
            item.weather[0].main === "Thunderstorm" &&
            item.weather[0].main === "Drizzle"
        );
        // console.log('rainyhours1');
        // console.log('rainyHours1',rainyHours[0].pop);
        // setRainyHours(rainyHours);
      } catch (error) {
        console.error("Error fetching hourly weather dataooo:", error);
      }
    };

    const fetchSunriseSunset = async () => {
      try {
        const response = await axios.get(currentWeatherUrl(city, apiKey));
        setSunrise(new Date(response.data.sys.sunrise * 1000));
        setSunset(new Date(response.data.sys.sunset * 1000));
      } catch (error) {
        console.error("Error fetching sunrise/sunset data:", error);
      }
    };

    const fetchMoonAge = async () => {
      const todayDate = new Date();
      try {
        const response = await axios.get(
          moonInformationUrl(formatDateAsISO8601WithoutTime(todayDate))
        );
        setMoonAge(Math.round(response.data.result[0].age));
      } catch (error) {
        console.error("Error fetching moon phase data:", error);
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await axios.get(backendWeatherVotesUrl);
        setVotes(response.data);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchWeatherData();
    fetchTomorrowWeather();
    fetchHourlyWeather();
    fetchSunriseSunset();
    fetchMoonAge();
    fetchVotes();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(currentWeatherUrl(city, apiKey));
        setCurrentWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather dataaaa:", error);
      }
    };

    const fetchTomorrowWeather = async () => {
      try {
        const response = await axios.get(weatherForecastUrl(city, apiKey));
        //console.log("API Response2:", response.data); // デバッグ情報としてレスポンスをログに出力

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const listFiltered =
          response.data.list?.filter((item) => item !== undefined) || []; // undefinedをフィルタリング
        const tomorrowData =
          listFiltered.find((item) => {
            // `dt`プロパティへの安全なアクセス
            if (item && typeof item.dt === "number") {
              const itemDate = new Date(item.dt * 1000);
              return (
                itemDate.getDate() === tomorrow.getDate() &&
                itemDate.getMonth() === tomorrow.getMonth() &&
                itemDate.getFullYear() === tomorrow.getFullYear()
              );
            }
            return false;
          }) || null;

        console.log(tomorrowData);

        if (tomorrowData === null) {
          console.error("No weather data available for tomorrow.");
        } else {
          setTomorrowWeatherData(tomorrowData);
        }
      } catch (error) {
        console.error("Error fetching tomorrow's weather dataaaa:", error);
      }
    };

    const fetchHourlyWeather = async () => {
      try {
        const response = await axios.get(weatherForecastUrl(city, apiKey));
        const currentTime = new Date().getTime() / 1000;
        const filteredData = response.data.list.filter(
          (item) => item.dt < currentTime + 36 * 3600
        );
        setHourlyWeatherData(filteredData);

        // Find rainy hours
        const rainyHours = filteredData.filter(
          (item) =>
            item.weather[0].main === "Rain" ||
            item.weather[0].main === "Thunderstorm" ||
            item.weather[0].main === "Drizzle"
        );
        console.log("rainyHours2");
        console.log("rainyHours", rainyHours[0].pop);
        setRainyHours(rainyHours);
      } catch (error) {
        console.error("Error fetching hourly weather dataaa:", error);
      }
    };

    const fetchSunriseSunset = async () => {
      try {
        const response = await axios.get(currentWeatherUrl(city, apiKey));
        setSunrise(new Date(response.data.sys.sunrise * 1000));
        setSunset(new Date(response.data.sys.sunset * 1000));
      } catch (error) {
        console.error("Error fetching sunrise/sunset data:", error);
      }
    };

    fetchWeatherData();
    fetchTomorrowWeather();
    fetchHourlyWeather();
    fetchSunriseSunset();
  }, [city]);

  const vote = async (option) => {
    try {
      await axios.post(
        "https://render-test-db-h83h.onrender.com/weather/vote/",
        `option=${option}`
      );
      // 更新された投票結果を再取得
      const response = await axios.get(
        "https://render-test-db-h83h.onrender.com/weather/votes/"
      );
      setVotes(response.data);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <View style={styles.container}>
      {currentWeatherData &&
      tomorrowWeatherData &&
      hourlyWeatherData &&
      sunrise &&
      sunset &&
      moonAge &&
      rainyHours ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 9,
              paddingLeft: 20,  
              paddingRight: 20, 
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity 
            onPress={()=>setCity("Kusatsu")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 3, 
              padding: 5,
              backgroundColor: "#f0f0f0",
              borderWidth: 1, 
              borderColor: city=="Kusatsu" ? "#6D84FF" : "#f0f0f0", 
              borderRadius: 5, 
            }}><Text style={{ marginTop: 5, fontSize: 16 ,textAlign: 'center'}}>草津</Text>
            </TouchableOpacity>
            
            
            
            <TouchableOpacity 
             onPress={()=>setCity("Kyoto")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 3, 
              padding: 5,
              backgroundColor: "#f0f0f0",
              borderWidth: 1, 
              borderColor: city=="Kyoto" ? "#6D84FF" : "#f0f0f0",
              borderRadius: 5, 
            }}><Text style={{ marginTop: 5, fontSize: 16 ,textAlign: 'center'}}>衣笠</Text>
            </TouchableOpacity>
           

            
            <TouchableOpacity
             onPress={()=>setCity("Takatsuki")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 3, 
              padding: 5,
              backgroundColor: '#f0f0f0', 
              borderWidth: 1.5,
              borderColor: city=="Takatsuki" ? "#6D84FF":'#f0f0f0',
              borderRadius: 5, 
            }}><Text style={{ marginTop: 5, fontSize: 16 ,textAlign: 'center'}}>茨木</Text>
            </TouchableOpacity>
          </View>                 
                  
            {/*cke<RNPirSelect
              onValueChange={(value) => setCity(value)}
              items={[
                { label: "草津", value: "Kusatsu" },
                { label: "衣笠", value: "Kyoto" },
                { label: "茨木", value: "Takatsuki" },
              ]}
              value={city}
              placeholder={{}}
              Icon={() => (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              )}
              style={{
                inputIOS: {
                  width: 60,
                  height: 22,
                  fontSize: 12,
                  paddingLeft: 6,
                  borderWidth: 1.5,
                  borderColor: "#007AFF",
                  borderRadius: 5,
                  backgroundColor: "#dddddd",
                },
                inputAndroid: {
                  width: 60,
                  height: 22,
                  fontSize: 12,
                  paddingLeft: 6,
                  borderWidth: 1.5,
                  borderColor: "#007AFF",
                  borderRadius: 5,
                  backgroundColor: "#fff",
                },
              }}
            /> */}
          
          
          <View
            style={{
              height: 595,
              paddingTop: 9,
              paddingBottom: 18,
              paddingHorizontal: 22,
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#30cb89",
                height: 50,
                borderRadius: 5,
              }}
            >
              {rainyHours[0].pop > 0.5 ? (
                <Text style={{ fontSize: 18 }}>
                  {formatDateAsHHmm(new Date(rainyHours[0].dt * 1000))}
                  から雨が降る予報です。
                </Text>
              ) : (
                <Text style={{ fontSize: 18 }}>
                  今日は雨は降らない予報です。
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: 16, height: 185 }}>
              {/* 今日の天気 */}
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "rgba(27, 177, 231, 0.3)",
                  marginRight: 9,
                  borderRadius: 5,
                  flex: 1,
                }}
              >
                <Text style={{ marginTop: 8 }}>今日</Text>
                <Image
                  source={{
                    uri: weatherIconUrl(tomorrowWeatherData.weather[0].icon),
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    marginTop: 3,
                  }}
                /> 
                
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {weatherDictionary[currentWeatherData.weather[0].main]}
                </Text>
                <Text style={{ marginTop: 8, fontSize: 16 }}>
                  {currentWeatherData.main.humidity}
                  <Text style={{ fontSize: 12 }}>{"%"}</Text>
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {Math.round(currentWeatherData.main.temp_min)}
                  <Text style={{ fontSize: 12 }}>{"℃ "}</Text>
                  {"- "}
                  {Math.round(currentWeatherData.main.temp_max)}
                  <Text style={{ fontSize: 12 }}>{"℃ "}</Text>
                </Text>
              </View>

              {/* 明日の天気 */}
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "rgba(235, 54, 55, 0.3)",
                  borderRadius: 5,
                  flex: 1,
                }}
              >
                <Text style={{ marginTop: 8 }}>明日</Text>
                <Image
                  source={{
                    uri: weatherIconUrl(tomorrowWeatherData.weather[0].icon),
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    marginTop: 3,
                  }}
                />
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {weatherDictionary[tomorrowWeatherData.weather[0].main]}
                </Text>
                <Text style={{ marginTop: 8, fontSize: 16 }}>
                  {tomorrowWeatherData.main.humidity}
                  <Text style={{ fontSize: 12 }}>{"%"}</Text>
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {Math.round(tomorrowWeatherData.main.temp_min)}
                  <Text style={{ fontSize: 12 }}>{"℃ "}</Text>
                  {"- "}
                  {Math.round(tomorrowWeatherData.main.temp_max)}
                  <Text style={{ fontSize: 12 }}>{"℃ "}</Text>
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 16, height: 104 }}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "rgba(235, 54, 55, 0.3)",
                  marginRight: 9,
                  borderRadius: 5,
                  flex: 1,
                }}
              >
                <Text style={{ marginTop: 7 }}>日の出</Text>
                <Image
                  source={require("./sunrise.png")}
                  style={{ marginTop: 7, height: 42, width: 42 }}
                />
                <Text style={{ marginTop: 7, fontSize: 16 }}>
                  {formatDateAsHHmm(sunrise)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: 9,
                  backgroundColor: "rgba(27, 177, 231, 0.3)",
                  borderRadius: 5,
                  flex: 1,
                }}
              >
                <Text style={{ marginTop: 7 }}>日の入り</Text>
                <Image
                  source={require("./sunset.png")}
                  style={{ marginTop: 7, height: 42, width: 42 }}
                />
                <Text style={{ marginTop: 7, fontSize: 16 }}>
                  {formatDateAsHHmm(sunset)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 203, 8, 0.3)",
                  borderRadius: 5,
                  flex: 1,
                }}
              >
                <Text style={{ marginTop: 7 }}>月の満ち欠け</Text>
                <MaterialCommunityIcons
                  name={moonAgeToMoonPhase(moonAge)}
                  size={30}
                  style={{ marginTop: 13 }}
                />
                <Text style={{ marginTop: 11, fontSize: 16 }}>{moonAge}</Text>
              </View>
            </View>
            {hourlyWeatherData && hourlyWeatherData.length > 0 ? (
              <ScrollView
                horizontal={true}
                style={{
                  height: 199,
                  marginTop: 16,
                  backgroundColor: "rgba(201, 255, 245, 0.8)",
                  borderWidth: 1.2,
                  borderRadius: 5,
                }}
              >
                {hourlyWeatherData.map((hourData, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      width: 80,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        height: 170,
                        borderRightWidth:
                          index !== hourlyWeatherData.length - 1 ? 1 : 0,
                        borderRightColor: "rgba(136, 136, 136, 1)",
                      }}
                    >
                      <Text style={{ marginTop: 6 }}>
                        {formatDateAsHHmm(new Date(hourData.dt * 1000))}
                      </Text>
                      <Image
                        source={{
                          uri: weatherIconUrl(hourData.weather[0].icon),
                        }}
                        style={{ width: 50, height: 50, marginTop: 9 }}
                      />
                      <Text style={{ marginTop: 8, fontSize: 16 }}>
                        {hourData.main.humidity}
                        <Text style={{ fontSize: 12 }}>{"%"}</Text>
                      </Text>
                      <Text style={{ marginTop: 8, fontSize: 16 }}>
                        {Math.round(hourData.main.temp)}
                        <Text style={{ fontSize: 12 }}>{"℃ "}</Text>
                      </Text>
                      <Text style={{ marginTop: 8, fontSize: 16 }}>
                        {Math.round(hourData.wind.speed * 10) / 10}
                        <Text style={{ fontSize: 12 }}>{"m/s"}</Text>
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>一時間ごとの天気予報がありません。</Text>
            )}
          </View>
          {/*投票機能 */}
          <View
            style={{
              backgroundColor: "rgba(248, 248, 248, 1)",
              height: "100%",
            }}
          >
            <Text style={{ marginTop: 14, marginLeft: 18, fontSize: 16 }}>
              リアルタイムで投票しよう！
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  width: 81,
                  height: 100,
                  borderWidth: 2,
                  borderColor: "#F36F21",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "column", alignItems: "center" }}
                  onPress={() => vote("sunny")}
                >
                  <Text style={{ marginTop: 5, fontSize: 16 }}>晴れ</Text>
                  <Image
                    source={require("./sunny.png")}
                    style={{ marginTop: 3, height: 40, width: 40 }}
                  />
                  <Text style={{ marginTop: 3, fontSize: 16 }}>
                    {votes.sunny}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 81,
                  height: 100,
                  borderWidth: 2,
                  borderColor: "#FFCB08",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "column", alignItems: "center" }}
                  onPress={() => vote("cloudy")}
                >
                  <Text style={{ marginTop: 5, fontSize: 16 }}>曇り</Text>
                  <Image
                    source={require("./cloud.png")}
                    style={{ marginTop: 3, height: 40, width: 40 }}
                  />
                  <Text style={{ marginTop: 3, fontSize: 16 }}>
                    {votes.cloudy}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 81,
                  height: 100,
                  borderWidth: 2,
                  borderColor: "#1bb1e7",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "column", alignItems: "center" }}
                  onPress={() => vote("rainy")}
                >
                  <Text style={{ marginTop: 5, fontSize: 16 }}>雨</Text>
                  <Image
                    source={require("./rainy.png")}
                    style={{ marginTop: 3, height: 40, width: 40 }}
                  />
                  <Text style={{ marginTop: 3, fontSize: 16 }}>
                    {votes.rainy}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 81,
                  height: 100,
                  borderWidth: 2,
                  borderColor: "#00A651",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "column", alignItems: "center" }}
                  onPress={() => vote("other")}
                >
                  <Text style={{ marginTop: 5, fontSize: 16 }}>その他</Text>
                  <Image
                    source={require("./question.png")}
                    style={{ marginTop: 3, height: 40, width: 40 }}
                  />
                  <Text style={{ marginTop: 3, fontSize: 16 }}>
                    {votes.other}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.loaderContainer}>
         <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Weather;
