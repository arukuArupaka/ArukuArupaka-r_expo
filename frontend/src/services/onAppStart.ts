import { Alert } from "react-native";
import { getDeviceId, IS_POST_DEVICE_ID, IsUpdataThisFunction } from "../functions/common"
import { postDeviceId } from "../functions/deviceAPI"

export const onAppStart = async () => {
    // 初回起動時の処理



    // デバイスIDが未送信の場合にデバイスIDを送信する
    if (await IsUpdataThisFunction(IS_POST_DEVICE_ID)) {
        console.log('デバイスIDを送信します。');
        // 例: デバイスIDを取得してサーバーに送信
        const device_token = await getDeviceId()
        if (device_token) {
            await postDeviceId(device_token)
        }
    }

}