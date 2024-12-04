import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase.js"

export default function Login() {
  const router = useRouter();

  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ユーザーがログインボタンを押したときにdoLogin関数が実行される
  const doLogin = () => {
    // const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        // ログイン成功時の処理
        const user = userCredential.user;
        alert('ログイン成功！');
        console.log(user);
        router.push('/EventPost')
      })
      .catch((error) => {
        // エラー処理
        console.error(error);
        alert('ログインに失敗しました');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>サークルカレンダーログイン</h1>
      <div style={{ width: '300px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label>メールアドレス：</label>
            <input
              type="email"
              name="email"
              style={{ height: '50px', fontSize: '1.2rem', width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>パスワード：</label>
            <input
              type="password"
              name="password"
              style={{ height: '50px', fontSize: '1.2rem', width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            style={{ width: '100%', height: '50px', backgroundColor: '#1D4ED8', color: 'white', fontSize: '1.2rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
            onClick={doLogin}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
