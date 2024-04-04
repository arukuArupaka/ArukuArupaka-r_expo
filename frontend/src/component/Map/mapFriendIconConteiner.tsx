import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import { db } from '../../../firebase';
import { doc,getDoc, onSnapshot } from 'firebase/firestore';
import { getDownloadURL,ref } from 'firebase/storage';
import MapUserIcon from './mapUserIcon';
import { storage } from '../../../firebase';
//import { firebase } from '@react-native-firebase/firestore';

const MapFriendIconContainer = (props) => {

    const [friendData,setFriendData]=useState({imageURI: "", myLocation: {latitude: 0, longitude: 0}, userName: ""}
    )
    const [friendImageURI,setFriendImageURI]=useState("")

    useEffect(()=>{
      console.log('asse')

        // getFriendDate()

        console.log('as')
        const refFiresrore = doc(db, `mapGPS/${props.friendUUID}`);
       //   const getFriendData=await (await getDoc(refFiresrore)).data()
       //   console.log('ICONs')
       //   console.log(getFriendData)
       //   setFriendData(getFriendData)
       //   getDownloadURL(ref(storage, `users/${props.friendUUID}/mainPicture`)).then((getURI)=>{
       //     setFriendImageURI(getURI)
       // })
 
       const unsubscribe=onSnapshot(refFiresrore,(data)=>{
           console.log(" data: ", data.data());
           setFriendData(data.data())
 
       })
 
       getDownloadURL(ref(storage, `users/${props.friendUUID}/mainPicture`)).then((getURI)=>{
         setFriendImageURI(getURI)
       })
 
       return () => {
         unsubscribe();
       };
    }, []);

    console.log('ass')

    const getFriendDate=async()=>{

      console.log('as')
       const refFiresrore = await doc(db, `mapGPS/${await props.friendUUID}`);
      //   const getFriendData=await (await getDoc(refFiresrore)).data()
      //   console.log('ICONs')
      //   console.log(getFriendData)
      //   setFriendData(getFriendData)
      //   getDownloadURL(ref(storage, `users/${props.friendUUID}/mainPicture`)).then((getURI)=>{
      //     setFriendImageURI(getURI)
      // })

      const unsubscribe=onSnapshot(refFiresrore,(data)=>{
          console.log(" data: ", data.data());
          setFriendData(data.data())

      })

      getDownloadURL(ref(storage, `users/${props.friendUUID}/mainPicture`)).then((getURI)=>{
        setFriendImageURI(getURI)
      })

      return () => {
        unsubscribe();
      };

    }

  return (
<MapUserIcon imageURI={friendImageURI} title={friendData.userName} location={friendData.myLocation}></MapUserIcon>
    );
};
export default MapFriendIconContainer;