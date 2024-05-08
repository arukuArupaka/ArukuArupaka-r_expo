import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { FaTruck } from "react-icons/fa";
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';


export default function KMain() {
  return (
    <div className={`max-w-4xl mx-auto p-3 pt-20 flex ${isMobile?"flex-col":""}`}>
      {/* <div onClick={()=>window.location.href = 'http://arukarupaka.starfree.jp/getLocation.html?Latitude=34.9800015&Longitude=135.9627502&zoom=20&develop=true'} className='flex-1 text-center flex border-2 py-8 m-8 justify-center rounded-xl'><FaTruck className='text-center text-3xl mr-2'/>出店場所登録</div> */}
      <Link to="/Login" className='flex-1 text-center flex border-2 py-8 m-8 justify-center rounded-xl'><FaTruck className='text-center text-3xl mr-2'/>出店場所登録</Link>
      <Link to="/create_account" className='flex-1 text-center flex border-2 py-8 m-8 justify-center rounded-xl'><VscAccount className='text-center text-3xl mr-2'/>新規アカウント登録</Link>
    </div>
  )
}
