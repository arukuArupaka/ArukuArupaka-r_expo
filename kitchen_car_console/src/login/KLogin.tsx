import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function KLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href =
        "http://arukarupaka.starfree.jp/getLocation.html?Latitude=34.9800015&Longitude=135.9627502&zoom=20&develop=false";
    } catch (e) {
      console.log(e.message);
      switch (e.message) {
        case "Firebase: Error (auth/invalid-credential).":
          setErrorMessage("メールアドレスまたはパスワードが間違えています。");
          break;
        case "Firebase: Error (auth/invalid-email).":
          setErrorMessage("メールアドレスを入力してください。");
          break;
        case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
          setErrorMessage("一定時間ロックされました。");
          break;
        default:
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 pt-20">
      <h1 className="font-bold text-xl text-center mb-10">ログイン</h1>
      <h1 className="font-bold text-lg">メールアドレスを入力</h1>
      <input
        className="w-full border-2 mb-5"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        placeholder="メールアドレスを入力"
      />
      <h1 className="font-bold text-lg">パスワードを入力</h1>
      <input
        className="w-full border-2 mb-5"
        type="password"
        onChange={(event) => setPassWord(event.target.value)}
        value={password}
        placeholder="パスワードを入力"
      />
      <div className="text-center">
      <Link to="/create_account" className=" text-red-600 text-sm">
        新規アカウント登録
      </Link>
      </div>
      <div className="mt-5 text-center text-red-600">{errorMessage}</div>
      <div className={`flex mt-5 mb-5 ${isMobile ? "flex-col-reverse" : ""}`}>
        <Link
          to="/"
          className="flex-1 text-center  h-10 leading-10 mix-w-20 px-10"
        >
          キャンセル
        </Link>
        <div
          className="flex-1 text-center mix-w-20 bg-[#C1191A] mx-14 text-white h-10 leading-10 rounded-md active:bg-[#D9D9D9]"
          onClick={() => {
            Login();
          }}
        >
          ログイン
        </div>
      </div>
    </div>
  );
}
