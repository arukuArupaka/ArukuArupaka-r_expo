import { ARUPAKA_BACKEND_URL } from '@env';
import { IS_POST_DEVICE_ID, onUpdataThisFunction } from "./common";

export const postDeviceId = async (deviceToken: string): Promise<boolean> => {
    try {
        const response = await fetch(`${ARUPAKA_BACKEND_URL}/device_token/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceToken: deviceToken,
            }),
        });

        if (!response.ok) {
            console.error('送信失敗:', response.status);

            if (response.status == 400) {
                await onUpdataThisFunction(IS_POST_DEVICE_ID);
                console.error('送信失敗: 400エラー');
                return true;
            }

            return false;
        }

        const contentType = response.headers.get('content-type');
        let responseData;

        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text(); // JSONじゃない場合はこちら
        }

        console.log('送信成功:', responseData);
        await onUpdataThisFunction(IS_POST_DEVICE_ID);
        return true;
    } catch (error) {
        console.error('postDeviceId エラー:', error);
        return false;
    }
};
