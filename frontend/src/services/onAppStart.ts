import { getDeviceId, IS_POST_DEVICE_ID, IsUpdataThisFunction } from "../functions/common"
import { postDeviceId } from "../functions/deviceAPI"

export const onAppStart = async () => {

    if (await IsUpdataThisFunction(IS_POST_DEVICE_ID)) {
        console.log('初回起動です');
        // 初回起動時の処理
        // 例: デバイスIDを取得してサーバーに送信
        await postDeviceId(await getDeviceId())
    }

}