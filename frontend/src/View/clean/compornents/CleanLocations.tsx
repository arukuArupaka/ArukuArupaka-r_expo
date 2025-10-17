import { ImageSourcePropType } from "react-native";

export type CleanLocation = {
  name: string;
  latitude: number;
  longitude: number;
  icon: ImageSourcePropType;
};

export const CleanLocation: CleanLocation[] = [
  {
    name: "フォレストハウス 1階 プロムナード側入口付近",
    latitude: 34.980715,
    longitude: 135.963739,
    icon: require("../assets/image/CleanLocation.png"),
  },
];

export default CleanLocation;
