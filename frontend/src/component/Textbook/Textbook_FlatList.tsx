import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Poster_List } from './Poster_List';

export const Textbook_FlatList = (props) => {
  const majorname = props.majorname
  const navigation = props.navigation;
  const [news, setNews] = useState(Object.keys(props.textBookList[0]).length !== 0?props.textBookList:[{images:[""],productName:"",department:"",price:""}]);
  const numColumns = 3;
 // const filteredNews = news.filter(item => item.major === majorname);
 console.log("props.textBookList")

console.log(Object.keys(props.textBookList[0]).length === 0)


  return (
    <ScrollView>
      {Object.keys(props.textBookList[0]).length !== 0&&
      <FlatList
        data={props.textBookList}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        flashScrollIndicators
        renderItem={({ item }) => (


          <TouchableOpacity
            style={styles.BookContainer}
            onPress={() => navigation.navigate("サーチ詳細", { news: item })}
          >
            <Poster_List posterPath={item.images[0]} imageHeight={170} price={item.price} />

            <Text numberOfLines={1} style={styles.BookTitle}>{item.productName}</Text>
            <Text numberOfLines={1} style={styles.BookclassTitle}>#{item.department}</Text>

          </TouchableOpacity>

        )}
      >
      </FlatList>}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  BookContainer: {
    width: '32.3%',
    marginHorizontal: '0.5%',
    backgroundColor: '#fffff0',
    marginTop: '2%',
    paddingBottom: '1%',
    borderRadius: 8
  },
  BookTitle: {
    color: '#111',
    fontSize: 16,
    fontWeight: 'bold'
  },
  BookclassTitle: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold'
  },
  BookPrice: {
    color: '#fff',
    width: '100%',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 3,
    paddingBottom: Platform.OS === 'android' ? 3 : 3,
  }
})
