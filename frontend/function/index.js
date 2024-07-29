const admin = require('firebase-admin');

// サービスアカウントキーのパスを指定
let serviceAccount = require('../../../arukuarupaka-6e101-752b0f243353.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function sendNotification(message) {
  var payload = {
    notification: {
      title: "新しいメッセージ",
      body: message.text, // ここにメッセージの本文を挿入
    }
  };

  var options = {
    priority: "high",
    timeToLive: 60 * 60 *24 // 1日
  };

  admin.messaging().sendToDevice('Bさんのデバイストークン', payload, options)
    .then(response => {
      console.log("Successfully sent message:", response);
    })
    .catch(error => {
      console.log("Error sending message:", error);
    });
}

var db = admin.firestore();
var messagesRef = db.collection('messages');

messagesRef.where('to', '==', 'BさんのユーザーID').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      var message = change.doc.data();
      sendNotification(message); // 通知を送信する関数
    }
  });
});