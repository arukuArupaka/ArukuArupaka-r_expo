import React,{useState} from 'react';
import {View, Text,FlatList,TouchableOpacity,StyleSheet,ScrollView,Platform} from 'react-native';
import { Data } from '../../../../../component/Textbook/Data.API';
import { Poster } from '../../../../../component/Textbook/Poster';

export const Science_and_Engineering = ({navigation}) => {

  const[news,setNews] = useState(Data);
  const numColumns = 3;


  return(
    <ScrollView>
        <FlatList
        data={news}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        flashScrollIndicators
        renderItem={({ item }) => (

                <TouchableOpacity 
                    style={styles.BookContainer}  
                    onPress={() => navigation.navigate("サーチ詳細", {news: item})}
                >
                    <Poster posterPath={item.poster_path} imageHeight={150}/>

                    <View style={{borderRadius:10,backgroundColor:'#777',width:'70%'}}>
                        <Text numberOfLines={1} style={styles.BookPrice}>￥{item.price}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.BookTitle}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.BookclassTitle}>#{item.classname}</Text>

                </TouchableOpacity>
          

        )}>
    </FlatList>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  BookContainer: {
      width: '32.3%',
      marginHorizontal: '0.5%',
      backgroundColor:'#fff',
    //   borderWidth:'4%',
    //   borderColor:'#fff',
      marginTop:'2%',
    //   padding:'1%'
  },
  BookTitle: {
      color: '#111',
      fontSize: 16,
      fontWeight:'bold'
  },
  BookclassTitle: {
    color: '#555',
    fontSize: 16,
    fontWeight:'bold'
},
  BookPrice: {
      color: '#fff',
      width:'100%',
      fontSize:20,
      textAlign:'center',
      paddingTop:Platform.OS==='android' ? 0:3,
      paddingBottom:Platform.OS==='android' ? 3:3,
  }
})