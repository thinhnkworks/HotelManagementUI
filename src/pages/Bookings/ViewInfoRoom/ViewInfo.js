import React, { useState, useEffect } from 'react';
import './ViewInfo.css';

function ViewInfoForm(props) {
  const [newInfo, setNewInfo] = useState({
    maKH: props.maKH,
    hoTen: '',
    soLanNghi: '',
    ngaySinh: '',
    gioiTinh: '',
    diaChi: '',
    sdt: '',
    cccd: '',
    xepHang: true,

    maPhong: props.maPhong,
    tenPhong: '',
    soNguoiO: '',
    gia: '',

    maSKDP: props.maSKDP,
  });

  const handleLoadDataInfoClient = async () => {
    try {
      const response = await fetch(
        `https://service-hotelmanagement-dev.azurewebsites.net/api/KhachHangs/${props.maKH}`,
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
        maKH: data.data.maKH,
        hoTen: data.data.hoTen,
        soLanNghi: data.data.soLanNghi,
        ngaySinh: data.data.ngaySinh,
        gioiTinh: data.data.gioiTinh,
        diaChi: data.data.diaChi,
        sdt: data.data.sdt,
        cccd: data.data.cccd,
        xepHang: data.data.xepHang,
      }));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLoadDataInfoRoom = async () => {
    try {
      const response = await fetch(
        `https://service-hotelmanagement-dev.azurewebsites.net/api/Phongs/${props.maPhong}`,
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
      console.log(data.maPhong)
      // Update state with the data received from the API
      setNewInfo((prevInfo) => ({
        ...prevInfo,
        maPhong: data.data.maPhong,
        tenPhong: data.data.loaiPhong.tenLoaiPhong,
        soNguoiO: data.data.loaiPhong.soNguoiO,
        gia: data.data.loaiPhong.gia,
      }));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Load client data when the component mounts
    handleLoadDataInfoClient();

    handleLoadDataInfoRoom();
  }, );

  const handleCancelClick = () => {
    // Gọi hàm callback để thông báo cho component cha
    props.onCancel();
  };

  return (
    <div>
      <div className="formViewInfo">
        <div className="overlay">
          <div className="form-container">
            <form className="containerEditSurcharges">
              <div className="infoClient">
                <div className="column-1">
                  <label><strong>Khách Hàng</strong></label><br /><br /><br />
                  <label>Mã khách hàng</label><br />
                  <input type="text" id='maKH' name="maKH" disabled value={newInfo.maKH} /><br />
                  <label>Họ tên</label><br />
                  <input type="text" name="hoTen" disabled value={newInfo.hoTen} /><br />
                  <label>Số ngày nghỉ</label><br />
                  <input type="text" name="soNgayNghi" disabled value={newInfo.soLanNghi} /><br />
                  <label>Ngày sinh</label><br />
                  <input type="text" name="ngaySinh" disabled value={new Date(newInfo.ngaySinh).toLocaleDateString()} /><br />
                  <label>Giới tính</label><br />
                  <input type="text" name="gioiTinh" disabled value={newInfo.gioiTinh} /><br />
                </div>
                <div className="column-2">
                <br /><br /><br />
                  <label>Địa chỉ</label><br />
                  <input type="text" name="diaChi" disabled value={newInfo.diaChi} /><br />
                  <label>Số điện thoại</label><br />
                  <input type="text" name="sdt"disabled  value={newInfo.sdt} /><br />
                  <label>CCCD</label><br />
                  <input type="text" name="cccd" disabled value={newInfo.cccd} /><br />
                  <label>Xếp hạng</label><br />
                  <input type="text" name="xepHang" disabled value={newInfo.xepHang ? 'Có' : 'Không'} /><br />
                </div>
              </div>
              <div className="infoRoom">
                <label><strong>Phòng </strong></label><br /><br /><br />
                <label>Mã phòng</label><br />
                <input type="text" id='maPhong' name="maPhong" disabled value={newInfo.maPhong} /><br />
                <label>Tên phòng</label><br />
                <input type="text" name="tenPhong" disabled value={newInfo.tenPhong} /><br />
                <label>Số người ở</label><br />
                <input type="text" name="soNguoiO" disabled value={newInfo.soNguoiO} /><br />
                <label>Giá</label><br />
                <input type="text" name="gia" disabled value={newInfo.gia} /><br />
                <input type="submit" value="Thoát" id="cancel-button" onClick={handleCancelClick} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  }  

export default ViewInfoForm;
