import React, { useState } from 'react';
import './EditRoom.css';

function EditRoomForm(props) {
  const [newRoom, setNewRoom] = useState({
    maLoaiPhong: props.editData.maLoaiPhong,
    trangThai: props.editData.trangThai, // Thêm trạng thái vào state
  });
  
  const [errors, setErrors] = useState({
    maLoaiPhong: '',
    trangThai: '', // Thêm trạng thái vào errors
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
  
    // Kiểm tra và hiển thị thông báo lỗi
    const validationErrors = validateInput(newRoom);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }

    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newRoom };
  console.log(JSON.stringify(dataToSend));
    // Gửi dữ liệu khách hàng mới lên API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/phongs/${props.editData.maPhong}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
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
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
        // Xử lý lỗi khi gửi yêu cầu
      });

    };


    const validateInput = (listRooms) => {
      const errors = {
        maLoaiPhong: '',
        trangThai: '', // Thêm trạng thái vào errors
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

export default EditRoomForm;
