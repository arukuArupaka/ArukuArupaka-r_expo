import React from 'react';
import {Text, View} from 'react-native';
import MapMyselfContainer from '../../component/Map/MapMyselfContainer';
import {useSelector,useDispatch} from 'react-redux';
import { handleLoginAfterPageName } from '../../redux/actions/commonAction';

const MapFriendsView = ({ navigation }) => {

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  const dispatch: Dispatch = useDispatch();
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)
  if(!isLogin||isLoginNotVerificationEmail){
    dispatch(handleLoginAfterPageName('Map',{ screen: 'friends' }))//ログイン後にどこの画面に遷移するのか、app.js で定義してる名前を入力 他のところではちゃんと定義してね import { handleLoginAfterPageName } from '../../redux/actions/commonAction';←これいる
    navigation.navigate('login')//なんとかして、app.js で定義してるloginって名前のコンポーネントに画面遷移させて
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <MapMyselfContainer/>
      <Text>友達リスト</Text>
    </View>
  );
};
export default MapFriendsView;
