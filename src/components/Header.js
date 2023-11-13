import { useState } from 'react';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import logo from './img/logo.jpg';
import avatarGuest from './img/avatar_guest.png';
import Avatar from './Avatar.js';
import './Header.css';
function Header(){
    const [showAvatarForm, setShowAvatarForm] = useState(false);

  const ShowAvatarForm = () => {
    setShowAvatarForm(!showAvatarForm);
  };
  const handleViewInfo=(e)=>
  {

    ShowAvatarForm();
    e.preventDefault();
  }
  
    return(
        <>
        <div className='header'>
            <div className='nameHotel_logo'>
                <img className='logo' src={logo} alt='Hình logo'/>
                <div className='nameHotel'>
                    <span>Novoltel</span>
                </div>
            </div>
                  <div className='searchInput' >
            <div className='searchIcon'>
              <AiIcons.AiOutlineSearch style={{ color: '#999', fontSize: '40px',paddingTop:'6px'}} />
            </div>
                <input type="text" placeholder="Tìm kiếm..."/>
            </div>
            <img className='avatar' src={avatarGuest} alt='Avatar' onClick={handleViewInfo}/>

        {showAvatarForm && <Avatar  onCancel={() => setShowAvatarForm(!showAvatarForm)}  onco />}
        </div>
        </>

    )
}
export default Header;