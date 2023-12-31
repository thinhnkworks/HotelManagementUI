import React, { useState } from 'react';
import './AddClients.css';
function AddClientsForm(props) {
  const [newClient, setNewClient] = useState({
    HoTen: '',
    NgaySinh: '',
    GioiTinh: '',
    DiaChi: '',
    Sdt: '',
    Cccd: '',
  });

  const [errors, setErrors] = useState({
    HoTen: '',
    NgaySinh: '',
    GioiTinh: '',
    DiaChi: '',
    Sdt: '',
    Cccd: '',
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
    fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/khachhangs', {
      method: 'POST',
      mode: 'cors', // Đảm bảo mode là 'cors'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataToSend),
      
    })
    
      .then((response) => {
        if (!response.ok) {
          alert("Số điện thoại hoặc CCCD của bạn đã tồn tại .");
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log('Dữ liệu đã được gửi thành công:', data);
        // Gọi hàm callback để thông báo cho component cha
        props.onAddClient(newClient); // Pass the new client data
        props.onCancel();
        // Có thể thêm xử lý khác sau khi gửi thành công
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
        // Hiển thị thông báo lỗi cho người dùng (hoặc xử lý lỗi theo cách phù hợp với ứng dụng của bạn)
      });
  };


  const validateInput = (client) => {
    const errors = {
      HoTen: '',
      NgaySinh: '',
      GioiTinh: '',
      DiaChi: '',
      Sdt: '',
      Cccd: '',
    };


        // Thực hiện kiểm tra các trường dữ liệu ở đây
        if (!client.HoTen) {
          errors.HoTen = "Vui lòng nhập họ tên.";
        }
        if (!client.NgaySinh.match(/^\d{4}-\d{2}-\d{2}$/)) {
          errors.NgaySinh = "Ngày sinh không hợp lệ. Định dạng phải là YYYY-MM-DD.";
        }
      
        if (client.GioiTinh !== 'nam' && client.GioiTinh !== 'nữ') {
          errors.GioiTinh = "Giới tính không hợp lệ. Chỉ nhận 'nam' hoặc 'nữ'.";
        }
      
        if (client.Sdt && !client.Sdt.match(/^\d{10}$/)) {
          errors.Sdt = "Số điện thoại không hợp lệ. Phải có đúng 10 chữ số.";
        }
      
        if (client.Cccd && !client.Cccd.match(/^\d{12}$/)) {
          errors.Cccd = "CCCD không hợp lệ. Phải có đúng 12 chữ số.";
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
    <div className='formAddClient'>
      <div className="overlay">
        <div className="form-container">
          <form className="containerAddClients" onSubmit={handleSubmit}>
            <div className="column-1">
              <label>Mã khách hàng</label><br/>
              <input type="text" id='maKhachHang' name="maKhachHang" placeholder="Mã Khách Hàng" disabled  onChange={handleInputChange} /><br /><br />
              <label>Số lần nghỉ</label><br/>
              <input type="text" id="soLanNghi" name="soLanNghi" placeholder='Nhập số lần nghỉ'value={newClient.soLanNghi}  disabled onChange={handleInputChange}/><br /><br />
              <label>Ngày sinh</label><br/>
              <input type="text" name="NgaySinh" placeholder="Nhập ngày sinh" value={newClient.NgaySinh} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.NgaySinh}</div><br />
              <label>Giới tính</label><br/>
              <input type="text" name="GioiTinh" placeholder="Nhập giới tính" value={newClient.GioiTinh} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.GioiTinh}</div><br />
              <label>Xếp hạng</label><br/>
              <input type="text" id="xepHang" name="xepHang" placeholder="Xếp hạng" value={newClient.xepHang} disabled onChange={handleInputChange}/><br /><br />
            </div>
            <div className="column-2">
            <label>Họ và tên</label><br/>
              <input type="text" name="HoTen" placeholder="Nhập họ và tên" value={newClient.HoTen} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.HoTen}</div><br />
              <label>Địa chỉ</label><br/>
              <input type="text" name="DiaChi" placeholder="Nhập địa chỉ" value={newClient.DiaChi} onChange={handleInputChange} /><br /><br />
              <label>Số điện thoại</label><br/>
              <input type="text" name="Sdt" placeholder="Nhập số điện thoại" value={newClient.Sdt} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.Sdt}</div><br />
              <label>Số CCCD</label><br/>
              <input type="text" name="Cccd" placeholder="Nhập số CCCD" value={newClient.Cccd} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.Cccd}</div><br /><br />
              <div className="button ">
              <input type="submit" value="Hủy" id="cancel-button" onClick={handleCancelClick} />
              <input type="submit" value="Xác nhận" id="submit-button" onClick={handleSendClick}/>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClientsForm;
