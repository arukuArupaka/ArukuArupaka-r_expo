import React, { useEffect, useState } from 'react';
import { View, Dimensions, TextInput ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setMapSearchWord } from '../../redux/actions/mapUserActions';


function LogoTitle() {

    const [searchWord,setSearchWord]=useState("")
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(setMapSearchWord(searchWord))
    },[searchWord])


    return (
        <View style={{
            marginRight: 130,
            width: Dimensions.get("window").width - 70,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#eeeeee',
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <TextInput value={searchWord} onChangeText={setSearchWord} placeholder="なにかお探しですか？"></TextInput>
            <TouchableOpacity>
                <Ionicons name='search' size={20}></Ionicons>
                </TouchableOpacity>
        </View>
    );
} export default LogoTitle;
