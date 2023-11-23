import React, { useState, useEffect } from 'react';
import './css/Bookings.css';
import AddSurChargeForm from './Bookings/AddBookings.js';
import DeleteBookingForm from './Surcharges/DeleteSurcharges.js';
import EditBookingsForm from './Bookings/EditBookings.js';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function Booking() {
  const [dataBookings, setDataBookings] = useState([]);
  const apiDatPhongs="https://service-hotelmanagement-dev.azurewebsites.net/api/datphong";

  // Function to add a new booking
  const addBooking = (newBooking) => {
    // Add the new booking to the dataBookings state
    setDataBookings((prevData) => [...prevData, newBooking]);
  };


  //*******************------------------ */ [] để đảm bảo sẽ chạy chỉ một lần sau khi nạp trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataBookings.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataBookings.length / recordsPerPage);
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
const [addBookingsForm, setAddBookings] = useState(false);
const ShowAddBookings = () => setAddBookings(!addBookingsForm);

  
//**********************----------------------Form DeleteClient
const [bookingToDelete, setBookingToDelete] = useState(null);

const [deleteBookings, setDeleteBookings] = useState(false);
const ShowDeleteBooking = () => setDeleteBookings(!deleteBookings);


  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
  ShowDeleteBooking(true);
  };
  const handleCancelDelete = () => {
    ShowDeleteBooking(false);
  };

const handleRemoveClick = () => {
  if (bookingToDelete) {
    const MaSK = bookingToDelete.MaSK;
    // Tìm vị trí của phần tử cần xóa trong mảng dataBookings
  const indexToRemove = dataBookings.findIndex((booking) => booking.MaSK === MaSK);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`${apiDatPhongs}/${MaSK}`, {
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

        // Xóa phần tử khỏi mảng dataBookings sau khi xóa thành công trên API
        const newDataBookings = [...dataBookings];
        newDataBookings.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataBookings(newDataBookings);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeleteBooking(false);
  }
  }
  
};

//********************-------------------------From EditClient
const [selectedBooking, setSelectedBooking] = useState(null);


const [editBookingsForm, setEditBookings] = useState(false);
const ShowEditBooking = () => setEditBookings(!editBookingsForm);

const handleRowClick = (booking) => {
  setSelectedBooking(booking);
  console.log(booking);
  ShowEditBooking(true);
};


const handleEditClick = () => {
  // Tìm vị trí của phần tử cần sửa trong mảng dataClients
    setEditBookings(!editBookingsForm);
    setSelectedBooking(null);
};


useEffect(() => {
  // Fetch data from the API URL
  const fetchDataWithAuthorization = async () => {
    try {
      const response = await fetch(apiDatPhongs, {
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
      setDataBookings(data.data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataWithAuthorization();  // Call the function to initiate the fetch

}, [addBookingsForm, selectedBooking]);

  
  return (
    <div className='bookings'>
      <p id='title'>Phụ phí</p>
      <div className='btn_FillAdd'>
        <button id='btn_themPP' type="submit" onClick={ShowAddBookings}>Đặt phòng</button>
        <div>{addBookingsForm && <AddSurChargeForm onCancel={() => setAddBookings(!addBookingsForm)}    onAddBooking={addBooking}/>}</div>
      </div>
      {/* class Thêm khách hàng */}
      <div className='tableThemKH'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Mã sự kiện</th>
                <th>Mã phòng</th>
                <th>Mã khách hàng</th>
                <th>Mã nhân viên</th>
                <th>Số ngày ở</th>
                <th>Ngày nhận phòng</th>
                <th>Ngày trả phòng</th>
              </tr>
            </thead>
              <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.maSK}</td>
                  <td>{d.maPhong}</td>
                  <td>{d.maKH}</td>
                  <td>{d.maNV}</td>
                  <td>{d.soNgayO}</td>
                  <td>{new Date(d.ngayNhanPhong).toLocaleDateString()}</td>
                  <td>{new Date(d.ngayTraPhong).toLocaleDateString()}</td>
                  <td id='removeData' onClick={() => handleDeleteClick(d)}> <AiTwotoneDelete/></td>
                  <td id='editData' onClick={() => {handleRowClick(d);console.log(editBookingsForm)}} > <BsThreeDotsVertical/></td>
                  <div> 
                  {deleteBookings && (
        <DeleteBookingForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.MaSK) }  bookingToDelete={bookingToDelete}/>)}
                  </div>
                  <div>
                    {editBookingsForm && (<EditBookingsForm onCancel={() => {setEditBookings(!editBookingsForm); setSelectedBooking(null);console.log(editBookingsForm)}}
                                        editData={{
                                          maSKDP: selectedBooking.MaSK,
                                          ...selectedBooking,
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


export default Booking;