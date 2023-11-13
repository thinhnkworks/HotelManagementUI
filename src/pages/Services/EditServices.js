import React, { useState } from 'react';
import './AddServices.css';

function EditServiceForm(props) {
  const [newService, setNewService] = useState({
    tenDV: props.editData.tenDV,
    gia: props.editData.gia,
    trangThai: props.editData.trangThai,
  });

  const [errors, setErrors] = useState({
    tenDV: '',
    gia: '',
    trangThai: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value,
    });
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        setErrors({
          ...errors,
          [name]: '',
        });
  };
  const handleTrangThaisChange = (e) => {
    const isReady = e.target.value === 'true';
    setNewService({ ...newService, trangThais: isReady });
  };


  const handleSubmit = (e) => {
  
    // Kiểm tra và hiển thị thông báo lỗi
    const validationErrors = validateInput(newService);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }

    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newService };
  console.log(JSON.stringify(dataToSend));
    // Gửi dữ liệu khách hàng mới lên API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/dichvus/${props.editData.maDV}`, {
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


  const validateInput = (surcharge) => {
    const errors = {
      tenDV: '',
      gia: '',
    };
  
    // Kiểm tra tên dịch vụ
    if (!surcharge.tenDV) {
      errors.tenDV = "Vui lòng nhập tên dịch vụ.";
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
    <div className='formService'>
      <div className="overlay">
        <div className="form-container">
          <form className="containerAddServices" onSubmit={handleSubmit}>
              <label>Mã dịch vụ</label><br/>
              <input type="text" id='maDV' name="maDV" placeholder="Mã dịch vụ" disabled  onChange={handleInputChange} /><br /><br />
              <label>Tên dịch vụ</label><br/>
              <input type="text" id="tenDV" name="tenDV" placeholder='Nhập tên dịch vụ' value={newService.tenDV} onChange={handleInputChange}/><br /><br />
              <label>Giá</label><br/>
              <input type="text" name="gia" placeholder="Nhập giá" value={newService.gia} onChange={handleInputChange} /><br /><br />
              <div className="error-message">{errors.gia}</div><br />
              <label for="trangThais">Trạng thái</label><br/>
              <select name="trangThais" id="trangThais" value={newService.trangThais} onChange={handleTrangThaisChange}>
        <option value={true}>Đã sẵn sàng</option>
        <option value={false}>Chưa sẵn sàng</option>
      </select>
              {/* <input type="text" name="trangThai"  placeholder="Nhập trạng thái" value={newService.trangThai} onChange={handleInputChange} /><br /> */}
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

export default EditServiceForm;
