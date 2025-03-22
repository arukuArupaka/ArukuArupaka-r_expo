import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const IS_POST_DEVICE_ID = 'IS_POST_DEVICE_ID';

export const getDeviceId = async (): Promise<string | undefined> => {
    if (!Device.isDevice) {
        console.warn('実機でのみ動作します');
        return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    console.log('Expo Push Token:', token);
    return token;
};


// 任意のキーを使って、"初回かどうか" を判定する関数
export const IsUpdataThisFunction = async (key: string): Promise<boolean> => {
    try {
        const hasLaunched = await AsyncStorage.getItem(key);

        if (!hasLaunched) {
            // 初回起動（keyが未保存の場合）
            return true;
        }

        return false; // すでに記録されている = 初回じゃない
    } catch (error) {
        console.error('起動判定エラー:', error);
        return false; // 念のため false を返す（初回じゃない扱い）
    }
};

export const onUpdataThisFunction = async (key: string): Promise<boolean> => {
    try {
        await AsyncStorage.setItem(key, 'true');
    } catch (error) {
        console.error('起動判定エラー:', error);
        return false; // 念のため false を返す（初回じゃない扱い）
    }
};