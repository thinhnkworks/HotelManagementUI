import React from 'react';
import './DeleteClients.css';
import {VscError} from 'react-icons/vsc';
function DeleteClientForm(props) {
  const handleCancelClick = () => {
    // Gọi hàm callback để thông báo cho component cha
    props.onCancel();
  };
  
  const handleConfirmClick = () => {
    props.onConfirm(); // Gọi hàm xác nhận trong component cha
    // Thêm code xử lý tại đây (nếu cần)
  };
  

  return (
    <div className='formDeleteClients'>
      <div className="overlay">
        <div className="form-container">
          <div className='error-icon' ><VscError/></div>
          <label>Nếu bạn muốn xóa hãy nhấn <strong>Xác nhận</strong></label><br /><br />
          <div>
            <button onClick={handleCancelClick}>Hủy</button>
            <button onClick={handleConfirmClick}>Xác Nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteClientForm;
