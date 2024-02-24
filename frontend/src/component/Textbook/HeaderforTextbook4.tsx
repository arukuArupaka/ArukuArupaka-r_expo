import React,{useState} from 'react';
import { View, Platform, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView,Button,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { MaterialIcons,MaterialCommunityIcons ,Ionicons,AntDesign,FontAwesome, Feather  } from '@expo/vector-icons';



export const HeaderforTextbook4 = () => {

  const navigation = useNavigation();
  const [showModal, setshowModal] = useState(false);

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  return (
    <View>
      {Platform.OS === 'ios' && <View style={styles.headerupios}></View>}
      {/* {Platform.OS === 'android' && <View style={styles.headerupandroid}></View>} */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.navigate('マイページホーム')}
        >
          {Platform.OS === 'android'&& <Ionicons name="arrow-back-sharp" size={26} color="black" 
          style={[styles.back,{marginLeft:16,paddingTop:14}]}/>}

          {Platform.OS === 'ios'&& <MaterialIcons name="arrow-back-ios" size={22} color="black" 
          style={[styles.back,{color:'#027aff',marginLeft:10,paddingTop:10}]}/>}
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
        style={{marginRight:Platform.OS === 'ios' ? 10 : 16}}
        onPress={() => setshowModal(true)}
        >
          <FontAwesome name="question-circle-o" size={28} color="black" style={styles.question} />
        </TouchableOpacity>

        <Modal
          isVisible={showModal}
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
        >
          <View style={styles.centerview}>
            <TouchableHighlight
              style={styles.modalview}
              onPress={() => setshowModal(false)}
            >
              <View>
                <Button title="Close" onPress={() => setshowModal(false)} />
              </View>
            </TouchableHighlight>
          </View>
        </Modal>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  headerupandroid:{
    height:32,
    // borderBottomColor:'orange',
    // borderBottomWidth:2
  },

  headerupios:{
    height:59,
    backgroundColor:'#F36F21'
    // borderBottomColor:'orange',
    // borderBottomWidth:2
  },

  header: {
    height: Platform.OS === 'ios' ? 40 : 56,
    flexDirection: 'row',
    backgroundColor: "#F36F21",
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#aaa',

  },

  back:{
    // backgroundColor:'red',
    height:'100%',
  },

  question:{
    // backgroundColor:'red',
    height:'100%',
    paddingTop:Platform.OS === 'ios' ? 6 : 14
  },

  centerview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalview: {
    width: 140,
    height: 140,
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 8, // Changed to numeric value
  },
});
