import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Data } from './Data.API';
import { Poster_List } from './Poster_List';

export const Textbook_FlatList = (props) => {
  const majorname = props.majorname
  const navigation = props.navigation;
  const [news, setNews] = useState(Data);
  const numColumns = 3;
  const filteredNews = news.filter(item => item.major === majorname);



  return (
    <ScrollView>

      <FlatList
        data={filteredNews}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        flashScrollIndicators
        renderItem={({ item }) => (


          <TouchableOpacity
            style={styles.BookContainer}
            onPress={() => navigation.navigate("サーチ詳細", { news: item })}
          >
            <Poster_List posterPath={item.poster_path} imageHeight={170} price={item.price} />

            <Text numberOfLines={1} style={styles.BookTitle}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.BookclassTitle}>#{item.classname}</Text>

          </TouchableOpacity>

        )}
      >
      </FlatList>

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
