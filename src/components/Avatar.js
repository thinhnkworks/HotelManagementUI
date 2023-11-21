import React, { useState, useEffect } from 'react';

function Avatar(props) {
  const [newInfo, setNewInfo] = useState({
    maNV: '',
    hoTen: '',
    ngaySinh: '',
    gioiTinh: '',
    diaChi: '',
    sdt: '',
    cccd: '',
    quanLy: true,

  });

  const handleLoadDataInfoClient = async () => {
    try {
      const response = await fetch(
        `https://service-hotelmanagement-dev.azurewebsites.net/api/AuthManagement/my`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      // Update state with the data received from the API
      setNewInfo((prevInfo) => ({
        ...prevInfo,
        maNV: data.data.maNV,
        hoTen: data.data.hoTen,
        ngaySinh: data.data.ngaySinh,
        gioiTinh: data.data.gioiTinh,
        diaChi: data.data.diaChi,
        sdt: data.data.sdt,
        cccd: data.data.cccd,
        quanLy: data.data.quanLy,
      }));

    } catch (error) {
      console.error('Error:', error);
    }
  };



  useEffect(() => {
    const loadData = async () => {
        await handleLoadDataInfoClient();
      };
  
      // Load client data when the component mounts
      loadData();
  
      // Cleanup function
      return () => {
        // Perform cleanup if needed
      };

  },[]);

  const handleCancelClick = () => {
    // Gọi hàm callback để thông báo cho component cha
    props.onCancel();
  };
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    // Gọi hàm callback để thông báo cho component cha
    props.onLogout();
  };

  return (
    <div>
      <div className="formViewInfo">
        <div className="overlay">
          <div className="form-container">
            <form className="containerEditSurcharges">
              <div className="infoClient">
                <div className="column-1">
                  <label><strong>Nhân viên</strong></label><br /><br /><br />
                  <label>Mã nhân viên </label><br />
                  <input type="text" id='maNV' name="maNV" disabled value={newInfo.maNV} /><br />
                  <label>Họ tên</label><br />
                  <input type="text" name="hoTen" disabled value={newInfo.hoTen} /><br />
                  <label>Ngày sinh</label><br />
                  <input type="text" name="ngaySinh" disabled value={new Date(newInfo.ngaySinh).toLocaleDateString()} /><br />
                  <label>Giới tính</label><br />
                  <input type="text" name="gioiTinh" disabled value={newInfo.gioiTinh} /><br />
                  <input type="submit" value="Đăng xuất" id="cancel-button" onClick={handleLogout} />
                </div>
                <div className="column-2">
                <br /><br /><br />
                  <label>Địa chỉ</label><br />
                  <input type="text" name="diaChi" disabled value={newInfo.diaChi} /><br />
                  <label>Số điện thoại</label><br />
                  <input type="text" name="sdt"disabled  value={newInfo.sdt} /><br />
                  <label>CCCD</label><br />
                  <input type="text" name="cccd" disabled value={newInfo.cccd} /><br />
                  <label>Chức vụ</label><br />
                  <input type="text" name="quanLy" disabled value={newInfo.quanLy ? 'Quản lý' : 'Nhân viên'} /><br />
                  <input type="submit" value="Thoát" id="cancel-button" onClick={handleCancelClick} />

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  }  

export default Avatar;
