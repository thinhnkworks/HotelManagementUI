import React, { useState } from 'react';
import './AddRoom.css';

function AddRoomForm(props) {
  const [newRoom, setNewRoom] = useState({
    maLoaiPhong: 1,
    trangThai: 0,
  });

  const [errors, setErrors] = useState({
    maLoaiPhong: '',
    trangThai: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({
      ...newRoom,
      [name]: value,
    });
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        setErrors({
          ...errors,
          [name]: '',
        });
  };
  const handleTrangThaisChange = (e) => {
    const trangThaisValue = parseInt(e.target.value); // Chuyển giá trị sang số nguyên
    setNewRoom({ ...newRoom, trangThai: trangThaisValue });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Kiểm tra và hiển thị thông báo lỗi
    const validationErrors = validateInput(newRoom);
    setErrors(validationErrors);
  
    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }
  
    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newRoom };
  
    fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/phongs', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Dữ liệu đã được gửi thành công:', data);
  
        // Update the state with the data returned from the API
        setNewRoom(data); // Assuming the API response contains the updated room data
  
        // Gọi hàm callback để thông báo cho component cha
        props.onAddRoom(data);
        props.onCancel();
        // Có thể thêm xử lý khác sau khi gửi thành công
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
      });
  };
    
  


  const validateInput = (listRooms) => {
    const errors = {
      maLoaiPhong: ''
    };
  
    // Kiểm tra mã phòng
    if (!listRooms.maLoaiPhong) {
      errors.maLoaiPhong = "Mã loại phòng được đánh bằng số.";
    }
  
    return errors;
  };
  
    const handleSendClick = (e) => {
      e.preventDefault(); // Ngăn chặn mặc định của biểu mẫu
    handleSubmit(e); // Truyền sự kiện vào hàm handleSubmit

  };

  const handleCancelClick = () => {
    // Gọi hàm callback để thông báo cho component cha
    props.onCancel();
  };



  return (
    <div className='formService'>
      <div className="overlay">
        <div className="form-container">
          <form className="containerAddServices" onSubmit={handleSubmit}>
              <label>Mã phòng</label><br/>
              <input type="text" id='maPhong' name="maPhong" placeholder="Mã phòng" disabled  onChange={handleInputChange} /><br /><br />
              <label>Mã loại phòng</label><br/>
              <input type="text" id="maLoaiPhong" name="maLoaiPhong" placeholder='Nhập mã loại phòng' value={newRoom.maLoaiPhong} onChange={handleInputChange}/><br /><br />
              
              <label for="trangThai">Trạng thái</label><br/>
              <select name="trangThai" id="trangThai" value={newRoom.trangThai} onChange={handleTrangThaisChange}>
        <option value={1}>Đã thuê</option>
        <option value={0}>Còn trống</option>
      </select>
              {/* <input type="text" name="trangThai"  placeholder="Nhập trạng thái" value={newRoom.trangThai} onChange={handleInputChange} /><br /> */}
              <div className="error-message">{errors.trangThai}</div><br /><br />
              <div className="button ">
              <input type="submit" value="Hủy" id="cancel-button" onClick={handleCancelClick} />
              <input type="submit" value="Xác nhận" id="submit-button" onClick={handleSendClick}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRoomForm;
