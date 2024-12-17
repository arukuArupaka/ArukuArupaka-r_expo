
// import React, { useEffect } from 'react';
// import { Alert } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import firestore from '@react-native-firebase/firestore';

// const YourComponent = () => {
//   useEffect(() => {
//     const subscribe = async () => {
//       // ユーザーに通知の許可を求める
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('Authorization status:', authStatus);

//         // デバイスのトークンを取得
//         const token = await messaging().getToken();
//         const userId = 'ユーザーID'; // 実際のユーザーIDに置き換えてください

//         // Firestoreにデバイストークンを保存
//         firestore()
//           .collection('tokens')
//           .add({
//             userId: userId,
//             token: token,
//           })
//           .then(() => {
//             console.log('Token stored in firestore');
//           })
//           .catch((error) => {
//             console.error('Error storing token: ', error);
//           });
//       } else {
//         Alert.alert('Can\'t handle push notifications');
//       }
//     };

//     subscribe();
//   }, []);

// };

// export default YourComponent;
