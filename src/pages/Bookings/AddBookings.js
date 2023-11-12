import React, { useState } from 'react';
import './AddBookings.css';
import AddServiceForm from './AddServiceSurcharge/AddService.js';
function AddBookingForm(props) {


  const [maSKDP, setMaSKDP] = useState('');
  const [addServiceForm, setAddServices] = useState(false);

  const ShowAddServices = () => {
    setMaSKDP(newBooking.maSKDP); // Assuming maSKDP is the property you want to pass
    setAddServices(!addServiceForm);
  };


  const [newBooking, setNewBooking] = useState({
    maPhong: '',
    maKH: '',
    maNV: '',
    soNgayO: '',
    ngayNhanPhong: '',
    ngayTraPhong: '',
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

  };

  const handleSubmit = (e) => {
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
    fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/datphong', {
      method: 'POST',
      mode: 'cors', // Đảm bảo mode là 'cors'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log('Dữ liệu đã được gửi thành công:', data);
        // Gọi hàm callback để thông báo cho component cha
        props.onAddBooking(newBooking); // Pass the new Booking data
        props.onCancel();
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
  
    // Kiểm tra mã phòng là số
    if (!Booking.maPhong || isNaN(Booking.maPhong)) {
      errors.maPhong = "Vui lòng nhập mã phòng là một số.";
    }
  
    // Kiểm tra mã KH là số
    if (!Booking.maKH || isNaN(Booking.maKH)) {
      errors.maKH = "Vui lòng nhập mã KH là một số.";
    }
  
    // Kiểm tra mã NV là số`
    if (!Booking.maNV || isNaN(Booking.maNV)) {
      errors.maNV = "Vui lòng nhập mã NV là một số.";
    }
  
    // Kiểm tra số ngày ở và số ngày trả
    if (
      !Booking.soNgayO || isNaN(Booking.soNgayO)
    ) {
      errors.soNgayO = "Vui lòng nhập số ngày ở đã đăng ký.";
    } else {
      const soNgayO = parseInt(Booking.soNgayO, 10);
      const ngayNhanPhong = new Date(Booking.ngayNhanPhong);
      const ngayTraPhong = new Date(Booking.ngayTraPhong);
    
      // Kiểm tra số ngày ở phải bằng số ngày trả trừ số ngày nhận
      if (soNgayO !== (ngayTraPhong - ngayNhanPhong) / (1000 * 60 * 60 * 24) || ngayNhanPhong >= ngayTraPhong) {
        errors.soNgayO = "Số ngày ở phải bằng số ngày trả phòng trừ cho số ngày nhận phòng.";
      }
    }
  
    return errors;
  };
  

  const handleCancelClick = () => {
    // Gọi hàm callback để thông báo cho component cha
    props.onCancel();
  };



  return (
    <div className='formAddBooking'>
      <div className="overlay">
        <div className="form-container">
        <div>{addServiceForm && <AddServiceForm maSKDP={maSKDP} onCancel={() => setAddServices(!addServiceForm)} />}</div>
          <form className="containerAddBookings" >
            <div className="column-1">
              <label>Mã sự kiện</label><br/>
              <input type="text" id='maSuKien' name="maSuKien" placeholder="Mã sự kiện" disabled  onChange={handleInputChange} /><br /><br />
              <label>Mã nhân viên</label><br/>
              <input type="text" name="maNV" placeholder="Nhập mã nhân viên" value={newBooking.maNV} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.maNV}</div><br />
              <label>Số ngày ở</label><br/>
              <input type="text" name="soNgayO" placeholder="Nhập số ngày ở" value={newBooking.soNgayO} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.soNgayO}</div><br />
              <label>Ngày nhận phòng</label><br/>
              <input type="date" id="ngayNhanPhong" name="ngayNhanPhong" placeholder="Ngày nhận phòng" value={newBooking.ngayNhanPhong} onChange={handleInputChange}/><br />

            </div>
            <div className="column-2">

            <label>Mã phòng</label><br/>

              <input type="text" name="maPhong" placeholder="Nhập mã phòng " value={newBooking.maPhong} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.maPhong}</div><br />
              <label>Mã khách hàng</label><br/>
              <input type="text" name="maKH" placeholder="Nhập mã khách hàng" value={newBooking.maKH} onChange={handleInputChange} /><br /><br />
              {/* <div className='addSurchargesService'>
              <input type="submit" value="Thêm dịch vụ" id="addService-button" onClick={handleAddSurcharge}/>
              <input type="submit" value="Thêm phụ phí" id="submit-button" onClick={handleSendClick}/>
              </div><br/><br/><br/> */}
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

export default AddBookingForm;
