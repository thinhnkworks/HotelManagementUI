import React, { useState } from 'react';
import './AddPersonnels.css';

function EditPersonnelsForm(props) {

    const apiNhanViens="https://service-hotelmanagement-dev.azurewebsites.net/api/nhanviens";
  const [newPersonnel, setNewPersonnel] = useState({
    HoTen: props.editData.hoTen , // Make sure to handle null or undefined values
    NgaySinh: props.editData.ngaySinh ,
    GioiTinh: props.editData.gioiTinh ,
    DiaChi: props.editData.diaChi ,
    Sdt: props.editData.sdt ,
    Cccd: props.editData.cccd ,
    QuanLy:true,
  });   

  const [errors, setErrors] = useState({
    HoTen: '',
    NgaySinh: '',
    GioiTinh: '',
    DiaChi: '',
    Sdt: '',
    Cccd: '',
    quanLy:'',
    matKhau:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPersonnel({
      ...newPersonnel,
      [name]: value,
    });
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        setErrors({
          ...errors,
          [name]: '',
        });
  };


  const handleSubmit = (e) => {
    const maNV=props.editData.maNV.toString();
    // Kiểm tra và hiển thị thông báo lỗi
    const validationErrors = validateInput(newPersonnel);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }

    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newPersonnel };
  console.log(JSON.stringify(dataToSend));
    // Gửi dữ liệu khách hàng mới lên API
    fetch(`${apiNhanViens}/${maNV}`, {
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


  const validateInput = (personnel) => {
    const errors = {
      HoTen: '',
      NgaySinh: '',
      GioiTinh: '',
      DiaChi: '',
      Sdt: '',
      Cccd: '',
      quanLy:'',
      matKhau:'',
    };


        // Thực hiện kiểm tra các trường dữ liệu ở đây
        if (!personnel.HoTen) {
          errors.HoTen = "Vui lòng nhập họ tên.";
        }
        if (!personnel.NgaySinh.match(/^\d{4}-\d{2}-\d{2}$/)) {
          errors.NgaySinh = "Ngày sinh không hợp lệ. Định dạng phải là YYYY-MM-DD.";
        }
      
        if (personnel.GioiTinh !== 'nam' && personnel.GioiTinh !== 'nữ') {
          errors.GioiTinh = "Giới tính không hợp lệ. Chỉ nhận 'nam' hoặc 'nữ'.";
        }
      
        if (personnel.Sdt && !personnel.Sdt.match(/^\d{10}$/)) {
          errors.Sdt = "Số điện thoại không hợp lệ. Phải có đúng 10 chữ số.";
        }
      
        if (personnel.Cccd && !personnel.Cccd.match(/^\d{12}$/)) {
          errors.Cccd = "CCCD không hợp lệ. Phải có đúng 12 chữ số.";
        }
        if (typeof personnel.quanLy !== "boolean") {
            errors.quanLy = "Trường quanLy phải là kiểu boolean (true hoặc false).";
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
  const handleTrangThaisChange = (e) => {
    const isReady = e.target.value === 'true';
    setNewPersonnel({ ...newPersonnel, quanLy: isReady });
  };


  return (
    <div className='formAddPersonnel'>
      <div className="overlay">
        <div className="form-container">
          <form className="containerAddPersonnels" onSubmit={handleSubmit}>
            <div className="column-1">
              <label>Mã nhân viên</label><br/>
              <input type="text" id='maNhanVien' name="maNhanVien" placeholder="Nhân viên" disabled  onChange={handleInputChange} /><br /><br />
              <label>Ngày sinh</label><br/>
              <input type="text" name="NgaySinh" placeholder="Nhập ngày sinh" value={newPersonnel.NgaySinh} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.NgaySinh}</div><br />
              <label>Giới tính</label><br/>
              <input type="text" name="GioiTinh" placeholder="Nhập giới tính" value={newPersonnel.GioiTinh} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.GioiTinh}</div><br />
              <label>Số điện thoại</label><br/>
              <input type="text" name="Sdt" placeholder="Nhập số điện thoại" value={newPersonnel.Sdt} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.Sdt}</div><br />
              <label for="quanLy">Chức vụ</label><br/>
              <select name="quanLy" id="quanLy" value={newPersonnel.quanLy} onChange={handleTrangThaisChange}>
        <option value={true}>Quản lý</option>
        <option value={false}>Nhân viên</option>
      </select>
            </div>
            <div className="column-2">
            <label>Họ và tên</label><br/>
              <input type="text" name="HoTen" placeholder="Nhập họ và tên" value={newPersonnel.HoTen} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.HoTen}</div><br />
              <label>Địa chỉ</label><br/>
              <input type="text" name="DiaChi" placeholder="Nhập địa chỉ" value={newPersonnel.DiaChi} onChange={handleInputChange} /><br /><br />

              <label>Số CCCD</label><br/>
              <input type="text" name="Cccd" placeholder="Nhập số CCCD" value={newPersonnel.Cccd} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.Cccd}</div><br />
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

export default EditPersonnelsForm;
