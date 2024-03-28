import {View, Text} from 'react-native';
import { Textbook_FlatList } from '../../../../../component/Textbook/Textbook_FlatList';

export const Law = ({navigation}) => {

  return(
    <Textbook_FlatList majorname={"法学部"} navigation={navigation}/>
  )
}