import React , {useEffect, useState ,forwardRef , useImperativeHandle } from 'react';
import {Text, View,Image,Switch} from 'react-native';
import { useSelector } from 'react-redux';


const MapFriendListItem = (props) => {

    
    const [isONSwitch,setIsONSwitch]=useState(false)
    const mapUserObject =useSelector((state)=>state.map.mapUserObject)

    const fetchFriendsList=async(mapObject)=>{

        console.log(mapObject)

        if(await props.isSettingMyfrendLocation){

            if(await mapObject.locationSharingFriends.length){
                console.log('locationSharingFriends')
                console.log(mapObject.locationSharingFriends)
                setIsONSwitch(false)

                await mapObject.locationSharingFriends.forEach(element => {
                    // setIsONSwitch(element===props.friend.userUUID)
                    // console.log(element)
                    if(element===props.friend.userUUID) {
                        setIsONSwitch(true)
                        return
                    }
                });
            }else{
                console.log('props.locationSharingFriends is undefind')
                setIsONSwitch(false)
            }

        }else{

            if(await mapObject.mapShowFriends.length){
                console.log('mapShowFriends')
                setIsONSwitch(false)

                await mapObject.mapShowFriends.forEach(element => {
                    // setIsONSwitch(element===props.friend.userUUID)
                    // console.log(element)
                    if(element===props.friend.userUUID) {
                        setIsONSwitch(true)
                        return
                    }
                });
            }else{
                console.log('props.mapShowFriends is undefind')
                setIsONSwitch(false)
            }
        }
    }

    useEffect(()=>{
        console.log('effects')
        fetchFriendsList(mapUserObject)
    },[props.isSettingMyfrendLocation])

    useEffect(()=>{
        console.log('これが出たら最高')
        fetchFriendsList(mapUserObject)
    },[mapUserObject])

    console.log('props')
    console.log(mapUserObject)
    

  return (
    <View
      style={{
        height:65,
        flexDirection:'row',
        alignItems: "center",
        borderBottomWidth:1,
        borderColor:'gray'
      }}>
        <Image style={{height:40,width:40,borderRadius:30,marginRight:8}} source={{uri:props.friend.imageURI}}/>
        <Text style={{fontSize:18,flex:1,}}>{props.friend.userName}</Text>
        <Switch
            onValueChange={()=>{!isONSwitch?props.onONChangeSwitch(props.friend.userUUID):props.onOFFChangeSwitch(props.friend.userUUID)}}
            value={isONSwitch}
        />
    </View>
  );
}
export default MapFriendListItem;