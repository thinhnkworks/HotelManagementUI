import React from 'react';
import logo from '../components/img/ImgKhachSan.jpg';
import './css/Home.css'
function Home() {
  return (
    <div className='surcharges'>
      <img className='logo' src={logo} alt='Hình khách sạn'/>
    </div>
  );
}

export default Home;