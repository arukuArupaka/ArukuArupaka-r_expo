import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity,ScrollView, Alert } from 'react-native';
import MapBuildingListItem from './MapBuildingListItem';
import Dialog from 'react-native-dialog';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';


const DisplayList = (props) => {

    const [showBuildingConfirm,setShowBuildingConfirm]=useState(false)
    const [selectBuilding,setSelectBuilding]=useState({})
    const [dialogTextInput,setDialogTextInput]=useState("")
    const [campusBuildingsArray,setCampusBuildingArray]=useState(props.campusBuildingsArray)

    const delateBuilding=()=>{

        const firebaseDelateBuilding=async(buildingID)=>{
            const refFiresrore = doc(db, `mapBuildings/${props.campusID}`);
            console.log("getDoc on Display map 20")
            await getDoc(refFiresrore).then((data)=>{
              let cloneArray=data.data().cloneArray.concat()

              cloneArray.filter((item) => item.buildingID !== buildingID)

              console.log(cloneArray.filter((item) => item.buildingID !== buildingID))

              setDoc(refFiresrore,{cloneArray:cloneArray.filter((item) => item.buildingID !== buildingID)}).then((data)=>{
                setCampusBuildingArray(cloneArray)
              })
              
            }).catch(error => console.log(error));
        }

        if(dialogTextInput===selectBuilding.buildingName){
            setShowBuildingConfirm(false)
            if(Math.floor(Math.random()*5)==1){

            firebaseDelateBuilding(selectBuilding.buildingID)

            }else{
                Alert.alert("時間をあけてから操作してください。")
            }
            

        }else{
            Alert.alert("建物の名前が違います。")
            setShowBuildingConfirm(false)
        }



    }

    const editBuilding=()=>{
        if(dialogTextInput===selectBuilding.buildingName){
            setShowBuildingConfirm(false)

            if(Math.floor(Math.random()*5)===1){

            }else{
                Alert.alert("時間をあけてから操作してください。")
            }


        }else{
            Alert.alert("建物の名前が違います。")
            setShowBuildingConfirm(false)
        }

    }

    if(!props.campusBuildingsArray.length){
        return (
            <View style={{
                height:'100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text>建物が登録されていません。</Text>
                <TouchableOpacity 
                onPress={()=>props.openMap()}
                style={{
                    marginTop:50,
                    backgroundColor:'#EB3637',
                    height:30,
                    width:180,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:10,}}>
                    <Text style={{color:'white',fontWeight:'700'}}>マップを開く</Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <ScrollView
        style={{
            width: "100%",
            height: "100%",
            paddingTop:20,
            paddingHorizontal:20,
            }}>
            {campusBuildingsArray&&Array.isArray(campusBuildingsArray)&&campusBuildingsArray.map((buildingData)=><TouchableOpacity onLongPress={()=>{setShowBuildingConfirm(true);setSelectBuilding(buildingData)}}><MapBuildingListItem buildingData={buildingData}/></TouchableOpacity>)}
            <Dialog.Container visible={showBuildingConfirm}>
                <Dialog.Title>編集する建物の名前を入力</Dialog.Title>
                <Dialog.Input onChangeText={setDialogTextInput}/>
                <View>
                    <Dialog.Button label="建物を削除" onPress={()=>{delateBuilding()}} />
                    {/* <Dialog.Button label="建物情報を編集" onPress={()=>{editBuilding()}} /> */}
                    <Dialog.Button label="キャンセル" onPress={()=>setShowBuildingConfirm(false)} />
                </View>
            </Dialog.Container>
        </ScrollView>
    );
};

export default DisplayList;
