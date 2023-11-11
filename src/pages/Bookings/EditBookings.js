import React, { useState } from 'react';
import { format } from 'date-fns';
import './AddBookings.css';
import AddServiceForm from './AddServiceSurcharge/AddService.js';
import AddSurchargeForm from './AddServiceSurcharge/AddSurcharge.js';
function EditBookingForm(props) {
  const [addServiceForm, setAddServices] = useState(false);
  const [addSurchargeForm, setAddSurcharges] = useState(false);

  const formattedNgayNhanPhong = format(new Date(props.editData.ngayNhanPhong), 'yyyy-MM-dd');
  const formattedNgayTraPhong = format(new Date(props.editData.ngayTraPhong), 'yyyy-MM-dd');
  
  const ShowAddServices = () => {
    setAddServices(!addServiceForm);
  };
    const ShowAddSurcharges = () => {
    setAddSurcharges(!addSurchargeForm);
  };



  const [newBooking, setNewBooking] = useState({
    maPhong: props.editData.maPhong,
    maKH: props.editData.maKH,
    maNV: props.editData.maNV,
    soNgayO: props.editData.soNgayO,
    ngayNhanPhong: formattedNgayNhanPhong,
    ngayTraPhong: formattedNgayTraPhong,
  });

  const [errors, setErrors] = useState({
    maPhong: '',
    maKH: '',
    maNV: '',
    soNgayO: '',
    ngayNhanPhong: '',
    ngayTraPhong: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: value,
    });
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        setErrors({
          ...errors,
          [name]: '',
        });
  };


  const handleSubmit = (e) => {
    const maSK=props.editData.maSK.toString();
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
  
    // Kiểm tra và hiển thị thông báo lỗi
    const validationErrors = validateInput(newBooking);
    setErrors(validationErrors);
  
    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }
  
    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newBooking };
    console.log(JSON.stringify(dataToSend));
  
    // Gửi dữ liệu khách hàng mới lên API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/datphong/${maSK}`, {
      method: 'PATCH',
      mode: 'cors', // Đảm bảo mode là 'cors'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      } else if (response.status === 204) {
        console.log('Yêu cầu PATCH đã thành công.');
        props.onConfirm();
        // Có thể thực hiện xử lý khác sau khi gửi thành công
      }
        // Có thể thêm xử lý khác sau khi gửi thành công
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
        // Hiển thị thông báo lỗi cho người dùng (hoặc xử lý lỗi theo cách phù hợp với ứng dụng của bạn)
      });
  };
  
  

  const validateInput = (Booking) => {
    const errors = {
      maPhong: '',
      maKH: '',
      maNV: '',
      soNgayO: '',
      ngayNhanPhong: '',
      ngayTraPhong: '',
    };
  
    // Kiểm tra tên phụ phí
    if (!Booking.maPhong) {
      errors.maPhong = "Vui lòng nhập tên phụ phí.";
    }
  

  
    return errors;
  };
  

  const handleCancelClick = () => {
    // Gọi hàm callback để thông báo cho component cha
    props.onCancel();
  };
  const handleAddService=(e)=>
  {

    ShowAddServices();
    e.preventDefault();
  }
  const handleAddSurcharge=(e)=>
  {

    ShowAddSurcharges();
    e.preventDefault();
  }

  return (
    <div className='formAddBooking'>
      <div className="overlay">
        <div className="form-container">
        <div>{addServiceForm && <AddServiceForm maSKDP={props.editData.maSK} onCancel={() => setAddServices(!addServiceForm)} onco />}</div>
        <div>{addSurchargeForm && <AddSurchargeForm maSKDP={props.editData.maSK} onCancel={() => setAddSurcharges(!addSurchargeForm)} onco />}</div>
          <form className="containerAddBookings" >
            <div className="column-1">
              <label>Mã sự kiện</label><br/>
              <input type="text" id='maSK' name="maSK" placeholder="Mã sự kiện" disabled  onChange={handleInputChange} /><br /><br />
              <label>Mã nhân viên</label><br/>
              <input type="text" id='maNV' name="maNV" placeholder="Nhập mã nhân viên" value={newBooking.maNV} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.maNV}</div><br />
              <label>Số ngày ở</label><br/>
              <input type="text" id='soNgayO' name="soNgayO" placeholder="Nhập số ngày ở" value={newBooking.soNgayO} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.soNgayO}</div><br />
              <label>Ngày nhận phòng</label><br/>
              <input type="date" id="ngayNhanPhong" name="ngayNhanPhong" placeholder="Ngày nhận phòng" value={newBooking.ngayNhanPhong} onChange={handleInputChange}/><br />

            </div>
            <div className="column-2">
            <label>Mã phòng</label><br/>

              <input type="text" id='maPhong' name="maPhong" placeholder="Nhập mã phòng " value={newBooking.maPhong} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.maPhong}</div><br />
              <label>Mã khách hàng</label><br/>
              <input type="text" id='maKH' name="maKH" placeholder="Nhập mã khách hàng" value={newBooking.maKH} onChange={handleInputChange} /><br /><br />
              <div className='addSurchargesService'>
              <input type="submit" value="Thêm dịch vụ" id="addService-button" onClick={handleAddService}/>
              <input type="submit" value="Thêm phụ phí" id="submit-button" onClick={handleAddSurcharge}/>
              </div><br/><br/><br/>
              <label>Ngày trả phòng</label><br/>
              <input type="date" id="ngayTraPhong" name="ngayTraPhong" placeholder="Ngày nhận phòng" value={newBooking.ngayTraPhong} onChange={handleInputChange}/><br /><br />
              <div className="button ">
              <input type="submit" value="Hủy" id="cancel-button" onClick={handleCancelClick} />
              <input type="submit" value="Xác nhận" id="submit-button" onClick={handleSubmit}/>
            </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default EditBookingForm;
