import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Law } from './Faculty/Law';
import { Industrial_Sociology } from './Faculty/Industrial_Sociology';
import { Interntional_Relations } from './Faculty/Interntional_Relations';
import { Literature } from './Faculty/Literature';
import { Business_Administration } from './Faculty/Business_Administration';
import { Policy_Science } from './Faculty/Policy_Science';
import { Comprehensive_Psychology } from './Faculty/Comprehensive_Psychology';
import { Global } from './Faculty/Global';
import { Visual_Arts } from './Faculty/Visual_Arts';
import { Information_Science_and_Engineering } from './Faculty/Information_Science_and_Engineering';
import { Economics } from './Faculty/Economics';
import { Sports } from './Faculty/Sports';
import { Eating_management } from './Faculty/Eating_management';
import { Science_and_Engineering } from './Faculty/Science_and_Engineering';
import { Life_Sciences } from './Faculty/Life_Sciences';
import { Medical } from './Faculty/Medical';
import { Liberal_Arts } from './Faculty/Liberal_Arts';
import {Dimensions} from 'react-native';

const Tab = createMaterialTopTabNavigator();

//教科書販売ホームのナビゲーションについて実装した画面

export const SearchList = () => {
  return(
    <Tab.Navigator
      initialLayout={{ width: Dimensions.get('window').width }}
      
      // タブの幅を自動的に調整して、スクロールできるようにします
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: { width: 'auto' },
        style: { backgroundColor: '#fff' }, // タブバーの背景色を設定します
        activeTintColor: '#F36F21', // アクティブなタブのテキスト色を設定します
        inactiveTintColor: 'gray', // 非アクティブなタブのテキスト色を設定します
      }}
    >
        <Tab.Screen name='法学部' component={Law}></Tab.Screen>
        <Tab.Screen name='産業社会学部' component={Industrial_Sociology}></Tab.Screen>
        <Tab.Screen name='国際関係学部' component={Interntional_Relations}></Tab.Screen>
        <Tab.Screen name='文学部' component={Literature}></Tab.Screen>
        <Tab.Screen name='経営学部' component={Business_Administration}></Tab.Screen>
        <Tab.Screen name='政策科学部' component={Policy_Science}></Tab.Screen>
        <Tab.Screen name='総合心理学部' component={Comprehensive_Psychology}></Tab.Screen>
        <Tab.Screen name='グローバル教養学部' component={Global}></Tab.Screen>
        <Tab.Screen name='映像学部' component={Visual_Arts}></Tab.Screen>
        <Tab.Screen name='情報理工学部' component={Information_Science_and_Engineering}></Tab.Screen>
        <Tab.Screen name='経済学部' component={Economics}></Tab.Screen>
        <Tab.Screen name='スポーツ健康科学部' component={Sports}></Tab.Screen>
        <Tab.Screen name='食マネージメント学部' component={Eating_management}></Tab.Screen>
        <Tab.Screen name='理工学部' component={Science_and_Engineering}></Tab.Screen>
        <Tab.Screen name='生命科学部' component={Life_Sciences}></Tab.Screen>
        <Tab.Screen name='薬学部' component={Medical}></Tab.Screen>
        <Tab.Screen name='教養科目' component={Liberal_Arts}></Tab.Screen>
    </Tab.Navigator>
  )
}

