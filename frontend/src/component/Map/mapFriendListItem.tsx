import React , {useEffect, useState ,forwardRef , useImperativeHandle } from 'react';
import {Text, View,Image,Switch} from 'react-native';
import { useSelector } from 'react-redux';


const MapFriendListItem = (props) => {

    const [isONSwitch,setIsONSwitch]=useState(false)
    const mapUserObject =useSelector((state)=>state.map.mapUserObject)

    const fetchFriendsList=async(mapObject)=>{

        if(await props.isSettingMyfrendLocation){

            if(await mapObject.locationSharingFriends.length){

                setIsONSwitch(false)

                await mapObject.locationSharingFriends.forEach(element => {

                    if(element===props.friend.userUUID) {
                        setIsONSwitch(true)
                        return
                    }
                });
            }else{
                setIsONSwitch(false)
            }

        }else{

            if(await mapObject.mapShowFriends.length){
                setIsONSwitch(false)

                await mapObject.mapShowFriends.forEach(element => {
                    
                    if(element===props.friend.userUUID) {
                        setIsONSwitch(true)
                        return
                    }
                });
            }else{
                setIsONSwitch(false)
            }
        }
    }

    useEffect(()=>{
        console.log('effects')
        fetchFriendsList(mapUserObject)
    },[props.isSettingMyfrendLocation,mapUserObject])    

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