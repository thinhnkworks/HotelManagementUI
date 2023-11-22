import React, { useState } from 'react';
import './AddPersonnels.css';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
function AddPersonnelsForm(props) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputType, setInputType] = useState('password');

    const handleIconClick = () => {
        setPasswordVisible(!passwordVisible);
        setInputType(passwordVisible ? 'password' : 'text');
      };
  const [newPersonnel, setNewPersonnel] = useState({
    HoTen: '',
    NgaySinh: '',
    GioiTinh: '',
    DiaChi: '',
    Sdt: '',
    Cccd: '',
    quanLy:true,
    matKhau:'',
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
    fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/nhanviens', {
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
        props.onAddPersonnel(newPersonnel); // Pass the new personnel data
        props.onCancel();
        // Có thể thêm xử lý khác sau khi gửi thành công
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
        // Hiển thị thông báo lỗi cho người dùng (hoặc xử lý lỗi theo cách phù hợp với ứng dụng của bạn)
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
        
          if (!personnel.matKhau) {
            errors.matKhau = "Vui lòng nhập mật khẩu.";
          } else {
            // Kiểm tra mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, ký tự đặc biệt và số
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(personnel.matKhau)) {
              errors.matKhau = "Mật khẩu không đáp ứng yêu cầu: ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, ký tự đặc biệt và số.";
            }
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

              <div className='iconEye'>
                    <label>Mật khẩu</label><br />
                        <div className="input-container">
                            <input type={inputType} name="matKhau" placeholder="Nhập mật khẩu" value={newPersonnel.matKhau} onChange={handleInputChange} />
                            {passwordVisible ? (
          <AiOutlineEye className="eye-icon" onClick={handleIconClick} />
        ) : (
          <AiOutlineEyeInvisible className="eye-icon" onClick={handleIconClick} />
        )}
                        </div>
                </div>
              <div className="error-message">{errors.matKhau}</div><br /><br />
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

export default AddPersonnelsForm;
