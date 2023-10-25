import React, { useState } from 'react';
import './EditClients.css';
function EditClientsForm(props) {
  const [newClient, setNewClient] = useState({
    hoTen: props.editData.hoTen , // Make sure to handle null or undefined values
    ngaySinh: props.editData.ngaySinh ,
    gioiTinh: props.editData.gioiTinh ,
    diaChi: props.editData.diaChi ,
    sdt: props.editData.sdt ,
    cccd: props.editData.cccd ,
  });
  
  const [errors, setErrors] = useState({
    hoTen: '',
    ngaySinh: '',
    gioiTinh: '',
    diaChi: '',
    sdt: '',
    cccd: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: value,
    });
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        setErrors({
          ...errors,
          [name]: '',
        });
  };

  

  const handleSubmit = (e) => {
  const maKH=props.editData.maKH.toString();
    // Kiểm tra và hiển thị thông báo lỗi
    const validationErrors = validateInput(newClient);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }

    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newClient };
  console.log(JSON.stringify(dataToSend));
    // Gửi dữ liệu khách hàng mới lên API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/khachhangs/${maKH}`, {
  method: 'PATCH',
  mode: 'cors',
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
})
.catch((error) => {
  console.error('Lỗi khi gửi dữ liệu:', error);
  // Xử lý lỗi khi gửi yêu cầu
});



  };


  const validateInput = (client) => {
    const errors = {
      hoTen: '',
      ngaySinh: '',
      gioiTinh: '',
      diaChi: '',
      sdt: '',
      cccd: '',
    };


        // Thực hiện kiểm tra các trường dữ liệu ở đây
        if (!client.hoTen) {
          errors.hoTen = "Vui lòng nhập họ tên.";
        }
        if (!client.ngaySinh.match(/^\d{4}-\d{2}-\d{2}$/)) {
          errors.ngaySinh = "Ngày sinh không hợp lệ. Định dạng phải là YYYY-MM-DD.";
        }
      
        if (client.gioiTinh !== 'nam' && client.gioiTinh !== 'nữ') {
          errors.gioiTinh = "Giới tính không hợp lệ. Chỉ nhận 'nam' hoặc 'nữ'.";
        }
      
        if (client.sdt && !client.sdt.match(/^\d{10}$/)) {
          errors.sdt = "Số điện thoại không hợp lệ. Phải có đúng 10 chữ số.";
        }
      
        if (client.cccd && !client.cccd.match(/^\d{12}$/)) {
          errors.cccd = "CCCD không hợp lệ. Phải có đúng 12 chữ số.";
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
    <div className='formEditClient'>
      <div className="overlay">
        <div className="form-container">
          <form className="containerEditClients" onSubmit={handleSubmit}>
            <div className="column-1">
              <label>Mã khách hàng</label><br/>
              <input type="text" id='maKhachHang' name="maKhachHang" placeholder="Mã Khách Hàng" disabled  onChange={handleInputChange} /><br /><br />
              <label>Số lần nghỉ</label><br/>
              <input type="text" id="soLanNghi" name="soLanNghi" placeholder='Nhập số lần nghỉ'value={newClient.soLanNghi}  disabled onChange={handleInputChange}/><br /><br />
              <label>Ngày sinh</label><br/>
              <input type="text" name="ngaySinh" placeholder="Nhập ngày sinh" value={newClient.ngaySinh} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.ngaySinh}</div><br />
              <label>Giới tính</label><br/>
              <input type="text" name="gioiTinh" placeholder="Nhập giới tính" value={newClient.gioiTinh} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.gioiTinh}</div><br />
              <label>Xếp hạng</label><br/>
              <input type="text" id="xepHang" name="xepHang" placeholder="Xếp hạng" value={newClient.xepHang} disabled onChange={handleInputChange}/><br /><br />
            </div>
            <div className="column-2">
            <label>Họ và tên</label><br/>
              <input type="text" name="hoTen" placeholder="Nhập họ và tên" value={newClient.hoTen} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.hoTen}</div><br />
              <label>Địa chỉ</label><br/>
              <input type="text" name="diaChi" placeholder="Nhập địa chỉ" value={newClient.diaChi} onChange={handleInputChange} /><br /><br />
              <label>Số điện thoại</label><br/>
              <input type="text" name="sdt" placeholder="Nhập số điện thoại" value={newClient.sdt} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.sdt}</div><br />
              <label>Số CCCD</label><br/>
              <input type="text" name="cccd" placeholder="Nhập số CCCD" value={newClient.cccd} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.cccd}</div><br /><br />
              <div className="button ">
              <input type="submit" value="Hủy" id="cancel-button" onClick={handleCancelClick} />
              <input type="submit" value="Xác nhận" id="submit-button" onClick={handleSendClick} />
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditClientsForm;
