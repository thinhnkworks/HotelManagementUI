import React, { useState } from 'react';
import './AddSurCharges.css';
function AddSurChargeForm(props) {
  const [newSurcharge, setNewSurcharge] = useState({
    tenPP: '',
    gia: '',
  });

  const [errors, setErrors] = useState({
    tenPP: '',
    gia: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSurcharge({
      ...newSurcharge,
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
    const validationErrors = validateInput(newSurcharge);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }

    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newSurcharge };
  console.log(JSON.stringify(dataToSend));
    // Gửi dữ liệu khách hàng mới lên API
    fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/phuphis', {
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
        props.onAddSurcharge(newSurcharge); // Pass the new surcharge data
        props.onCancel();
        // Có thể thêm xử lý khác sau khi gửi thành công
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
        // Hiển thị thông báo lỗi cho người dùng (hoặc xử lý lỗi theo cách phù hợp với ứng dụng của bạn)
      });
  };


  const validateInput = (surcharge) => {
    const errors = {
      tenPP: '',
      gia: '',
    };
  
    // Kiểm tra tên phụ phí
    if (!surcharge.tenPP) {
      errors.tenPP = "Vui lòng nhập tên phụ phí.";
    }
  
    // Kiểm tra giá
    if (surcharge.gia === undefined || surcharge.gia === null) {
      errors.gia = "Vui lòng nhập giá.";
    } else if (!/^\d+(\.\d+)?$/.test(surcharge.gia) || parseFloat(surcharge.gia) <= 0) {
      errors.gia = "Giá phải là một số lớn hơn 0.";
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
    <div className='formSurcharge'>
      <div className="overlay">
        <div className="form-container">
          <form className="containerAddSurcharges" onSubmit={handleSubmit}>
              <label>Mã phụ phí</label><br/>
              <input type="text" id='maPP' name="maPP" placeholder="Mã phụ phí" disabled  onChange={handleInputChange} /><br /><br />
              <label>Tên phụ phí</label><br/>
              <input type="text" id="tenPP" name="tenPP" placeholder='Nhập tên phụ phí'value={newSurcharge.tenPP} onChange={handleInputChange}/><br /><br />
              <label>Giá</label><br/>
              <input type="Giá" name="gia" placeholder="Nhập giá" value={newSurcharge.gia} onChange={handleInputChange} /><br />
              <div className="error-message">{errors.gia}</div><br /><br />
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

export default AddSurChargeForm;
