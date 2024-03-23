import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity ,ScrollView,Image,TextInput} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DisplayMap from '../../component/Map/DisplayMap';
import DisplayList from '../../component/Map/DisplayList';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Dropdown from 'react-native-input-select';




const MapMainView = () => {

  const [showMap, setShowMap] = useState(true);
  const [showEditBuilding,setShowEditBuilding]=useState(false)
  const [buildingLocation,setBuildingLocation]=useState({})
  const [showCampusSelect,setShowCanpusSelect]=useState(true)
  const [campusData,setCampusData]=useState({})

  //新規建物追加
  const [buildingType,setBuildingType]=useState()
  const [buildingName,setBuildingName]=useState("")

  const userObject=useSelector((state)=>state.user.userObject)

  console.log(buildingType)



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

  const [mainBuildingImage,setMainBuildingImage]=useState('https://media.discordapp.net/attachments/1210241561095573504/1219219360976080987/24660942.jpg?ex=660a8183&is=65f80c83&hm=b3e22c638cb150a3ee37a0a7f0c228ce0c7b79130843af5cdb3597c8ee912b66&=&format=webp&width=1342&height=1012')

  const CampusLocationData=[
    {
      id:'ritsumei_BKC',
      name:'びわこくさつキャンパス',
      imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469182',
      location:{              
        latitude: 34.98213493094731,
        longitude: 135.96364694774536
      }
    },
    {
      id:'ritsumei_KIC',
      name:'衣笠キャンパス',
      imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469181',
      location:{
        latitude: 35.0325428,
        longitude: 135.7240146, 
      }
    },
    {
      id:'ritsumei_OIC',
      name:'大阪いばらきキャンパス',
      imageURL:'https://www.ritsumei.ac.jp/image.jsp?id=469183',
      location:{
        latitude: 34.8108499,
        longitude: 135.5612411,
      }
    }
  ]

  

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
      {showMap ? <DisplayList /> : <DisplayMap campusData={campusData} isEditBuilding={showEditBuilding} onPickLongitudeLatitude={(event)=>{console.log(event);setBuildingLocation(event)}}/>}
      
      {/* //建物追加 */}
      {!showMap&&<TouchableOpacity
        onPress={() => setShowEditBuilding(true)}
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
        <AntDesign name="plus" size={30} color="#EB3637" />
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
            <TouchableOpacity>
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
                  // onChangeText={setBuildingName}
                  // value={buildingName}
              ></TextInput>
          </View>
        </ScrollView>
        </View>}
    </View>
  );
};
export default MapMainView;
