import { Text, View, ScrollView, StyleSheet,TouchableOpacity,Platform,Alert} from "react-native";
import { Poster } from '../../../../component/Textbook/Poster';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SearchDetail = (props,{navigation}) => {
  const { news } = props.route.params; // パラメータから news を取得
  const { poster_path, name, overview, price,classname } = news; // news の各プロパティを取得
  const handlePress = () => {
    Alert.alert(
      '確認',
      '出品者とのトーク画面に進みます',
      [
        {
          text: 'キャンセル',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            // Proceed with the action you want to take
            navigation.navigate("")
          }
        }
      ],
      { cancelable: false }
    );
  };

    return (
        <ScrollView style={styles.container} >

            <Poster posterPath={poster_path} imageWidth={780} imageHeight={480}>
            </Poster>

            <View style={{margin:8}}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.classtitle}>#{classname}</Text>
                <View style={{borderRadius:10,backgroundColor:'#777',width:'30%',marginVertical:4}}>
                        <Text numberOfLines={1} style={styles.BookPrice}>￥{price}</Text>
                </View>
                <Text style={styles.overview}>{overview}</Text>
            </View>

            <View style={{height:'100%',flexDirection:'row-reverse',marginTop:10}}>
                <TouchableOpacity 
                    style={styles.decideButton}
                    onPress={handlePress}
                >
                    <MaterialCommunityIcons name="hand-pointing-right" size={24} color="#027aff" />
                    <Text style={styles.decideButtonText}>出品者と購入手続き</Text>
                </TouchableOpacity>
                <View style={{height:100}}></View>
            </View>
   
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#202328'
    },
    title: {
        color: '#111',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom:4
    },
    classtitle: {
        color: '#555',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom:4
    },
    overview: {
        color: '#111',
        fontSize: 18
    },
    BookPrice: {
        color: '#fff',
        width:'100%',
        fontSize:20,
        textAlign:'center',
        paddingTop:Platform.OS==='android' ? '2%':'4%',
        paddingBottom:Platform.OS==='android' ? '6%':'4%',
    },
    decideButton:{
        backgroundColor:'orange',
        width:'60%',
        height:'4%',
        borderRadius:20,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:Platform.OS==='android' ? 10:11,
        // paddingBottom:Platform.OS==='android' ? 6:4,
    },
    decideButtonText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#027aff',
        fontSize:18,
    }
})