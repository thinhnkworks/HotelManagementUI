import React from 'react';
import './css/Clients.css'
function Clients() {
  return (
    <div className='clients'>
      <p id='title'>Khách hàng</p>
      <div className='btn_Fill'>
        <button id='btn_themKH' type="submit">Thêm khách hàng</button>
        <button id='btn_loc' type='submitLoc'>Lọc</button>
      </div>
      {/* class Thêm khách hàng */}
      <div className='formThemKH'>
        <div>
          <label> Mã khách hàng</label>
        </div>
      </div>
    </div>
  );
}

export default Clients;