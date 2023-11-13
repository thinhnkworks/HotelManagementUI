import React, { useState, useEffect } from 'react';
import './css/Clients.css';
import AddPersonnelsForm from './Personnels/AddPersonnels.js';
import DeleteClientForm from './Clients/DeleteClients.js';
import EditPersonnelsForm from './Personnels/EditPersonnels.js';
import { FiFilter } from 'react-icons/fi';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function Personnels() {

// ******************-------------------------------Form AddClient
const [addPersonnelsForm, setAddPersonnels] = useState(false);
const ShowAddPersonnels = () => setAddPersonnels(!addPersonnelsForm);  

  const [dataPersonnels, setDataPersonnels] = useState([]);
  const apiNhanViens="https://service-hotelmanagement-dev.azurewebsites.net/api/nhanviens";

  // Function to add a new personnel
  const addPersonnel = (newPersonnel) => {
    // Add the new personnel to the dataPersonnels state
    setDataPersonnels((prevData) => [...prevData, newPersonnel]);
  };


  //*******************------------------ */ [] để đảm bảo sẽ chạy chỉ một lần sau khi nạp trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataPersonnels.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataPersonnels.length / recordsPerPage);
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


//********************-------------------------From EditPersonnel
const [selectedPersonnel, setSelectedPersonnel] = useState(null);


const [editPersonnelsForm, setEditPersonnels] = useState(false);
const ShowEditPersonnel = () => setEditPersonnels(!editPersonnelsForm);

const handleRowClick = (personnel) => {
  setSelectedPersonnel(personnel);
  console.log(personnel);
  ShowEditPersonnel(true);
};


const handleEditClick = () => {
  // Tìm vị trí của phần tử cần sửa trong mảng dataPersonnels
    setEditPersonnels(!editPersonnelsForm);
    setSelectedPersonnel(null);
};



  //**********************----------------------Form DeleteClient
const [personnelToDelete, setPersonnelToDelete] = useState(null);

const [deletePersonnel, setDeletePersonnels] = useState(false);
const ShowDeletePersonnel = () => setDeletePersonnels(!deletePersonnel);


  const handleDeleteClick = (personnel) => {
    setPersonnelToDelete(personnel);
  ShowDeletePersonnel(true);
  };
  const handleCancelDelete = () => {
    ShowDeletePersonnel(false);
  };

const handleRemoveClick = () => {
  if (personnelToDelete) {
    const maNV = personnelToDelete.maNV;
    // Tìm vị trí của phần tử cần xóa trong mảng dataPersonnels
  const indexToRemove = dataPersonnels.findIndex((personnel) => personnel.maNV === maNV);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`${apiNhanViens}/${maNV}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add your authorization token here, replace 'YOUR_TOKEN' with the actual token
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Xóa phần tử khỏi mảng dataPersonnels sau khi xóa thành công trên API
        const newDataPersonnels = [...dataPersonnels];
        newDataPersonnels.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataPersonnels(newDataPersonnels);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeletePersonnel(false);
  }
  }
  
};
useEffect(() => {
  // Fetch data from the API URL
    // Fetch data from the API URL
    const fetchDataWithAuthorization = async () => {
      try {
        const response = await fetch(apiNhanViens, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add your authorization token here, replace 'YOUR_TOKEN' with the actual token
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
  
        const data = await response.json();
        setDataPersonnels(data.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDataWithAuthorization();  // Call the function to initiate the fetch
}, [addPersonnelsForm, selectedPersonnel]);


  return (
    <div className='clients'>
      <p id='title'>Nhân viên</p>
      <div className='btn_FillAdd'>
        <button id='btn_themNV' type="submit" onClick={ShowAddPersonnels}>Thêm nhân viên</button>
        <button id='btn_loc' type='submitLoc'> <FiFilter /> Lọc</button>
        <div>{addPersonnelsForm && <AddPersonnelsForm onCancel={() => setAddPersonnels(!addPersonnelsForm)}  onAddPersonnel={addPersonnel}/>}</div>
      </div>
      {/* class Thêm khách hàng */}
      <div className='tableThemKH'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Mã nhân viên</th>
                <th>Họ tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>CCCD</th>
                <th>Chức vụ</th>
              </tr>
            </thead>
              <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.maNV}</td>
                  <td>{d.hoTen}</td>
                  <td>{d.ngaySinh}</td>
                  <td>{d.gioiTinh}</td>
                  <td>{d.diaChi}</td>
                  <td>{d.sdt}</td>
                  <td>{d.cccd}</td>
                  <td>{d.quanLy ? 'Quản lý' : 'Nhân viên'}</td>
                  <td id='removeData' onClick={() => handleDeleteClick(d)}> <AiTwotoneDelete/></td>
                  <td id='editData' onClick={() => {handleRowClick(d);console.log(editPersonnelsForm)}}> <BsThreeDotsVertical/></td>
                  <div> 
                  {deletePersonnel && (
        <DeleteClientForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.maNV) }  personnelToDelete={personnelToDelete}/>)}
                  </div>
                  <div>
                    {editPersonnelsForm && (<EditPersonnelsForm onCancel={() => {setEditPersonnels(!editPersonnelsForm); setSelectedPersonnel(null);console.log(editPersonnelsForm)}}
                                        editData={{
                                          maNV: selectedPersonnel.maNV,
                                          ...selectedPersonnel,
                                        }}
                                        onConfirm={() => handleEditClick()}
/>
                                      )}
                  </div>
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

export default Personnels;
