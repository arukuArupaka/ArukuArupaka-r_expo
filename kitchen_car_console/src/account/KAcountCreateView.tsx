import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default function KAcountCreateView() {
  const [userCredentialS, setUserCredential] = useState<UserCredential>();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordConf, setPassWordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const create_account = async () => {
    if (password !== passwordConf) {
      setErrorMessage("同じパスワードを入力してください");
      return;
    }

    try {
      if (userCredentialS) {
        await sendEmailVerification(await userCredentialS.user);
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(await userCredential.user);
      await sendEmailVerification(await userCredential.user);
      setUserCredential(userCredential);
      window.location.href = "/";
    } catch (e) {
      console.log("catch");
      console.log(e.message);
      switch (e.message) {
        case "Firebase: Error (auth/invalid-email).":
          setErrorMessage("メールアドレスを入力してください");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setErrorMessage("パスワードは6文字以上にしてください");
          break;
        case "Firebase: Error (auth/too-many-requests).":
          setErrorMessage("一定時間ロックされました。");
          break;
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 pt-20">
      <h1 className="font-bold text-xl text-center mb-10">アカウント作成</h1>
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
      <h1 className="font-bold text-lg">パスワード確認</h1>
      <input
        className="w-full border-2 mb-5"
        type="password"
        onChange={(event) => setPassWordConf(event.target.value)}
        value={passwordConf}
        placeholder="パスワードを再入力"
      />
      <div className="text-center text-red-600">{errorMessage}</div>
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
            create_account();
          }}
        >
          登録
        </div>
      </div>
    </div>
  );
}
