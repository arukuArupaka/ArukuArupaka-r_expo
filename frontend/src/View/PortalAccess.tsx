import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PortalItem from '../component/PortalAccess/PortalItem';
import SelectItem from '../component/PortalAccess/SelectItem';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortalAccess = () => {
  const linklist = [
    {
      logoMark: 'https://th.bing.com/th?id=ODLS.d7e6cdc6-a6e4-4e1c-85b1-c1e826e9975b&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2',
      name: 'English Expedition',
      webnavigate: 'https://www.ee.ritsumei.ac.jp/index.html',
      category:['学内施設','留学'],
      herf:"英語",
      id:'1'
    },
    {
      logoMark: 'https://th.bing.com/th?id=OIP.XC8iVR__3Gq3iTu7RUb1IQAAAA&w=181&h=181&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      name: '立命館大学図書館',
      webnavigate: 'https://www.ritsumei.ac.jp/lib/',
      category: ['学内施設'],
      herf:"",
      id:'2'
    },
    {
      logoMark: 'https://th.bing.com/th?id=OIP.XC8iVR__3Gq3iTu7RUb1IQAAAA&w=181&h=181&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      name: 'BKC体育館・ジム',
      webnavigate: 'https://www.ritsumei.ac.jp/lifecareer/activity/facility/gym/bkc/',
      category: ['学内施設'],
      herf:"",
      id:'3'
    },
    {
      logoMark: 'https://th.bing.com/th?id=OIP.8Zyd4GpsM1tYW9vz1ELH8AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      name: 'manaba+R',
      webnavigate: 'https://ct.ritsumei.ac.jp/ct/home',
      category: ['学びサポート'],
      herf:"",
      id:'4'
    },
    {
      logoMark: 'https://th.bing.com/th?id=OIP.8Zyd4GpsM1tYW9vz1ELH8AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      name: 'manaba+R',
      webnavigate: 'https://ritsumei.ac.jp/ct/home',
      category: ['学びサポート'],
      herf:"",
      id:'5'
    }
  ];
  const limitItem = [
    { name: 'すべて' },
    { name: '学内施設' },
    { name: '学びサポート' },
    { name: '研究室' },
    { name: '留学' },
    { name: 'フード' },
  ];

  const [text, onChangeText] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('すべて');
  const [lockedItems, setLockedItems] = React.useState([]);

  React.useEffect(() => {
    const loadLockedItems = async () => {
      try {
        const lockedItemsJson = await AsyncStorage.getItem('lockedItems');
        if (lockedItemsJson) {
          setLockedItems(JSON.parse(lockedItemsJson));
        }
      } catch (error) {
        console.error('Failed to load locked items from AsyncStorage:', error);
      }
    };
    loadLockedItems();
  }, []);

  React.useEffect(() => {
    const saveLockedItems = async () => {
      try {
        await AsyncStorage.setItem('lockedItems', JSON.stringify(lockedItems));
      } catch (error) {
        console.error('Failed to save locked items to AsyncStorage:', error);
      }
    };
    saveLockedItems();
  }, [lockedItems]);

  const handleLockToggle = (id) => {
    setLockedItems((prev) => {
      const newLockedItems = prev.includes(id) ? prev.filter(item => item !== id) : [id, ...prev];
      return newLockedItems;
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    searchSection: {
      height: 40,
      borderRadius: 20,
      borderColor: 'gray',
      padding: 8,
      backgroundColor: '#eeeeee',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      width: "80%",
      marginTop: 50
    },
    input: {
      borderRadius: 65,
      height: 40,
      margin: 10,
      width: "85%",
      padding: 10,
    },
  });

  const filteredLinks = linklist.filter(item => 
    (selectedCategory === 'すべて' || item.category.includes(selectedCategory)) &&
    (item.name.toLowerCase().includes(text.toLowerCase())|| item.herf.toLowerCase().includes(text.toLowerCase()))
    );

  const sortedLinks = [
    ...lockedItems.map(id => linklist.find(item => item.id === id)),
    ...filteredLinks.filter(item => !lockedItems.includes(item.id))
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="なにかお探しですか？"
          />
          <TouchableOpacity>
            <Ionicons name='search' size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 50 }} />
      <View style={{ height: 40 }}>
        <ScrollView horizontal={true} style={{ width: "100%" }}>
          {limitItem.map((item, index) => (
            <SelectItem
              key={index}
              name={item.name}
              onPress={() => setSelectedCategory(item.name)}
              isSelected={selectedCategory === item.name}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ borderBottomWidth: 1 }}>
        {sortedLinks.map((item, index) => (
          <PortalItem
            id={item.id}
            key={index}
            name={item.name}
            logoMark={item.logoMark}
            webnavigate={item.webnavigate}
            category={item.category}
            onLock={() => handleLockToggle(item.id)}
            locksite={lockedItems.includes(item.id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PortalAccess;
