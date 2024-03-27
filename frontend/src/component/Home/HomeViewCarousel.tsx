import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { MaterialIcons } from "@expo/vector-icons";

const HomeCarousel = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://render-test-db-h83h.onrender.com/home/photo/")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const _carousel = useRef();

  //カルーセルの中身
  const _renderItem = ({ item, index }) => {
    return (
      <Image
        source={{ uri: item.image }}
        style={{ height: 200, width: 300 }}
      ></Image>
    );
  };

  return (
    <View>
      <View style={{ position: "relative" }}>
        <Carousel
          ref={_carousel}
          data={images}
          renderItem={_renderItem}
          itemWidth={300}
          sliderWidth={450}
          onSnapToItem={(index) => setActiveDotIndex(index)}
          loop={true}
        ></Carousel>
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
        dotsLength={5}
        inactiveDotStyle={{ backgroundColor: "#BBBBBB" }}
        dotStyle={{ backgroundColor: "#30CB89" }}
      ></Pagination>
    </View>
  );
};

export default HomeCarousel;
