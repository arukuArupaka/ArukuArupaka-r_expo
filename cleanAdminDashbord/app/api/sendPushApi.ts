import fetch from "node-fetch";

export default (req: any, res: { statusCode: number }) => {
  res.statusCode = 200;
  if (process.env.DEVICE_TOKEN) {
    const pushMessage = {
      to: process.env.DEVICE_TOKEN,
      sound: "default",
      title: "いつもご利用いただきありがとうございます。",
      body: "今後もよろしくお願いいたします。",
    };
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pushMessage),
    });
  } else {
    console.log(".env.localにtokenが設定されていません。");
  }
};
