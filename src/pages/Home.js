import React from 'react';
import logo from '../components/img/ImgKhachSan.jpg';
function Home() {
  return (
    <div className='home'>
      <img className='logo' src={logo} alt='Hình khách sạn'/>
    </div>
  );
}

export default Home;