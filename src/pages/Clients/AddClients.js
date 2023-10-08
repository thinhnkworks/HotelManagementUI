import React from 'react';
import './AddClients.css'

function AddClientsForm(props) {
  const handleCancelClick = () => {
    // Gọi hàm callback để thông báo cho component cha
    props.onCancel();
  };

  return (
    (
      <div className="overlay">
        <div className="form-container">
          <form className="containerAddClients">
            <div className='column-1'> 
              <label>Mã khách hàng</label><br/>
              <input type="text" id="maKhachHang" name="maKhachHang" readOnly={true} disabled={true}/><br /><br />
              <label>Số lần nghỉ</label><br/>
              <input type="text" id="soLanNghi" name="soLanNghi" placeholder='Nhập số lần nghỉ'/><br /><br />
              <label>Giới tính</label><br/>
              <input type="text" id="gioiTinh" name="gioiTinh" placeholder='Nhập giới tính'/><br /><br />
              <label>Số điện thoại</label><br/>
              <input type="text" id="soDienThoai" name="soDienThoai" placeholder='Nhập số điện thoại' /><br /><br />
              <label>Xếp hạng</label><br/>
              <input type="text" id="xepHang" name="xepHang" readOnly={true} disabled={true}/><br /><br />
            </div>
            <div className='column-2'>
              <label>Họ và tên</label><br/>
              <input type="text" id="hoTen" name="hoTen" placeholder='Nhập họ và tên'/><br /><br />
              <label>Ngày sinh</label><br/>
              <input type="text" id="ngaySinh" name="ngaySinh" placeholder='Nhập ngày sinh'/><br /><br />
              <label>Địa chỉ</label><br/>
              <input type="text" id="diaChi" name="diaChi" placeholder='Nhập địa chỉ'/><br /><br />
              <label>CCCD</label><br/>
              <input type="text" id="cccd" name="cccd" placeholder='Nhập số CCCD' /><br /><br /><br />
              
              <div className='button'>
              <input type="submit" value="Hủy" id ="cancel-button" onClick={handleCancelClick}/>
              <input type="submit" value="Gửi" id="submit-button" />
            </div>


            </div>
          </form>

        </div>
      </div>


    )
  );
}

export default AddClientsForm;

// import React, { useState } from 'react';
// import './AddClients.css';

// function AddClientsForm(props) {
//   const [formData, setFormData] = useState({
//     maKhachHang: '',
//     soLanNghi: '',
//     gioiTinh: '',
//     soDienThoai: '',
//     xepHang: '',
//     hoTen: '',
//     ngaySinh: '',
//     diaChi: '',
//     cccd: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Lấy giá trị từ formData
//     const newClientData = { ...formData };
    
//     // Thêm dữ liệu mới vào JSON
//     // Đây chỉ là ví dụ đơn giản, bạn cần thay đổi phần này để phù hợp với cách bạn quản lý tệp JSON.
//     fetch('url_api_luu_du_lieu', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newClientData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Dữ liệu đã được gửi thành công:', data);
//         // Gọi hàm callback để thông báo cho component cha
//         props.onCancel();
//       })
//       .catch((error) => {
//         console.error('Lỗi khi gửi dữ liệu:', error);
//       });
//   };

//   const handleCancelClick = () => {
//     // Gọi hàm callback để thông báo cho component cha
//     props.onCancel();
//   };

//   return (
//     <div className="overlay">
//       <div className="form-container">
//         <form className="containerAddClients" onSubmit={handleSubmit}>
//         <div className='column-1'> 
//               <label>Mã khách hàng</label><br/>
//               <input type="text" id="maKhachHang" name="maKhachHang" readOnly={true} disabled={true}/><br /><br />
//               <label>Số lần nghỉ</label><br/>
//               <input type="text" id="soLanNghi" name="soLanNghi" placeholder='Nhập số lần nghỉ'/><br /><br />
//               <label>Giới tính</label><br/>
//               <input type="text" id="gioiTinh" name="gioiTinh" placeholder='Nhập giới tính'/><br /><br />
//               <label>Số điện thoại</label><br/>
//               <input type="text" id="soDienThoai" name="soDienThoai" placeholder='Nhập số điện thoại' /><br /><br />
//               <label>Xếp hạng</label><br/>
//               <input type="text" id="xepHang" name="xepHang" readOnly={true} disabled={true}/><br /><br />
//             </div>
//             <div className='column-2'>
//               <label>Họ và tên</label><br/>
//               <input type="text" id="hoTen" name="hoTen" placeholder='Nhập họ và tên'/><br /><br />
//               <label>Ngày sinh</label><br/>
//               <input type="text" id="ngaySinh" name="ngaySinh" placeholder='Nhập ngày sinh'/><br /><br />
//               <label>Địa chỉ</label><br/>
//               <input type="text" id="diaChi" name="diaChi" placeholder='Nhập địa chỉ'/><br /><br />
//               <label>CCCD</label><br/>
//               <input type="text" id="cccd" name="cccd" placeholder='Nhập số CCCD' /><br /><br /><br />
//               </div>
//           <div className='button'>
//             <input type="submit" value="Hủy" id="cancel-button" onClick={handleCancelClick} />
//             <input type="submit" value="Gửi" id="submit-button" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddClientsForm;

