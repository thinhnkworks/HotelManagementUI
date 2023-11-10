import React, { useState, useEffect } from 'react';
import './css/Clients.css';
import AddClientsForm from './Clients/AddClients.js';
import DeleteClientForm from './Clients/DeleteClients.js';
import EditClientsForm from './Clients/EditClients.js';
import { FiFilter } from 'react-icons/fi';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function Clients() {
    // Thêm state để lưu CCCD và kết quả kiểm tra
const [cccdValue, setCccdValue] = useState('');
const [cccdCheckResult, setCccdCheckResult] = useState({});

// ******************-------------------------------Form AddClient
const [addClientsForm, setAddClients] = useState(false);
const ShowAddClients = () => setAddClients(!addClientsForm);

  const [dataClients, setDataClients] = useState([]);
  const apiKhachHangs="https://service-hotelmanagement-dev.azurewebsites.net/api/khachhangs";

  // Function to add a new client
  const addClient = (newClient) => {
    // Add the new client to the dataClients state
    setDataClients((prevData) => [...prevData, newClient]);
  };


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
const [selectedClient, setSelectedClient] = useState(null);


const [editClientsForm, setEditClients] = useState(false);
const ShowEditClient = () => setEditClients(!editClientsForm);

const handleRowClick = (client) => {
  setSelectedClient(client);
  console.log(client);
  ShowEditClient(true);
};


const handleEditClick = () => {
  // Tìm vị trí của phần tử cần sửa trong mảng dataClients
    setEditClients(!editClientsForm);
    setSelectedClient(null);
};



  //**********************----------------------Form DeleteClient
const [clientToDelete, setClientToDelete] = useState(null);

const [deleteClient, setDeleteClients] = useState(false);
const ShowDeleteClient = () => setDeleteClients(!deleteClient);


  const handleDeleteClick = (client) => {
    setClientToDelete(client);
  ShowDeleteClient(true);
  };
  const handleCancelDelete = () => {
    ShowDeleteClient(false);
  };

const handleRemoveClick = () => {
  if (clientToDelete) {
    const maKH = clientToDelete.maKH;
    // Tìm vị trí của phần tử cần xóa trong mảng dataClients
  const indexToRemove = dataClients.findIndex((client) => client.maKH === maKH);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`${apiKhachHangs}/${maKH}`, {
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
  }
  
};
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
}, [addClientsForm, selectedClient]);


const handleCheckCCCD = async () => {
  // Kiểm tra xem CCCD có giá trị hay không
  if (!cccdValue) {
    alert("Vui lòng nhập số CCCD để kiểm tra.");
    return;
  }

  try {
    // Gửi yêu cầu GET đến API
    const response = await fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/KhachHangs/cccd/${cccdValue}`, {
      method: 'GET',
      mode: 'cors', // Đảm bảo mode là 'cors'
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();

    // Cập nhật state với kết quả từ API
    setCccdCheckResult(data);

    // Sử dụng window.alert thay vì window.confirm
    if (data.success) {
      // Kiểm tra xem maKH có tồn tại trong dữ liệu hay không
      const maKH = data.data.maKH || 'Không có'; // Nếu không tồn tại, sử dụng 'Không có'
      // Hiển thị maKH trong cửa sổ thông báo
      alert(`Khách hàng còn tồn tại. Mã khách hàng là: ${maKH}`);

      // Tự động tắt thông báo sau 3 giây (3000 miligiây)
      setTimeout(() => {
        // Đóng cửa sổ hoặc thực hiện hành động khác
        // Ví dụ: window.close();
      }, 3000);
    } else {
      alert("Không tìm thấy thông tin khách hàng.");
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra CCCD:', error);
    alert("Khách hàng trên chưa có trong hệ thống.");
  }
};


  return (
    <div className='clients'>
      <p id='title'>Khách hàng</p>
      <div className='btn_FillAdd'>

<br />
<input type="text" name="cccd" placeholder="Nhập căn cước công dân " onChange={(e) => setCccdValue(e.target.value)} />
<input type="submit" value="Kiểm tra" id="submit-button" onClick={handleCheckCCCD}/>
        <button id='btn_themKH' type="submit" onClick={ShowAddClients}>Thêm khách hàng</button>
        <button id='btn_loc' type='submitLoc'> <FiFilter /> Lọc</button>
        <div>{addClientsForm && <AddClientsForm onCancel={() => setAddClients(!addClientsForm)}  onAddClient={addClient}/>}</div>
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
                  <td id='removeData' onClick={() => handleDeleteClick(d)}> <AiTwotoneDelete/></td>
                  <td id='editData' onClick={() => {handleRowClick(d);console.log(editClientsForm)}}> <BsThreeDotsVertical/></td>
                  <div> 
                  {deleteClient && (
        <DeleteClientForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.maKH) }  clientToDelete={clientToDelete}/>)}
                  </div>
                  <div>
                    {editClientsForm && (<EditClientsForm onCancel={() => {setEditClients(!editClientsForm); setSelectedClient(null);console.log(editClientsForm)}}
                                        editData={{
                                          maKH: selectedClient.maKH,
                                          ...selectedClient,
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

export default Clients;
