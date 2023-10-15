import React, { useState, useEffect } from 'react';
import './css/Clients.css';
import AddClientsForm from './Clients/AddClients.js';
import DeleteClientForm from './Clients/DeleteClients.js';
import { FiFilter } from 'react-icons/fi';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function Clients() {

// ******************-------------------------------Form AddClient
const [addClients, setAddClients] = useState(false);
const ShowAddClients = () => setAddClients(!addClients);

  const [dataClients, setDataClients] = useState([]);
  const apiKhachHangs="https://service-hotelmanagement-dev.azurewebsites.net/api/khachhangs";
  useEffect(() => {
    // Fetch data from the API URL
    fetch(apiKhachHangs)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataClients(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  
  //*******************------------------ */ [] để đảm bảo sẽ chạy chỉ một lần sau khi nạp trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataClients.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataClients.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const changeCpage = (id) => {
    setCurrentPage(id);
  }

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }


//********************-------------------------From EditClient
const [editClient, setEditClients] = useState(false);
const ShowEditClient = () => setEditClients(!editClient);


const handleViewClick = () => {
  ShowEditClient(true);
};
const handleCancelEdit = () => {
  ShowEditClient(false);
};

const handleEditClick = (maKH) => {
  // Tìm vị trí của phần tử cần xóa trong mảng dataClients
  const indexToRemove = dataClients.findIndex((client) => client.maKH === maKH);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/khachhangs/${maKH}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Xóa phần tử khỏi mảng dataClients sau khi xóa thành công trên API
        const newDataClients = [...dataClients];
        newDataClients.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataClients(newDataClients);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeleteClient(false);  
  }
};

  //**********************----------------------Form DeleteClient
const [deleteClient, setDeleteClients] = useState(false);
const ShowDeleteClient = () => setDeleteClients(!deleteClient);


  const handleDeleteClick = () => {
    ShowDeleteClient(true);
  };
  const handleCancelDelete = () => {
    ShowDeleteClient(false);
  };

const handleRemoveClick = (maKH) => {
  // Tìm vị trí của phần tử cần xóa trong mảng dataClients
  const indexToRemove = dataClients.findIndex((client) => client.maKH === maKH);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/khachhangs/${maKH}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Xóa phần tử khỏi mảng dataClients sau khi xóa thành công trên API
        const newDataClients = [...dataClients];
        newDataClients.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataClients(newDataClients);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeleteClient(false);
  }
};

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
                  <td>{d.maKH}</td>
                  <td>{d.hoTen}</td>
                  <td>{d.soLanNghi}</td>
                  <td>{d.ngaySinh}</td>
                  <td>{d.gioiTinh}</td>
                  <td>{d.diaChi}</td>
                  <td>{d.sdt}</td>
                  <td>{d.cccd}</td>
                  <td>{d.xepHang ? 'Có' : 'Không'}</td>
                  <td id='removeData' onClick={() => handleDeleteClick()}> <AiTwotoneDelete/></td>
                  <div>
                  {deleteClient && (
        <DeleteClientForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.maKH)} />
      )}
                  </div>
                  <td id='editData' onClick={() => handleEditClick(d.maKH)}> <BsThreeDotsVertical/></td>
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
