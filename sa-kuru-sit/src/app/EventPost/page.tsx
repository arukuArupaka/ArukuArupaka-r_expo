"use client";

import { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from "@/firebase";

const EventPost = () => {
  const [eventDateTime, setEventDateTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");

  const send = async (e: any) => {
    e.preventDefault(); 
    const docId = "customDocId"; 
    const eventData = {
      dateTime: eventDateTime,
      name: eventName,
      details: eventDetails,
    };
  
    try {
      await setDoc(doc(collection(db, "events")), eventData);
      console.log("Document written with ID: ", docId);
      setEventDateTime("");
      setEventName("");
      setEventDetails("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1 style={{ marginBottom: "24px", color: "#333", fontSize: "2rem", fontWeight: "bold" }}>
          サークルカレンダー投稿
        </h1>
        <form>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "bold" }}>
              日付けと時間：
            </label>
            <input
              type="datetime-local"
              value={eventDateTime}
              onChange={(e) => setEventDateTime(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "bold" }}>
              イベント名：
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "bold" }}>
              イベント詳細：
            </label>
            <textarea
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "150px",
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>カテゴリ：</label>
            <div className="relative">
              <select
                className="w-full bg-white text-slate-700 text-sm border border-slate-300 rounded-lg pl-3 pr-10 py-2 shadow-sm focus:outline-none focus:border-slate-400 hover:border-slate-400 transition duration-300 cursor-pointer"
              >
                <option value="party">飲み会</option>
                <option value="trip">旅行</option>
                <option value="volunteer">ボランティア</option>
              </select>
            </div>
          </div>
          <button
            onClick={send}
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4A90E2",
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ABD")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4A90E2")}
          >
            投稿する
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventPost;
