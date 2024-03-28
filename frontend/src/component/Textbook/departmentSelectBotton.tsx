import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const DepartmentSelectBotton = (props) => {
  return (
    <TouchableOpacity
      onPress={()=>props.onSelected(props.name)}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth:80,
        height:50,
        paddingHorizontal:20,
        borderBottomWidth:props.name===props.selectedDepartment?3:0,
        borderColor:'#F36F21'
      }}>
      <Text style={{color:props.name===props.selectedDepartment?'#F36F21':'gray'}}>{props.name}</Text>
    </TouchableOpacity>

  );
};
export default DepartmentSelectBotton;