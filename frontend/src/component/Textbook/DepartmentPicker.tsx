// DepartmentPicker.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const DepartmentPicker = ({ onSelect }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onSelect("法学部：法学科")}>
        <Text>法学部：法学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("産業社会学部：現代社会学科")}>
        <Text>産業社会学部：現代社会学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("国際関係学部：国際関係学科")}>
        <Text>国際関係学部：国際関係学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("文学部：人文学科")}>
        <Text>文学部：人文学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("経営学部：経営学科")}>
        <Text>経営学部：経営学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("経営学部：国際経営学科")}>
        <Text>経営学部：国際経営学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("政策科学部：政策科学科")}>
        <Text>政策科学部：政策科学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("総合心理学部：総合心理学科")}>
        <Text>総合心理学部：総合心理学科</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("グローバル教育学部：グローバル教育学科")}
      >
        <Text>グローバル教養学部：グローバル教育学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("映像学部：映像学科")}>
        <Text>映像学部：映像学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("情報理工学部：情報理工学科")}>
        <Text>情報理工学部：情報理工学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("経済学部：経済学科")}>
        <Text>経済学部：経済学科</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("スポーツ健康科学部：スポーツ健康科学科")}
      >
        <Text>スポーツ健康科学部：スポーツ健康科学科</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("食マネジメント学部：食マネジメント学科")}
      >
        <Text>食マネジメント学部：食マネジメント学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("理工学部：数理科学科")}>
        <Text>理工学部：数理科学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("理工学部：物理科学科")}>
        <Text>理工学部：物理科学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("理工学部：電気電子工学科")}>
        <Text>理工学部：電気電子工学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("理工学部：電子情報工学科")}>
        <Text>理工学部：電子情報工学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("理工学部：機械工学科")}>
        <Text>理工学部：機械工学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("理工学部：ロボティクス学科")}>
        <Text>理工学部：ロボティクス学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("理工学部：環境都市工学科")}>
        <Text>理工学部：環境都市工学科</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("理工学部：建築都市デザイン学科")}
      >
        <Text>理工学部：建築都市デザイン学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("生命科学部：応用科学科")}>
        <Text>生命科学部：応用科学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("生命科学部：生物工学科")}>
        <Text>生命科学部：生物工学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("生命科学部：生命情報学科")}>
        <Text>生命科学部：生命情報学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("生命科学部：生命医科学科")}>
        <Text>生命科学部：生命医科学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("薬学部：薬学科")}>
        <Text>薬学部：薬学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("薬学部：創薬科学科")}>
        <Text>薬学部：創薬科学科</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect("教養科目")}>
        <Text>教養科目</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DepartmentPicker;
