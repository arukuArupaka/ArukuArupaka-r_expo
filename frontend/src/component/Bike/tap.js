import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons"; // @expo/vector-iconsからFontAwesome5をインポート

class ImageScrollComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickX: null,
      clickY: null,
      disableChangePosition: false,
    };
    this.scrollViewRef = React.createRef();
  }

  // コンポーネントのマウント時にAsyncStorageから保存された位置情報を読み込む
  componentDidMount() {
    this.loadSavedPositions();
  }

  // 位置情報が変更されたときにAsyncStorageに保存する
  savePositions = () => {
    const { clickX, clickY, disableChangePosition } = this.state;
    const scrollY = this.scrollViewRef.current
      ? this.scrollViewRef.current.contentOffset
      : 0;

    const positionsToSave = {
      clickX,
      clickY,
      disableChangePosition,
      scrollY,
    };

    AsyncStorage.setItem(
      "imageScrollPositions",
      JSON.stringify(positionsToSave)
    ).catch((error) => console.error("位置情報の保存エラー:", error));
  };

  // Async storage からデータを読み込み、表示する位置にスクロールする
  loadSavedPositions = async () => {
    try {
      const savedPositionsJson = await AsyncStorage.getItem(
        "imageScrollPositions"
      );
      if (savedPositionsJson) {
        const savedPositions = JSON.parse(savedPositionsJson);
        this.setState(
          {
            clickX: savedPositions.clickX,
            clickY: savedPositions.clickY,
            disableChangePosition: savedPositions.disableChangePosition,
          },
          () => {
            // ロード後にアイコンを設定
            this.scrollToClickPosition();
          }
        );
        this.scrollToPosition(savedPositions.scrollY);
      }
    } catch (error) {
      console.error("保存された位置情報の読み込みエラー:", error);
    }
  };

  // 画面が切り替えられた際に呼ばれるメソッド
  handleScreenChange = () => {
    // アイコンの位置をAsyncStorageから読み込んで表示
    this.loadSavedPositions();
  };

  // コンポーネントがアンマウントされる際に呼ばれるメソッド
  componentWillUnmount() {
    // アイコンの位置を保存
    this.savePositions();
  }

  handleImageClick = (event) => {
    const { disableChangePosition } = this.state;
    const { locationX, locationY } = event.nativeEvent;

    // クリック位置が既にセットされている場合は処理しない
    if (disableChangePosition) {
      return;
    }

    const { width: imageWidth, height: imageHeight } =
      this.getImageDimensions();
    const clickXOnImage = (locationX * imageWidth) / this.getScrollViewWidth();
    const clickYOnImage =
      (locationY * imageHeight) / this.getScrollViewHeight();

    this.setState({ clickX: clickXOnImage, clickY: clickYOnImage });
  };

  getScrollViewWidth = () => {
    return 1453; // 大きな画像の幅
  };

  getScrollViewHeight = () => {
    return 454; // 大きな画像の高さ
  };

  getImageDimensions = () => {
    return { width: 1453, height: 454 }; // 大きな画像の幅と高さ
  };

  scrollToPosition = (yPosition) => {
    this.scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
  };

  toggleChangePosition = () => {
    // クリックしたときに表示する画像の位置変更可能性を切り替える
    this.setState((prevState) => ({
      disableChangePosition: !prevState.disableChangePosition,
    }));
  };

  scrollToClickPosition = () => {
    // クリックした位置にスクロール
    const { clickX, clickY } = this.state;
    if (clickX !== null && clickY !== null) {
      const scrollX =
        (clickX * this.getScrollViewWidth()) / this.getImageDimensions().width -
        200;
      this.scrollToPosition(scrollX);
    }
  };

  render() {
    const { clickX, clickY } = this.state;
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: "1%" }}>
          <Text style={{ fontSize: 20 }}>南草津駅</Text>
        </View>
        <ScrollView
          ref={this.scrollViewRef}
          horizontal={true}
          style={{ width: "100%", height: 404 }}
        >
          {/* 大きな画像 */}
          <Image
            source={require("../BikeImage/map.jpg")}
            style={{ width: 1453, height: "120%", marginTop: "-70" }}
          />

          <TouchableOpacity
            onPress={this.handleImageClick}
            style={{
              position: "absolute",
              width: this.getScrollViewWidth(),
              height: this.getScrollViewHeight(),
            }}
          >
            {/* クリックした位置でアイコンを表示 */}
            {clickX !== null && clickY !== null && (
              <FontAwesome5
                name="biking"
                size={25}
                color="#FF0000"
                style={{
                  top: clickY - 25,
                  left: clickX - 25,
                  position: "absolute",
                }}
              />
            )}
          </TouchableOpacity>
        </ScrollView>

        <View style={{ marginLeft: "50%" }}>
          <Text style={{ fontSize: 25 }}>大学</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#30CB89",
            width: "40%",
            height: "6%",
            borderRadius: 66,
            marginLeft: "57%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../BikeImage/push_pin.png")}
              style={{ marginLeft: "12%" }}
            />
            <Text
              style={{
                marginRight: "1%",
                color: "white",
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              {" "}
              固定する
            </Text>
          </View>
          <Switch
            value={this.state.disableChangePosition}
            onValueChange={this.toggleChangePosition}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={
              this.state.disableChangePosition ? "#f5dd4b" : "#f4f3f4"
            }
          />
        </View>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginTop: "1%" }}
        >
          <TouchableOpacity
            onPress={() => this.scrollToPosition(0)}
            style={{
              height: "45%",
              width: "17%",
              borderWidth: 3,
              borderColor: "#ffa081",
              paddingLeft: "4%",
              borderRadius: 4,
              marginLeft: "11.5%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                paddingLeft: "15%",
                paddingTop: "10%",
                fontWeight: 400,
                color: "#010101",
              }}
            >
              A
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.scrollToPosition(200)}
            style={{
              height: "45%",
              width: "17%",
              borderWidth: 3,
              borderColor: "#fd97bc",
              paddingLeft: "4%",
              borderRadius: 4,
              marginLeft: "11.5%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                paddingLeft: "15%",
                paddingTop: "10%",
                fontWeight: 400,
                color: "#010101",
              }}
            >
              B
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.scrollToPosition(530)}
            style={{
              height: "45%",
              width: "17%",
              borderWidth: 3,
              borderColor: "#384cfe",
              paddingLeft: "4%",
              borderRadius: 4,
              marginLeft: "11.5%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                paddingLeft: "15%",
                paddingTop: "10%",
                fontWeight: 400,
                color: "#010101",
              }}
            >
              C
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.scrollToPosition(900)}
            style={{
              height: "45%",
              width: "17%",
              borderWidth: 3,
              borderColor: "#ff74b7",
              paddingLeft: "4%",
              borderRadius: 4,
              marginLeft: "11.5%",
              marginTop: "3%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                paddingLeft: "15%",
                paddingTop: "10%",
                fontWeight: 400,
                color: "#010101",
              }}
            >
              D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.scrollToPosition(1453)}
            style={{
              height: "45%",
              width: "17%",
              borderWidth: 3,
              borderColor: "#2EDF60",
              paddingLeft: "4%",
              borderRadius: 4,
              marginLeft: "11.5%",
              marginTop: "3%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                paddingLeft: "15%",
                paddingTop: "10%",
                fontWeight: 400,
                color: "#010101",
              }}
            >
              E
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.scrollToClickPosition}
            style={{
              height: "45%",
              width: "17%",
              borderWidth: 3,
              borderColor: "#000",
              paddingLeft: "-12%",
              borderRadius: 4,
              marginLeft: "11.5%",
              marginTop: "3%",
            }}
          >
            <FontAwesome5
              name="biking"
              color="#FF0000"
              size={35}
              style={{ marginLeft: "12%", marginTop: "5%" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ImageScrollComponent;
