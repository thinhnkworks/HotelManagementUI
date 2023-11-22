import React, { useState } from "react";
import './Login.css';

function Login(props) {
  const [formData, setFormData] = useState({
    usrname: '',
    psw: '',
    isAdmin: false,
  });
  const [validationErrors, setValidationErrors] = useState({
    usrname: '',
    psw: '',
  });
  

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setFormData({
        ...formData,
        isAdmin: !formData.isAdmin,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Validation
  let error = '';
  if (name === 'usrname' && value.trim() === '') {
    error = 'Mã nhân viên không được trống';
  } else if (name === 'psw' && value.length < 8) {
    error = 'Mật khẩu phải có ít nhất 8 ký tự, có chữ hoa,chữ thường,số và ký tự đặc biệt';
  }

  setValidationErrors({
    ...validationErrors,
    [name]: error,
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/AuthManagement/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          isAdmin: formData.isAdmin,
          cccd: formData.usrname,
          password: formData.psw,
        }),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      const { token } = data;
      console.log(token);
      localStorage.setItem('token', token);

      console.log('Login successful!');
      props.onLogin(formData.isAdmin);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
    }
  };

  return (
    <>
      <div className="containerLogin">
        <form onSubmit={handleSubmit}>
          <div className="loginForm">
            <label><strong>Đăng nhập</strong></label>
            <br/>
            <br/>
          </div>

          <div>
            <label className="textInput" htmlFor="usrname">Tài khoản</label>
            <input type="text" id="usrname" name="usrname" value={formData.usrname} onChange={handleInputChange} />
            {validationErrors.usrname && <div className="error-message">{validationErrors.usrname}</div>}
          </div>

          <div>
            <label className="textInput" htmlFor="psw">Mật khẩu</label>
            <input
              type="password"
              id="psw"
              name="psw"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              value={formData.psw}
              onChange={handleInputChange}
            />
              {validationErrors.psw && <div className="error-message">{validationErrors.psw}</div>}
          </div>
          

          <div className="OptionRole">
            <label htmlFor="otpNhanVien">Nhân viên</label>
            <input
              type="radio"
              id="otpNhanVien"
              name="myRadioGroup"
              value={false}
              checked={!formData.isAdmin}
              onChange={handleInputChange}
            />

            <label htmlFor="otpQuanLy">Quản lý</label>
            <input
              type="radio"
              id="otpQuanLy"
              name="myRadioGroup"
              value={true}
              checked={formData.isAdmin}
              onChange={handleInputChange}
            />
          </div>

          <br/>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          <br/>
          <div className="loginForm"> 
            <input type="submit" value="Đăng nhập" onClick={handleSubmit}/>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
