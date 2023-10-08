import React, { useState } from 'react';
import './css/Clients.css'
import AddClientsForm from './Clients/AddClients.js';
import DataClients from './Data/DataClients.json';
import { FiFilter } from 'react-icons/fi';

function Clients() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = DataClients.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DataClients.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [addClients, setAddClients] = useState(false);
  const ShowAddClients = () => setAddClients(!addClients);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changeCpage = (id) => {
    setCurrentPage(id);
  }

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className='clients'>
      <p id='title'>Khách hàng</p>
      <div className='btn_FillAdd'>
        <button id='btn_themKH' type="submit" onClick={ShowAddClients}>Thêm khách hàng</button>
        <button id='btn_loc' type='submitLoc'> <FiFilter /> Lọc</button>
        <div>{addClients && <AddClientsForm onCancel={() => setAddClients(!addClients)} />}</div>
      </div>
      {/* class Thêm khách hàng */}
      <div className='tableThemKH'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Mã khách hàng</th>
                <th>Họ tên</th>
                <th>Số lần nghỉ</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>CCCD</th>
                <th>Xếp hạng</th>
              </tr>
            </thead>
            <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d['Mã khách hàng']}</td>
                  <td>{d['Họ tên']}</td>
                  <td>{d['Số lần nghỉ']}</td>
                  <td>{d['Ngày sinh']}</td>
                  <td>{d['Giới tính']}</td>
                  <td>{d['Địa chỉ']}</td>
                  <td>{d['Số điện thoại']}</td>
                  <td>{d['CCCD']}</td>
                  <td>{d['Xếp hạng']}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <button className='page-link' onClick={prevPage}>Prev</button>
              </li>
              {numbers.map((n, i) => (
                <li className='page-item' key={i}>
                  <button className={`page-item ${currentPage === n ? 'active' : ''}`} onClick={() => changeCpage(n)}>
                    {n}
                  </button>
                </li>
              ))}
              <li className='page-item'>
                <button className='page-link' onClick={nextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Clients;
