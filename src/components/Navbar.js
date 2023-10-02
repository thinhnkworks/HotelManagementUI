import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import './Navbar.css';
import './img/logo.jpg'
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const [setpage,setPage]=useState(false);
  
  // const changeAdminPage=()=>setPage(!setpage);

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <img src="src\components\img\logo1.jpg" alt='Hình logo'/> 
          <div className='nameHotel'>
            <span>Novoltel</span>
          </div>
          <div className='searchInput' >
            <div className='searchIcon'>
              <AiIcons.AiOutlineSearch style={{ color: '#999', fontSize: '40px',paddingTop:'6px'}} />
            </div>
            <input type="text" placeholder="Tìm kiếm..."/>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>  
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}> 
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;