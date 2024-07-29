import { View, Text } from 'react-native';

export const MyPageFavorite = (props) => {
  const favorites = props.favorite;

  return (
    <View>
      <View>
        {Array.isArray(favorites) && favorites.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    </View>
  );
};
