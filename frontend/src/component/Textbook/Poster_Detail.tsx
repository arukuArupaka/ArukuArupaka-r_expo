import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, View, Text, StyleSheet, Platform } from "react-native";

export const Poster_Detail = (props) => {
    let posterPath = props.posterPath;
    const imageHeight = props.imageHeight;

    if (posterPath === null) {
        return (
            <View style={{ height: imageHeight, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="image-outline" size={24} color="#ccc" />
            </View>
        )
    } else {
        return (
            <View>
                <Image 
                    style={{ height: imageHeight, marginBottom: 2,resizeMode:'stretch'}}   
                    source={{ uri: posterPath }} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        bottom: 2, // 画像の下からの距離
        left: 0, // 画像の左からの距離
        backgroundColor: 'rgba(0,0,0,0.4)', // 背景の色と不透明度
        paddingTop:Platform.OS==='android' ? 0:3,
        paddingBottom:Platform.OS==='android' ? 5:3,
        paddingRight:7,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        // borderRadius: 10,
        width:'70%'
    },
    text: {
        color: '#fff', // テキストの色
        fontSize: 20,
        textAlign:'center',
        fontWeight: 'bold',
    },
})
