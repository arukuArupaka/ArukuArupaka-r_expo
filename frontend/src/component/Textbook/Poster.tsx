import Ionicons from "@expo/vector-icons/Ionicons";
import { Image,View } from "react-native";

export const Poster = (props) => {
    let posterPath = props.posterPath;
    const imageHeight = props.imageHeight;

    if (posterPath === null) {
        return (
            <View style={{height: imageHeight, alignItems: 'center', justifyContent: 'center',}}>
                <Ionicons name="image-outline" size={24} color="#ccc" />
            </View>
        )
    } else {
        return (
            <Image style={{height: imageHeight, resizeMode: 'stretch',marginBottom:2}} source={{uri: posterPath}}></Image>
        )
    }
}