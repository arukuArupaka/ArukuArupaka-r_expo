import {View,Text,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderforTextbook2 } from '../../../../component/Textbook/HeaderforTextbook2';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MyPageHome = ({navigation}) => {
  return(
    <View>
      <HeaderforTextbook2/>
      <View style={styles.main}>
        <View
          style={{
            justifyContent: 'space-between',
            width: "80%",
            height: '80%'
          }}>

          <ThreeBox boxname='購入した商品' iconName='hand-coin' Screen='マイページグッズ' navigation={navigation} Color='mediumseagreen' IconColor='seagreen'/>
          <ThreeBox boxname='お気に入り' iconName='cards-heart' Screen='マイページお気に入り' navigation={navigation} Color='gold' IconColor='orange'/>
          <ThreeBox boxname='出品した商品' iconName='hand-pointing-right' Screen='マイページ出品' navigation={navigation} Color='skyblue' IconColor='dodgerblue'/>

        </View>
      </View>
    </View>
  )
}

const ThreeBox = (props) => {
  const { navigation } = props; // Extracting navigation from props
  return (
    <TouchableOpacity style={[styles.box,{backgroundColor:props.Color,borderColor:props.IconColor}]}
      onPress={() => navigation.navigate(props.Screen)}
    >
      <MaterialCommunityIcons name={props.iconName} size={80} color={props.IconColor} />
      <Text style={styles.BoxText}>{props.boxname}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  main:{
    height:Platform.OS==='ios' ?'88%' : '92%',
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  box: {
    height: '28%',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
  },

  BoxText: {
    fontSize: 36,
    color: 'black'
  }
})