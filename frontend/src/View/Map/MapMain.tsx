import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity ,ScrollView,Image,TextInput, Platform, Alert} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DisplayMap from '../../component/Map/DisplayMap';
import DisplayList from '../../component/Map/DisplayList';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-native-input-select';
import ActionSheet from '@yfuks/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { db } from '../../../firebase';
import * as Crypto from 'expo-crypto';
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {manipulateAsync} from "expo-image-manipulator";
import { judgeInclusion } from '../../component/Map/inRangDiscrimination';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setMapUserObject } from '../../redux/actions/mapUserActions';

const MAIN_PICTURE_MAX_SIZE:number=10000


const MapMainView = () => {

  const isLogin:boolean=useSelector((state:State)=>state.user.isLogin||false) //import {useSelector,useDispatch} from 'react-redux'; でimport してね
  const dispatch: Dispatch = useDispatch();
  const isLoginNotVerificationEmail:boolean=useSelector((state:State)=>state.user.isLoginNotVerificationEmail||false)

  useEffect(()=>{//これをホームへ


    const getUserDate=async()=>{
      console.log(await isLogin)
      if (await isLogin) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const refFiresrore = doc(db, `mapGPS/${userUUID}`);
        const snap = await getDoc(refFiresrore);
  
        if (snap.exists()) {
          const appUser = (await getDoc(refFiresrore)).data() as User;//appUserがデータベースから取得したオブジェクト
          console.log(appUser)
          console.log('exit!')
          dispatch(setMapUserObject(appUser))
        }else{
          const mapUser={
            isLocationShare:true,
            userName:userObject.userName,
            userUUID:userUUID,
            friends:[],
            mapShowFriends:[],
            locationSharingFriends:[],
            QRUUID:Crypto.randomUUID()
          }
          console.log('norExit')
          setDoc(refFiresrore, mapUser).then(() => {
            // 保存に成功したらコンテクストにユーザーデータを格納
            console.log('mapUser')
            dispatch(setMapUserObject(mapUser))
          });
        }
      }
    }
    getUserDate()
  },[isLogin])


  const [showMap, setShowMap] = useState(false);
  const [showEditBuilding,setShowEditBuilding]=useState(false)
  const [buildingLocation,setBuildingLocation]=useState({})
  const [showCampusSelect,setShowCanpusSelect]=useState(true)
  const [campusData,setCampusData]=useState({})
  const [campusBuildingsArray,setCampusBuildingArray]=useState([])

  //新規建物追加
  const [buildingType,setBuildingType]=useState([])
  const [buildingName,setBuildingName]=useState("")
  const [mainBuildingImage,setMainBuildingImage]=useState('https://media.discordapp.net/attachments/1210241561095573504/1219219360976080987/24660942.jpg?ex=660a8183&is=65f80c83&hm=b3e22c638cb150a3ee37a0a7f0c228ce0c7b79130843af5cdb3597c8ee912b66&=&format=webp&width=1342&height=1012')
  const [buildingDetail,setBuildingDetail]=useState("")
  const [detailSetting,setDetailSetting]=useState(false)

  const userObject=useSelector((state)=>state.user.userObject)

  const onOpenActionSheet=()=> {
    if(Platform.OS=='android'){
      pickImage()
      return
    }
    const options = ['写真を選択', 'キャンセル'];
    const cancelButtonIndex = 1;
    ActionSheet.showActionSheetWithOptions({
      options,
      cancelButtonIndex
    },
    buttonIndex => {
      if(buttonIndex==0){
        pickImage()
      }
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      setMainBuildingImage(result.assets[0].uri);
    }
  }
  
  const sendNewBuidingData=async()=>{
    if(!buildingName&&buildingType.length===0&&!buildingDetail){
      Alert.alert("すべての項目を入力してください")
      return
    }
    const refFiresrore = doc(db, `mapBuildings/${campusData.id}`);
    await getDoc(refFiresrore).then((deforeData)=>{
      //compareSetMapBuildings(data,cloneArray)

      let ID=Crypto.randomUUID()

      while(JSON.stringify(deforeData.data()).indexOf(ID)!==-1){
        ID=Crypto.randomUUID()        
      }

      uploadImageAsync(mainBuildingImage,ID,deforeData.data())

    }).catch(error => console.log(error));

  }


  const uploadImageAsync = async (uri:string,ID:string,beforeData:Array<object>)=> {
  
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const storageRef = ref(storage, `mapBuildings/${campusData.id}/${ID}/mainBuildingImage`);
    console.log(blob.size)


    if(blob.size<MAIN_PICTURE_MAX_SIZE){
        uploadBytes(storageRef, blob).then((snapshot) => {
          getDownloadURL(storageRef).then((getURI)=>{
            compareSetMapBuildings(beforeData,getURI,ID)
          })
        });
    }else{
       const compressionRatio=MAIN_PICTURE_MAX_SIZE/await blob.size
       console.log(await compressionRatio)

       const resizedImage = await manipulateAsync(uri, [
        {
          resize: { 
            width: 200,
            height: 200,
          },}
       ], {
        compress: compressionRatio,
      });
      //const resizedImage=image
        console.log(resizedImage)
        const resizeBlob: any = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', resizedImage.uri, true);
          xhr.send(null);
        });
        uploadBytes(storageRef, resizeBlob).then((snapshot) => {
          getDownloadURL(storageRef).then((getURI)=>{
            console.log('get')
            compareSetMapBuildings(beforeData,getURI,ID)
          })
        });
    }
    blob.close();
  };

  const compareSetMapBuildings=async(beforeData,uri,ID)=>{

    console.log(uri)

    let cloneArray = beforeData.cloneArray.concat();


    console.log('imageURL')

    if(mainBuildingImage){
      cloneArray.push(
        {
          buildingID:ID,
          buildingName:buildingName,
          buildingDetail:buildingDetail,
          buildingType:buildingType,
          buildingLocation:buildingLocation,
          buildingImage:uri
        }
      )
    }
    console.log(cloneArray)

    setDocMapBuildings(cloneArray)

  }

  

  const setDocMapBuildings=async(cloneArray)=>{

    const refFiresrore = doc(db, `mapBuildings/${campusData.id}`);

    setDoc(refFiresrore, {cloneArray}).then(() => {
      // 保存に成功したらコンテクストにユーザーデータを格納
      setBuildingDetail('')
      setBuildingLocation([])
      setBuildingName('')
      setBuildingType([])
      setShowEditBuilding(false)
    });
  }




  const toggleComponent = () => {
    setShowMap(prev => !prev);
  };

  const selectCampus=(data)=>{
    setCampusData(data)
    setShowCanpusSelect(false)
  }

  useEffect(()=>{
    if(userObject.campus){

      switch (userObject.campus) {

        case 'BKC':
          console.log('BKCs')
          setCampusData({
            id:'ritsumei_BKC',
            name:'びわこくさつキャンパス',
            imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469182',
            location:{              
              latitude: 34.98213493094731,
              longitude: 135.96364694774536
            }
          })
          setShowCanpusSelect(false)
          break
          case 'KIC':
            setCampusData({
              id:'ritsumei_KIC',
              name:'衣笠キャンパス',
              imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469181',
              location:{
                latitude: 35.0325428,
                longitude: 135.7240146, 
              }
            })
            setShowCanpusSelect(false)
            break
            case 'OIC':
              setCampusData({
                id:'ritsumei_OIC',
                name:'大阪いばらきキャンパス',
                imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469183',
                location:{
                  latitude: 34.8108499,
                  longitude: 135.5612411,
                }
              })    
              setShowCanpusSelect(false)
              break
      }
    }
  },[userObject])

    useEffect(()=>{
      console.log('campusData')

      const getCampusBuildingData=async()=>{

        const refFiresrore = doc(db, `mapBuildings/${campusData.id}`);

        await getDoc(refFiresrore).then((data)=>{
          //console.log(data.data().cloneArray)
          setCampusBuildingArray(data.data().cloneArray)
        }).catch(error => console.log(error));
      }
      getCampusBuildingData()

    },[campusData])


  const CampusLocationData=[
    {
      id:'ritsumei_BKC',
      name:'びわこくさつキャンパス',
      imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469182',
      location:{              
        latitude: 34.98213493094731,
        longitude: 135.96364694774536
      },
      campusAria:[
        {"latitude": 34.97712731885239, "longitude": 135.96262335777283},
        {"latitude": 34.97949920724689, "longitude": 135.96129298210144},
        {"latitude": 34.98062881074072, "longitude": 135.96049368381503},
        {"latitude": 34.9832994698679, "longitude": 135.95910765230653},
        {"latitude": 34.9832967228862, "longitude": 135.95909524708986},
        {"latitude": 34.98694545744828, "longitude": 135.96298411488533},
        {"latitude": 34.988108744112075, "longitude": 135.9653464704752},
        {"latitude": 34.98237400651514, "longitude": 135.96632950007915},
        {"latitude": 34.98109114152881, "longitude": 135.96577126532793},
        {"latitude": 34.97677732626124, "longitude": 135.96496995538473},
      ]
    },
    {
      id:'ritsumei_KIC',
      name:'衣笠キャンパス',
      imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469181',
      location:{
        latitude: 35.0325428,
        longitude: 135.7240146, 
      },
      campusAria:[
        {"latitude": 34.81218694153572, "longitude": 135.56080330163238},
        {"latitude": 34.808636419426435, "longitude": 135.55954098701477},
        {"latitude": 34.80757822523875, "longitude": 135.56195430457592},
        {"latitude": 34.809639819418585, "longitude": 135.5637812241912},
        {"latitude": 34.81089150593137, "longitude": 135.5637721717358},
      ]
    },
    {
      id:'ritsumei_OIC',
      name:'大阪いばらきキャンパス',
      imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469183',
      location:{
        latitude: 34.8108499,
        longitude: 135.5612411,
      },
      campusAria:[
        {"latitude": 34.81212225282056, "longitude": 135.56082140654325},
        {"latitude": 34.808502356554435, "longitude": 135.55953294038773},
        {"latitude": 34.80757932638442, "longitude": 135.56186612695456},
        {"latitude": 34.809806913923346, "longitude": 135.56380704045296},
        {"latitude": 34.81086700642176, "longitude": 135.56378725916147},
      ]
    }
  ]

  const pickBuildinglocation=(location)=>{
    console.log(location)
//    console.log(campusData.campusAria)
    if(!showEditBuilding) return

    if(judgeInclusion(location,campusData.campusAria)&&showEditBuilding){
      setBuildingLocation(location)
    }else if(!judgeInclusion(location,campusData.campusAria)){
      Alert.alert(campusData.name+"内を選択してください")
        
    }
    
  }

  

  return (
    <View style = {{position: 'relative'}}>
      {/* //キャンパス選択 */}
      {showCampusSelect&&
          <View style={{
            width:'100%',
            height:'100%',
            paddingTop:20,
            backgroundColor:'white'
          }}>
            <Text style={{fontSize:20,paddingHorizontal:10}}>キャンパス選択</Text>
            <ScrollView style={{paddingHorizontal:20,marginTop:20}}>
            {CampusLocationData.map((campusData,index)=><TouchableOpacity onPress={()=>selectCampus(campusData)} style={{height:60,borderBottomWidth:0,alignItems:'center',flexDirection:'row'}}><Image style={{height:40,width:40,marginRight:10,borderRadius:20}} source={{uri:campusData.imageURL}}/><Text style={{}}>{campusData.name}</Text></TouchableOpacity>)}
            </ScrollView>
          </View>
        }

      {/* //マップかリストの切り替え */}
      {!showCampusSelect&&<View>{showMap ? <DisplayList campusBuildingsArray={campusBuildingsArray} openMap={()=>toggleComponent()} campusID={campusData.id}/> : <DisplayMap campusBuildingsArray={campusBuildingsArray} campusData={campusData} isEditBuilding={showEditBuilding} onPickLongitudeLatitude={(event)=>{pickBuildinglocation(event);}}/>}
      </View>}
      {/* //建物追加 */}
      {!showMap&&!showEditBuilding&&<TouchableOpacity
        onPress={() => {
          setShowEditBuilding(true)
          setBuildingDetail('')
          setBuildingLocation([])
          setBuildingName('')
          setBuildingType([])
        }}
        style={{
          position: 'absolute',
          right: '5%',
          bottom: 75,
          width: 50,
          height: 50,
          borderRadius: 10,
          backgroundColor: '#fff',
          borderColor: showMap ? 'blue' : 'black',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2,
        }}>
        <AntDesign name="plus" size={30} color="#C8252B" />
      </TouchableOpacity>}
      {!showMap&&showEditBuilding&&<TouchableOpacity
        onPress={() => {
          setShowEditBuilding(false)
        }}
        style={{
          position: 'absolute',
          right: '5%',
          bottom: 75,
          width: 50,
          height: 50,
          borderRadius: 10,
          backgroundColor: '#fff',
          borderColor: showMap ? 'blue' : 'black',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2,
        }}>
        <MaterialCommunityIcons name="cancel" size={30} color="#EB3637" />
      </TouchableOpacity>}
      <TouchableOpacity
        onPress={() => toggleComponent()}
        style={{
          position: 'absolute',
          right: '5%',
          bottom: 15,
          width: 50,
          height: 50,
          borderRadius: 10,
          backgroundColor: '#fff',
          borderColor: showMap ? 'blue' : 'black',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2,
        }}>
        <Ionicons name= {showMap ? 'map-outline': 'list'} size={30} color="#EB3637" />
      </TouchableOpacity>
      {Object.keys(buildingLocation).length!==0&&showEditBuilding&&<View style={{position:'absolute',width:'100%',height:'100%',backgroundColor:'white'}}>
        <ScrollView style={{paddingHorizontal:20}}>
          <View>
            <TouchableOpacity onPress={()=>{setShowEditBuilding(false);setBuildingLocation({})}} style={{width:30,marginTop:10,marginRight:10,marginLeft:'auto'}}>
              <MaterialIcons name="cancel" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize:20}}>建物の写真</Text>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              onPress={onOpenActionSheet}
            >
              <Image source={{uri:mainBuildingImage}} style={{
                borderRadius:200,
                height:150,
                width:200}}></Image>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize:20,marginBottom:10}}>建物の名前</Text>
          <View style={{
              backgroundColor: "#F0F0F0",
              borderRadius:20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 10,
              marginBottom:10
          }}>
              <TextInput
                  style={{
                      fontSize:17,
                      padding: 10,
                      
                  }}
                  onChangeText={setBuildingName}
                  value={buildingName}
              ></TextInput>
          </View>

          <Text style={{fontSize:20,marginBottom:10}}>建物の種類</Text>
          <Dropdown    
            placeholder="選択してください"
            isMultiple
            options={[
              { label: '食堂', value: '食堂' },
              { label: '自習スペース', value: '自習スペース' },
              { label: '広場', value: '広場' },
              { label: 'コミュニケーションスペース', value: 'コミュニケーションスペース' },
              { label: '売店', value: '売店' },
              { label: 'バス停', value: 'バス停' },
              { label: 'サークルルーム', value: 'サークルルーム' },
              { label: 'その他', value: 'その他' },
            ]}
            selectedValue={buildingType}
            onValueChange={(value) => setBuildingType(value)}
    />
          <Text style={{fontSize:20,marginBottom:10}}>建物の説明</Text>
          <View style={{
              backgroundColor: "#F0F0F0",
              borderRadius:20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 10,
              marginBottom:10
          }}>
              <TextInput
                  multiline
                  style={{
                      fontSize:17,
                      padding: 10,
                      height:130
                  }}
                  onChangeText={setBuildingDetail}
                  value={buildingDetail}
              ></TextInput>
          </View>
          {/* <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20,flex:1}}>詳しい設定</Text>
            <TouchableOpacity style={{width:30}} onPress={()=>setDetailSetting(!detailSetting)}>
              {!detailSetting?<AntDesign name="down" size={24} color="black" />
              :<MaterialCommunityIcons name="cancel" size={24} color="black" />}
            </TouchableOpacity>
          </View>
          {detailSetting&&<View style={{width:'100%'}}>
              <MapChildBuildingSetting/>
            </View>} */}
          <TouchableOpacity 
            onPress={()=>sendNewBuidingData()}
            style={{              
              backgroundColor:'#C8252B',
              borderRadius:5,
              justifyContent:'center',
              marginTop:10,
              height:30}}>
              <Text style={{color:'white',textAlign:'center',fontWeight:"700"}}>登録</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>}
    </View>
  );
};
export default MapMainView;
