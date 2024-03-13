import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Bottan = () => {
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [smallImagePosition, setSmallImagePosition] = useState({ x: 0, y: 0 });
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // コンポーネントのマウント時にAsyncStorageから保存された位置情報を読み込む
  useEffect(() => {
    const loadSavedPositions = async () => {
      try {
        const savedPositionsJson = await AsyncStorage.getItem(
          "bottanPositions"
        );
        if (savedPositionsJson) {
          const savedPositions = JSON.parse(savedPositionsJson);
          setSelectedAlphabet(savedPositions.selectedAlphabet);
          setSelectedNumber(savedPositions.selectedNumber);
          setCurrentImage(savedPositions.currentImage);
          setSmallImagePosition(savedPositions.smallImagePosition);
          setIsSwitchOn(savedPositions.isSwitchOn);
        }
      } catch (error) {
        console.error("保存された位置情報の読み込みエラー:", error);
      }
    };

    loadSavedPositions();
  }, []);

  // 位置情報が変更されたときにAsyncStorageに保存する
  useEffect(() => {
    const savePositions = async () => {
      try {
        const positionsToSave = {
          smallImagePosition,
          selectedAlphabet,
          selectedNumber,
          currentImage,
          isSwitchOn,
        };
        await AsyncStorage.setItem(
          "bottanPositions",
          JSON.stringify(positionsToSave)
        );
      } catch (error) {
        console.error("位置情報の保存エラー:", error);
      }
    };

    savePositions();
  }, [
    smallImagePosition,
    selectedAlphabet,
    selectedNumber,
    currentImage,
    isSwitchOn,
  ]);

  const alphabets = ["A", "B", "C", "D", "E"];
  const numbers = [1, 2, 3, 4, 5, 6, 7];

  const handleAlphabetPress = (alphabet) => {
    if (!isSwitchOn) {
      // Switchがオフの場合のみ処理を実行
      if (selectedAlphabet === alphabet) {
        // 同じアルファベットが再度押された場合、非選択状態にする
        setSelectedAlphabet(null);
        setSelectedNumber(null); // アルファベットが再度選択された場合、画像も非表示にする
        setCurrentImage(null); // アルファベットが非選択状態になったら、現在の画像をリセット
      } else {
        setSelectedAlphabet(alphabet);
      }
    }
  };

  const handleNumberPress = (number) => {
    if (!isSwitchOn) {
      // Switchがオフの場合のみ処理を実行
      setSelectedNumber(number);
    }
  };

  const handleImagePress = (event) => {
    if (selectedAlphabet && selectedNumber && !isSwitchOn) {
      const { locationX, locationY } = event.nativeEvent;

      // 小さい画像の幅と高さの半分
      const smallImageWidth = 50; // 小さい画像の幅
      const smallImageHeight = 50; // 小さい画像の高さ

      // クリックされた位置から小さい画像の中心に配置するための計算
      const x = locationX - smallImageWidth / 2;
      const y = locationY - smallImageHeight / 2;

      setSmallImagePosition({ x, y });
      setCurrentImage(`${selectedAlphabet}${selectedNumber}`);
    }
  };

  const toggleSwitch = () => {
    setIsSwitchOn((prevState) => !prevState);
    setIsSaving((prevState) => !prevState); // Switchの状態に基づいてisSaving状態を更新
  };

  const getImageForCombination = () => {
    if (selectedAlphabet && selectedNumber) {
      const imageName = `${selectedAlphabet}${selectedNumber}`;
      switch (imageName) {
        case "A1":
          return require("./map.png"); // Update the file path
        case "A2":
          return require("./map.png");
        // Add cases for other combinations
        case "A3":
          return require("./map.png");
        case "A4":
          return require("./map.png");
        case "A5":
          return require("./map.png");
        case "A6":
          return require("./map.png");
        case "A7":
          return require("./map.png");
        case "B1":
          return require("./map.png");
        case "B2":
          return require("./map.png");
        // Add cases for other combinations
        case "B3":
          return require("./map.png");
        case "B4":
          return require("./map.png");
        case "B5":
          return require("./map.png");
        case "B6":
          return require("./map.png");
        case "C1":
          return require("./map.png");
        case "C2":
          return require("./map.png");
        // Add cases for other combinations
        case "C3":
          return require("./map.png");
        case "C4":
          return require("./map.png");
        case "C5":
          return require("./map.png");
        case "C6":
          return require("./map.png");
        case "D1":
          return require("./map.png");
        case "D2":
          return require("./map.png");
        // Add cases for other combinations
        case "D3":
          return require("./map.png");
        case "D4":
          return require("./map.png");
        case "D5":
          return require("./map.png");
        case "D6":
          return require("./map.png");
        case "E1":
          return require("./map.png");
        case "E2":
          return require("./map.png");
        // Add cases for other combinations
        case "E3":
          return require("./map.png");
        case "E4":
          return require("./map.png");
        case "E5":
          return require("./map.png");
        case "E6":
          return require("./map.png");
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          marginLeft: "55%",
          marginTop: "5%",
        }}
      >
        <Text>固定する</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSwitchOn ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isSwitchOn}
        />
      </View>
      <View
        style={{
          marginLeft: "55%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "blue",
          }}
        >
          {isSaving
            ? `${selectedAlphabet} - ${selectedNumber}に保存中`
            : `${selectedAlphabet} - ${selectedNumber}を表示中`}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginTop: "48%",
            marginLeft: "-25%",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {alphabets.map((alphabet, index) => (
            <TouchableOpacity
              key={index}
              style={[
                {
                  width: "18%",
                  height: 61,
                  padding: "2.5%",
                  margin: "1.5%",
                  borderWidth: 1,
                  borderRadius: 5,
                },
                getColorForAlphabet(alphabet),
                selectedAlphabet === alphabet && {
                  backgroundColor: "lightblue",
                },
              ]}
              onPress={() => handleAlphabetPress(alphabet)}
              disabled={isSwitchOn} // Switchがオンの場合、ボタンを無効にする
            >
              <Text
                style={{
                  fontSize: 30, // Set the desired font size for alphabet text
                  paddingLeft: "25%",
                  paddingBottom: "15%",
                }}
              >
                {alphabet}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            paddingTop: "5%",
            marginLeft: "-35%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {selectedAlphabet && (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {numbers.map((number, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      {
                        width: "49%",
                        height: 61,
                        padding: "8%",
                        margin: "4%",
                        borderWidth: 1,
                        borderRadius: 5,
                      },
                      selectedNumber === number && {
                        backgroundColor: "lightgreen",
                      },
                      getColorForAlphabet(selectedAlphabet),
                    ]}
                    onPress={() => handleNumberPress(number)}
                    disabled={isSwitchOn} // Switchがオンの場合、ボタンを無効にする
                  >
                    <Text
                      style={{
                        fontSize: 30, // Set the desired font size for number text
                        paddingLeft: "25%",
                        paddingBottom: "15%",
                      }}
                    >
                      {number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {selectedAlphabet && selectedNumber && (
              <View onTouchEnd={(event) => handleImagePress(event)}>
                <Image
                  source={getImageForCombination()}
                  style={{
                    width: 166,
                    height: 525,
                  }}
                />
                {smallImagePosition.x > 0 &&
                  smallImagePosition.y > 0 &&
                  currentImage === `${selectedAlphabet}${selectedNumber}` && (
                    <View
                      style={[
                        {
                          position: "absolute",
                          width: "3%",
                          height: "3%",
                        },
                        {
                          left: smallImagePosition.x,
                          top: smallImagePosition.y,
                        },
                      ]}
                    >
                      {/* ここに小さい画像の要素を追加 */}
                      {/* 例: <Image source={require('./smallImage.png')} style={styles.smallImage} /> */}
                      <Image
                        source={require("./bike20.png")}
                        style={{
                          position: "absolute",
                          width: 50,
                          height: 50,
                        }}
                      />
                    </View>
                  )}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const getColorForAlphabet = (alphabet) => {
  switch (alphabet) {
    case "A":
      return { borderColor: "darkred" };
    case "B":
      return { borderColor: "darkblue" };
    case "C":
      return { borderColor: "darkorange" };
    case "D":
      return { borderColor: "darkpurple" };
    case "E":
      return { borderColor: "darkgreen" };
    default:
      return { borderColor: "darkgray" };
  }
};

export default Bottan;
