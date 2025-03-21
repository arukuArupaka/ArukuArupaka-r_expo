import { View, Text } from "react-native";
import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import State from "../../redux/states/userState";
import { handleLoginAfterPageName } from "../../redux/actions/commonAction";
import FriendRegisterCameraContainer from "../../component/TimeTable/FriendRegister/FriendRegisterCameraContainer";
import { RootStackParamList } from "../../component/TimeTable/types/root-stack-param-list";

const TimeTableFriendRegisterVIew = () => {
  const isLogin: boolean = useSelector(
    (state: State) => state.user.isLogin || false
  ); //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  const isLoginNotVerificationEmail: boolean = useSelector(
    (state: State) => state.user.isLoginNotVerificationEmail || false
  );
  const dispatch: Dispatch<any> = useDispatch();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    if (!isLogin || isLoginNotVerificationEmail) {
      dispatch(handleLoginAfterPageName("TimeTableFriendRegister")); //ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではちゃんと定義してね import { handleLoginAfterPageName } from '../../redux/actions/commonAction';←これいる
      navigation.navigate("login"); //なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
    }
  }, []);
  return <FriendRegisterCameraContainer />;
};

export default TimeTableFriendRegisterVIew;
