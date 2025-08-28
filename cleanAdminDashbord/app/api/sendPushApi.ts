import { NextApiRequest, NextApiResponse } from "next";
import { Expo } from "expo-server-sdk";

// Create a new Expo client
const expo = new Expo();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .end("許可されていないメソッドです。POST メソッドを使用してください。");
  }

  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "タイトルと本文は必須です。" });
  }

  try {
    // 仮のトークンを使用
    const mockTokens = [
      "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]", // 仮のExpoプッシュトークン
      "ExponentPushToken[yyyyyyyyyyyyyyyyyyyyyy]", // 必要に応じて追加
    ];

    // 仮のトークンを使って通知メッセージを作成
    const messages = mockTokens.map((token) => ({
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: { withSome: "data" }, // 任意のデータ
    }));

    // 3. Chunk and send notifications
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    console.log("通知をチャンクに分割して送信しています...");
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        console.log("送信結果:", ticketChunk);
      } catch (error) {
        console.error("通知チャンクの送信中にエラーが発生しました:", error);
      }
    }
    console.log("すべてのチャンクが送信されました。");

    res
      .status(200)
      .json({ message: "通知が送信キューに追加されました。", tickets });
  } catch (e) {
    const error = e as Error;
    console.error("予期しないエラー:", error.message);
    res.status(500).json({
      message: "予期しないエラーが発生しました。",
      error: error.message,
    });
  }
}
