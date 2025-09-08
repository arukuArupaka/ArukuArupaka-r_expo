// pages/api/send-test-notification.js

export default async function handler(req, res) {
  // CORSヘッダーの設定（念のため、異なるドメインからアクセスする場合に備えて）
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONSメソッドへの対応（CORSプリフライトリクエスト用）
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
  // ★ ここに、あなたがiPhoneアプリで取得したトークンを貼り付けてください ★
  // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
  const YOUR_PUSH_TOKEN = "ExponentPushToken[7Fp_hqFdOyc_6nHiOCLmSk]";
  // 例: const YOUR_PUSH_TOKEN = "ExponentPushToken[7Ep_hqFdOyc_6nHiOCLmSk]";

  // トークンが設定されていない場合はエラーを返す
  if (YOUR_PUSH_TOKEN === "ExponentPushToken[7Fp_hqFdOyc_6nHiOCLmSk]") {
    return res.status(500).json({
      success: false,
      message:
        "APIコード内の `YOUR_PUSH_TOKEN` をあなたのトークンに書き換えてください。",
    });
  }

  // 送信するメッセージ
  const message = {
    to: YOUR_PUSH_TOKEN,
    sound: "default",
    title: "テスト通知です！",
    body: "APIから正常に送信されました🎉",
    data: { withSome: "data" },
  };

  try {
    // Expoのプッシュ通知サーバーにリクエストを送信
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    // 成功のレスポンスを返す
    res.status(200).json({
      success: true,
      message: `通知を ${YOUR_PUSH_TOKEN} 宛に送信しました。`,
    });
  } catch (error) {
    // エラーが発生した場合
    console.error("Push notification error:", error);
    res.status(500).json({
      success: false,
      message: "通知の送信中にエラーが発生しました。",
      error: error.message,
    });
  }
}
