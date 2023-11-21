import React, { useState, useEffect } from 'react';
import './css/Surcharges.css';

import DeleteInvoicesForm from './Services/DeleteServices.js';
import EditInvoicesForm from './Invoices/InvoiceDetails.js';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function Invoice() {
  const [dataInvoices, setDataInvoices] = useState([]);
  const apiHoaDons="https://service-hotelmanagement-dev.azurewebsites.net/api/hoadon";

  // Function to add a new invoice



  //*******************------------------ */ [] để đảm bảo sẽ chạy chỉ một lần sau khi nạp trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataInvoices.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataInvoices.length / recordsPerPage);
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

  // ******************-------------------------------Form AddClient


  
//**********************----------------------Form DeleteClient
const [invoiceToDelete, setInvoiceToDelete] = useState(null);

const [deleteInvoices, setDeleteInvoices] = useState(false);
const ShowDeleteInvoice = () => setDeleteInvoices(!deleteInvoices);


  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice);
  ShowDeleteInvoice(true);
  };
  const handleCancelDelete = () => {
    ShowDeleteInvoice(false);
  };

const handleRemoveClick = () => {
  if (invoiceToDelete) {
    const maHD = invoiceToDelete.maHD;
    // Tìm vị trí của phần tử cần xóa trong mảng dataInvoices
  const indexToRemove = dataInvoices.findIndex((invoice) => invoice.maHD === maHD);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`${apiHoaDons}/${maHD}`, {
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

        // Xóa phần tử khỏi mảng dataInvoices sau khi xóa thành công trên API
        const newDataInvoices = [...dataInvoices];
        newDataInvoices.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataInvoices(newDataInvoices);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeleteInvoice(false);
  }
  }
  
};

//********************-------------------------From EditClient
const [selectedInvoice, setSelectedInvoice] = useState(null);


const [editInvoicesForm, setEditInvoices] = useState(false);
const ShowEditInvoice = () => setEditInvoices(!editInvoicesForm);

const handleRowClick = (invoice) => {
  setSelectedInvoice(invoice);
  console.log(invoice);
  ShowEditInvoice(true);
};


const handleEditClick = () => {
  // Tìm vị trí của phần tử cần sửa trong mảng dataClients
    setEditInvoices(!editInvoicesForm);
    setSelectedInvoice(null);
};


  useEffect(() => {
    // Fetch data from the API URL
  const fetchDataWithAuthorization = async () => {
    try {
      const response = await fetch(apiHoaDons, {
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
      setDataInvoices(data.data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataWithAuthorization();  // Call the function to initiate the fetch
  }, [selectedInvoice]);
  return (
    <div className='surcharges'>
      <p id='title'>Hóa đơn</p><br/>
      <div className='btn_FillAdd'>
        {/* <button id='btn_themPP' type="submit" onClick={ShowAddInvoices}>Thêm dịch vụ</button>
        <button id='btn_loc' type='submitLoc'> <FiFilter /> Lọc</button> */}
      </div>
      {/* class Thêm khách hàng */}
      <div className='tableThemKH'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Mã sự kiện thuê</th>
                <th>Tên khách hàng</th>
                <th>Tên nhân viên</th>
                <th>Tên phòng</th>
                <th>Ngày nhận phòng</th>
                <th>Ngày trả phòng</th>
                <th>Tổng tiền</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
              <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.maHD}</td>
                  <td>{d.maSKThuePhong}</td>
                  <td>{d.hoTenKhachHang}</td>
                  <td>{d.hoTenNhanVien}</td>
                  <td>{d.tenPhong}</td>
                  <td>{new Date(d.ngayCheckIn).toLocaleDateString()}</td>
                  <td>{new Date(d.ngayCheckOut).toLocaleDateString()}</td>
                  <td>{d.triGiaDonHang}</td>
                  <td>{d.tinhTrang}</td>
                  {/* <td id='removeData' onClick={() => handleDeleteClick(d)}> <AiTwotoneDelete/></td> */}
                  <td id='editData' onClick={() => {handleRowClick(d);console.log(editInvoicesForm)}} > <BsThreeDotsVertical/></td>
                  <div> 
                  {deleteInvoices && (
        <DeleteInvoicesForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.maHD) }  invoiceToDelete={invoiceToDelete}/>)}
                  </div>
                  <div>
                    {editInvoicesForm && (<EditInvoicesForm onCancel={() => {setEditInvoices(!editInvoicesForm); setSelectedInvoice(null);console.log(editInvoicesForm)}}
                                        editData={{
                                          maHD: selectedInvoice.maHD,
                                          ...selectedInvoice,
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


export default Invoice;