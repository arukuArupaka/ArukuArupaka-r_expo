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

      let unsubscribe

      try{

        const refFiresrore = doc(db, `mapGPS/${props.friendUUID}`);
 
        unsubscribe=onSnapshot(refFiresrore,(data)=>{
           console.log("mapFriendIconContainer 25 snapshot", data.data());
           setFriendData(data.data())
 
       })
 
       getDownloadURL(ref(storage, `users/${props.friendUUID}/mainPicture`)).then((getURI)=>{
         setFriendImageURI(getURI)
       })
      }catch(error){
        console.log(error)
      }
 
       return () => {
         unsubscribe();
       };
    }, []);

  return (
<MapUserIcon imageURI={friendImageURI} title={friendData.userName} location={friendData.myLocation}></MapUserIcon>
    );
};
export default MapFriendIconContainer;