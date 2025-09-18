import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";

// 固定配列で ID(1-10) とローカル画像を対応付け
const iconSources: ImageSourcePropType[] = [
  require("../assets/icons/icon1.png"),
  require("../assets/icons/icon2.png"),
  require("../assets/icons/icon3.png"),
  require("../assets/icons/icon4.png"),
  require("../assets/icons/icon5.png"),
  require("../assets/icons/icon6.png"),
  require("../assets/icons/icon7.png"),
  require("../assets/icons/icon8.png"),
  require("../assets/icons/icon9.png"),
  require("../assets/icons/icon10.png"),
];

export const iconIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const getIconSourceById = (id: number): ImageSourcePropType => {
  if (!Number.isInteger(id) || id < 1 || id > 10) return iconSources[0];
  return iconSources[id - 1];
};

export const getRandomIconId = (): number => Math.floor(Math.random() * 10) + 1;

export type IconByIdProps = {
  id: number;
  size?: number;
  style?: StyleProp<ImageStyle>;
};

// どこでも簡単に使える ID 指定のアイコン表示コンポーネント
export default function IconById({ id, size = 50, style }: IconByIdProps) {
  return (
    <Image
      source={getIconSourceById(id)}
      style={[{ width: size, height: size }, style]}
    />
  );
}
