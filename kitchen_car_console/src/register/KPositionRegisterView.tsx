import React, { useState } from "react";
import car_defalue_image from "../data/car_defalut_image.json";
import { useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { auth } from "../firebase";
import { setDoc, doc, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function KPositionRegisterView() {
  const [storeName, setStoreName] = useState("");
  const [message, setMessage] = useState("");
  const [herf, setHerf] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageURI, setImageURI] = useState(
    "https://firebasestorage.googleapis.com/v0/b/arupaka-kitchen-car.appspot.com/o/kitchen_car_image%2Fdefalut%2Fwagon_1.png?alt=media"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const generateMapUrl = () => {
    return `https://maps.google.co.jp/maps?output=embed&q=${query.get(
      "latitude"
    )},${query.get("longitude")}&ll=${query.get("latitude")},${query.get(
      "longitude"
    )}&t=m&hl=ja&z=18`;
  };

  const resetPosition = () => {
    if (window.confirm("入力情報がリセットされます。")) {
      window.location.href =
        "http://arukarupaka.starfree.jp/getLocation.html?Latitude=34.9800015&Longitude=135.9627502&zoom=20&develop=false";
    }
  };

  const goHoem = () => {
    if (window.confirm("入力情報がリセットされます。")) {
      window.location.href = "/";
    }
  };

  const sendData = async () => {
    if (
      !storeName ||
      !message ||
      !herf ||
      !startTime ||
      !endTime ||
      !imageURI
    ) {
      setErrorMessage("すべての項目を入力して下さい。");
      return;
    }
    if (auth.currentUser) {
      setDoc(doc(db, "car_position_BKC", auth.currentUser.uid.toString()), {
        storeName: storeName,
        message: message,
        herf: herf,
        startTime: startTime,
        endTime: endTime,
        imageURI: imageURI,
        time: serverTimestamp(),
      });
      if (
        !alert(
          "登録しました。この登録は本日に限り有効です。ホーム画面に戻ります。"
        )
      ) {
        window.location.href = "/";
      }
    } else {
      if (
        window.confirm(
          "ログインしていません。リダイレクトします。入力情報がリセットされます。"
        )
      ) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 pt-20">
      <h1 className="font-bold text-xl text-center mb-10">出店情報登録</h1>
      <h1 className="font-bold text-lg">店名登録</h1>
      <input
        className="w-full border-2 mb-5"
        type="text"
        onChange={(event) => setStoreName(event.target.value)}
        value={storeName}
        placeholder="店舗名を入力してください"
      />
      <h1 className="font-bold text-lg">おすすめ情報を入力してください</h1>
      <input
        className="w-full border-2 mb-5"
        type="text"
        onChange={(event) => setMessage(event.target.value)}
        value={message}
        placeholder="おすすめ情報を入力してください"
      />
      <h1 className="font-bold text-lg">
        検索にヒットさせる単語を入力してください。（　#唐揚げ　#安い　など）
      </h1>
      <input
        className="w-full border-2 mb-5"
        type="text"
        onChange={(event) => setHerf(event.target.value)}
        value={herf}
        placeholder="検索にヒットさせる単語を入力してください"
      />
      <h1 className="font-bold text-lg">本日の営業時間を入力してください</h1>
      <input
        className="border-2 mb-5"
        type="time"
        value={startTime}
        onChange={(event) => setStartTime(event.target.value)}
      />
      から
      <input
        className="border-2 mb-5"
        type="time"
        value={endTime}
        onChange={(event) => setEndTime(event.target.value)}
      />
      まで
      <div>
        <h1 className="font-bold text-lg">キッチンカーの画像を選択</h1>
        <div className="flex flex-wrap">
          {car_defalue_image.map((data) => {
            return (
              <div
                className={`flex flex-col border-4 w-[135px] m-1 items-center rounded-sm ${
                  imageURI == data.image ? "border-[#C1191A]" : ""
                }`}
              >
                <input
                  type="radio"
                  id={data.id}
                  name="car_image"
                  value={data.image}
                  onChange={(event) => setImageURI(event.target.value)}
                  className="hidden"
                />
                <label htmlFor={data.id}>
                  <img src={data.image} />
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <h1 className="font-bold text-lg mt-5">
        キッチンカーの場所(変更できません。変更する場合は最初からやり直してください)
      </h1>
      <div className="w-full h-80">
        <iframe className="h-80 w-full" src={generateMapUrl()}></iframe>
      </div>
      <div className="text-center text-red-600 mt-5">{errorMessage}</div>{" "}
      <div className={`flex mt-5 mb-5 ${isMobile ? "flex-col-reverse" : ""}`}>
        <div
          onClick={() => goHoem()}
          className="flex-1 text-center  h-10 leading-10"
        >
          キャンセル
        </div>
        <div
          className="flex-1 text-center h-10 leading-10 "
          onClick={() => resetPosition()}
        >
          位置情報を登録しなおす
        </div>
        <div
          className="flex-1 text-center bg-[#C1191A] text-white h-10 leading-10 rounded-md active:bg-[#D9D9D9]"
          onClick={() => sendData()}
        >
          登録
        </div>
      </div>
    </div>
  );
}
