"use client"; // クライアントコンポーネントとしてマーク

import { useState } from 'react';
import Register from "./login/register"; // パスを確認
import Login from "./login/Login"; // パスを確認
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [showRegister, setShowRegister] = useState(false); // useStateでshowRegisterを定義

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Conditional Rendering of Login and Register Components */}
      {showRegister ? (
        <Register />
      ) : (
        <div className="text-center">
          <Login />
          <p className="mt-4">
            新規登録はこちらから
            <button
              className="ml-2 text-blue-500 underline"
              onClick={() => setShowRegister(true)} // ボタンがクリックされたらshowRegisterをtrueにする
            >
              新規登録
            </button>

          </p>
          {/* <Link href={"/EventPost"}>index</Link>
           */}
            <div onClick={()=>router.push('/EventPost')}>
            aaaa
            </div>
        </div>

      )}
    </div>
  );
}