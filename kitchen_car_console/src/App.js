import "./App.css";
import Header from "./common/Header.tsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import KMain from "./main/KMain.tsx";
import KPositionRegisterView from "./register/KPositionRegisterView.tsx";
import KMap from "./register/KMap.tsx";
import KAcountCreateView from "./account/KAcountCreateView.tsx";
import KLogin from "./login/KLogin.tsx";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KMain />} />
          <Route path="/positon_register" element={<KPositionRegisterView />} />
          <Route path="/create_account" element={<KAcountCreateView />} />
          <Route path="/login" element={<KLogin />} />
          <Route path="/login" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
