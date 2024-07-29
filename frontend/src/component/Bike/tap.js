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
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // @expo/vector-iconsからMaterialIconsをインポート

class ImageScrollComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickX: null,
      clickY: null,
      disableChangePosition: false,
      switchTime: null,
    };
    this.scrollViewRef = React.createRef();
  }

  // コンポーネントのマウント時にAsyncStorageから保存された位置情報を読み込む
  componentDidMount() {
    this.loadSavedPositions();
  }

  // 位置情報が変更されたときにAsyncStorageに保存する
  savePositions = (clickGetX, clickGetY,switchTime) => {
    const { clickX, clickY, disableChangePosition } = this.state;
    const scrollY = this.scrollViewRef.current
      ? this.scrollViewRef.current.contentOffset
      : 0;

    const positionsToSave = {
      clickX:clickGetX,
      clickY:clickGetY,
      disableChangePosition,
      switchTime:switchTime,
      scrollY,
    };
    console.log(positionsToSave)

    AsyncStorage.setItem(
      "imageScrollPositions",
      JSON.stringify(positionsToSave)
    ).catch((error) => console.error("位置情報の保存エラー:", error));

    // AsyncStorage.setItem(
    //   "switchTime",
    //   JSON.stringify(positionsToSave)
    // ).catch((error) => console.error("位置情報の保存エラー:", error));
  };
  


  loadSavedPositions = async () => {
    try {
      const savedPositionsJson = await AsyncStorage.getItem(
        "imageScrollPositions"
      );
      if (savedPositionsJson) {
        console.log(savedPositionsJson)
        const savedPositions = JSON.parse(savedPositionsJson);
        this.setState(
          {
            clickX: savedPositions.clickX,
            clickY: savedPositions.clickY,
            disableChangePosition: savedPositions.disableChangePosition,
            switchTime: savedPositions.switchTime,
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
    try {
      const savedPositionsJson = await AsyncStorage.getItem(
        "switchTime"
      );
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
   // this.savePositions();
  }

  handleImageClick = (event) => {
    
    const { disableChangePosition } = this.state;

    const { switchTime } = this.state;
    const { locationX, locationY } = event.nativeEvent;
    

    // クリック位置が既にセットされている場合は処理しない
    if (disableChangePosition) {
      return;
    }
    const currentDate = new Date();
    this.setState((prevState) => ({
      switchTime: currentDate.toLocaleString(), // 現在の日時を更新
    }));
    const { width: imageWidth, height: imageHeight } =
      this.getImageDimensions();
    const clickXOnImage = (locationX * imageWidth) / this.getScrollViewWidth();
    const clickYOnImage =
      (locationY * imageHeight) / this.getScrollViewHeight();

    this.setState({ clickX: clickXOnImage, clickY: clickYOnImage });
    console.log(`switchTime: ${switchTime}`)
    this.savePositions(clickXOnImage, clickYOnImage, currentDate.toLocaleString())
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
    this.scrollViewRef.current.scrollTo({ x: yPosition, animated: true });
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
    const { clickX, clickY , switchTime} = this.state;
    return (
      <View style={{paddingBottom:20}}>
        <MaterialIcons name="arrow-back-ios-new" 
        size={30} 
        color="black" 
        style={{
          position: "absolute",
          zIndex:"100",
          transform: [{rotate: '90deg'}],
          marginTop: "15%",
          marginLeft: "40%",
          }}/>
        <Text style={{
          position:"absolute",
          zIndex:"100",
          fontSize:20,
          marginTop: "15%",
          marginLeft: "50%"}}>
          南草津駅
          </Text>
          <MaterialIcons name="arrow-back-ios-new" 
        size={30} 
        color="black" 
        style={{
          position: "absolute",
          zIndex:"100",
          transform: [{rotate: '270deg'}],
          marginTop: "110%",
          marginLeft: "40%",
          }}/>
        <Text style={{
          position:"absolute",
          zIndex:"100",
          fontSize:20,
          marginTop: "110%",
          marginLeft: "50%"}}>
          大学
          </Text>
          <MaterialIcons name="arrow-back-ios-new" 
        size={30} 
        color="black" 
        style={{
          position: "absolute",
          zIndex:"100",
          marginTop: "50%",
          marginLeft: "2%",
          }}/>
        <View style={{
          position:"absolute",
          flexDirection:'column',
          zIndex:"100",
          marginTop: "60%",
          marginRight: "90%",
          marginLeft:"3%"
          }}>
          <Text style={{fontSize:20}}>瀬田方面</Text>
          </View>
          <MaterialIcons name="arrow-back-ios-new" 
        size={30} 
        color="black" 
        style={{
          position: "absolute",
          zIndex:"100",
          transform: [{rotate: '180deg'}],
          marginTop: "50%",
          marginLeft: "90%",
          }}/>
        <View style={{
          position:"absolute",
          flexDirection:'column',
          zIndex:"100",
          marginTop: "60%",
          marginLeft: "92%"}}>
          <Text style={{fontSize:20}}>守山方面</Text>
          </View>
        <View style={{ alignItems: "center", justifyContent:"center", marginTop: "4%" }}/>
        <ScrollView
          ref={this.scrollViewRef}
          horizontal={true}
          style={{
             width: "100%",
              height: 404 }}
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
             <MaterialIcons name="directions-bike" 
             size={30}
             color="black"
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
        <View style={{ alignItems: "center", marginTop: "10%" }}/>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#30CB89",
            width: "45%",
            height: "7%",
            borderRadius: 65,
            marginLeft: "53%",
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
            trackColor={{ false: "#30cb89", true: "#FFFFFF" }}
            thumbColor={
              this.state.disableChangePosition ? "#30cb89" : "#FFFFFF"
            }
          />
        </View>
        <View>
        <Text
              style={{
                marginLeft: "50%",
                color: "black",
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              変更時間：{JSON.stringify(switchTime).substr(6,15) || '未設定'}
            </Text>
        </View>
        <Text
              style={{
                marginLeft: "5%",
                color: "black",
                fontSize: 20,
                fontWeight: 400,
              }}
            >
              {" "}
              移動する
            </Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginTop: "1%" }}
        >
          <TouchableOpacity
            onPress={() => this.scrollToPosition(0)}
            style={{
              height: "45%",
              width: "17%",
              borderWidth: 3,
              borderColor: "#ffcb08",
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
              borderColor: "#f36f21",
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
              borderColor: "#1bb1e7",
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
              borderColor: "#eb3637",
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
              borderColor: "#00a651",
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
              borderColor: "#1ed661",
              paddingLeft: "-12%",
              borderRadius: 4,
              marginLeft: "11.5%",
              marginTop: "3%",
            }}
          >
            <MaterialIcons name="directions-bike" 
            size={33}
            color="black"
              style={{ marginLeft: "22%", marginTop: "7%" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ImageScrollComponent;