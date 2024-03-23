import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import { db } from '../../../firebase';
import { doc,getDoc } from 'firebase/firestore';
import { getDownloadURL,ref } from 'firebase/storage';
import MapUserIcon from './mapUserIcon';
import { storage } from '../../../firebase';

const MapFriendIconContainer = (props) => {

    const [friendData,setFriendData]=useState({})
    const [friendImageURI,setFriendImageURI]=useState("")

    useEffect(()=>{
        getFriendDate()
    }, []);

    const getFriendDate=async()=>{
        const refFiresrore = await doc(db, `mapGPS/${await props.friendUUID}`);
        const getFriendData=await (await getDoc(refFiresrore)).data()
        console.log('ICON')
        console.log(getFriendData)
        setFriendData(getFriendData)
        getDownloadURL(ref(storage, `users/${props.friendUUID}/mainPicture`)).then((getURI)=>{
            setFriendImageURI(getURI)
          })
    }

  return (
  <MapUserIcon imageURI={friendImageURI} title={friendData.userName} location={friendData.myLocation}></MapUserIcon>
    );
};
export default MapFriendIconContainer;