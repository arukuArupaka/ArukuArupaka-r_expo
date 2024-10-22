"use client"; // Add this line at the top

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

// Firebaseの初期化を行うためfirebaseAppをインポート
import firebaseApp from 'C:/Users/PC_User/arupaka/ArukuArupaka-r_expo/sa-kuru-sit/src/firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doRegister = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('登録完了！');
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>新規登録</h1>
      <div>
        <form>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>メールアドレス：</label>
            <input
              type="email"
              name="email"
              style={{ width: '100%', padding: '12px', fontSize: '1.2rem', borderRadius: '4px', border: '1px solid #ccc' }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>パスワード：</label>
            <input
              type="password"
              name="password"
              style={{ width: '100%', padding: '12px', fontSize: '1.2rem', borderRadius: '4px', border: '1px solid #ccc' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={doRegister}
          >
            登録
          </button>
        </form>
      </div>
    </div>
  );
}
