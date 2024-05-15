import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const HomeCarousel = ({ navigation }) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Django APIからデータを取得
    axios
      .get("https://render-test-db-h83h.onrender.com/home/photo/")
      .then((response) => {
        setImages(response.data);
      });
  }, []);

  const _carousel = useRef();

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeWebSite", { uri: item.carousel_url });
        }}
      >
        {item.image?<Image
          source={{ uri: item.image }}
          style={{
            height: 200,
            width: 300,
            borderRadius: 10,
            borderWidth: 0.9,
            borderColor: "black",
          }}
        />:  <View 
        style={{
          height: 200,
          width: 300,
          borderRadius: 10,
          borderWidth: 0.9,
          paddingVertical:100
          }}><ActivityIndicator size="large" style={{marginVertical:'auto'}}></ActivityIndicator></View>      }
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* <View style={{ position: "relative", alignItems: "center" }}>
      {images.length?<Carousel
          ref={_carousel}
          data={images}
          renderItem={_renderItem}
          itemWidth={300}
          sliderWidth={450}
          onSnapToItem={(index) => setActiveDotIndex(index)}
          loop={true}
        ></Carousel>:  <View 
        style={{
          height: 200,
          width: 300,
          borderRadius: 10,
          borderWidth: 0.9,
          paddingVertical:100
          }}><ActivityIndicator size="large" style={{marginVertical:'auto'}}></ActivityIndicator></View>      }
        <TouchableOpacity
          style={{
            position: "absolute",
            left: "0%",
            top: "30%",
            width: 40,
            height: 80,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            padding: 8,
          }}
          onPress={() => {
            _carousel.current.snapToItem(activeDotIndex - 1);
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={30}
            color="#30CB89"
          ></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: "0%",
            top: "30%",
            width: 40,
            height: 80,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            padding: 8,
            transform: [{ rotate: "180deg" }],
          }}
          onPress={() => {
            _carousel.current.snapToItem(activeDotIndex + 1);
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={30}
            color="#30CB89"
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
      <Pagination
        carouselRef={_carousel}
        activeDotIndex={activeDotIndex}
        dotsLength={images.length}
        inactiveDotStyle={{ backgroundColor: "#BBBBBB" }}
        dotStyle={{ backgroundColor: "#30CB89" }}
      ></Pagination> */}
    </View>
  );
};

export default HomeCarousel;
