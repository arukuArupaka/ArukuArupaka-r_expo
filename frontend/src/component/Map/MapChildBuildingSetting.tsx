import React ,{useState} from 'react';
import {Text, View,TextInput,Image,TouchableOpacity} from 'react-native';
import Dropdown from 'react-native-input-select';


const MapChildBuildingSetting = (props) => {
    const [buildingType,setBuildingType]=useState()
    const [buildingName,setBuildingName]=useState("")

    return (
    <View
      style={{

      }}>
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
          
    </View>
  );
};
export default MapChildBuildingSetting;