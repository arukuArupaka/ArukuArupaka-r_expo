// import React, { useState,useEffect } from 'react';
// import { StyleSheet, View, FlatList, Text, TouchableOpacity,Image } from 'react-native';
// import { useHits } from 'react-instantsearch-core';
// import { Data } from '../../../../component/Textbook/Data.API';
// import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
// import * as Notifications from 'expo-notifications';
// import { doc, getDoc } from '@firebase/firestore';
// import { storage,db } from "../../../../../firebase";
// import { useDispatch } from 'react-redux';
// import { handleTextBookAction } from '../../../../redux/actions/textBookAction';

// export function InfiniteHits({ hitComponent: Hit, navigation, ...props }) {




//   const [news, setNews] = useState(Data);

//   const { hits, } = useHits({
//     ...props,
//     escapeHTML: false,
//   });

//   const dispatch = useDispatch();

//   return (

//     <FlatList
//       data={hits}
//       keyExtractor={(item) => item.objectID}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       renderItem={({ item }) => (
//         <TouchableOpacity onPress={() => {


//           // console.log(item);
//           navigation.navigate('ホーム', { screen: '本画面', params: { screen: 'ホーム', params: { screen: 'サーチ詳細', params: { searchID: item.objectID ,news: item} } } });
//           dispatch(handleTextBookAction(item.objectID))
//         }}>
//           <View style={styles.item}>
//             <Hit hit={item} />
//             <Image source={{ uri: item.images[0] }} style={{ width: 50, height: 50 }} />
//           </View>
//         </TouchableOpacity>
//       )}
//     />

//   );
// };

// const styles = StyleSheet.create({
//   separator: {
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   item: {
//     padding: 18,
//     flexDirection: 'row',
//   },
// });
