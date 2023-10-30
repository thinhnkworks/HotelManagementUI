import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import './Navbar.css';

import { IconContext } from 'react-icons';

function Navbar() {
  const [ sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  // const [setpage,setPage]=useState(false);
  
  // const changeAdminPage=()=>setPage(!setpage);

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            {/* <FaIcons.FaBars onClick={showSidebar} /> */}
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>  
              {/* <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link> */}
            </li>  
            {SidebarDataAdmin.map((item, index) => {
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