import React, { useState, useEffect } from 'react';
import './InvoiceDetails.css'

function InvoiceDetails(props) {

  const [dataServices, setDataServices] = useState([]);
const [dataSurcharges, setDataSurcharges] = useState([]);

const apiDichVus = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemDichVus';
const apiSurcharges = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemPhuPhis'; // Thay đổi URL của API thứ hai tại đây

const fetchDataWithAuthorization = async (api, setData) => {
  const maSKThuePhong = props.editData.maSKThuePhong;
  try {
    const response = await fetch(`${api}?MaSKDP=${maSKThuePhong}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    setData(data.data);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchData = async () => {
  try {
     await Promise.all([
      fetchDataWithAuthorization(apiDichVus, setDataServices),
      fetchDataWithAuthorization(apiSurcharges, setDataSurcharges),
    ]);
    // Do something with both responses if needed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch data

  useEffect(() => {
    fetchData();
  }, []);

  
  



const handleCancelClick = () => {
  // Gọi hàm callback để thông báo cho component cha
  props.onCancel();
};
  return (
    <div>
      <div className="formInvoiceDetails">
        <div className="overlay">
          <div className="form-container">
            <div className="tableServices">
                <lable><strong>Danh sách dịch vụ</strong></lable>
              <table>
                <thead>
                  <tr>
                    <th>Mã dịch vụ</th>
                    <th>Tên dịch vụ</th>
                    <th>Mã nhân viên</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thời gian đặt dịch vụ</th>
                  </tr>
                </thead>
                <tbody>
                  {dataServices.map((d, i) => (
                    <tr key={i}>
                      <td>{d.maDV}</td>
                      <td>{d.tenDichVu}</td>
                      <td>{d.maNV}</td>
                      <td>{d.soLuong}</td>
                      <td>{d.tongTien}</td>
                      <td>{d.thoiGian }</td>
                    </tr>
                  ))}
                </tbody>
              </table>       
              
            </div>

            <div className="tableSurcharges">
            <lable><strong>Danh sách phụ phí</strong></lable>
            <table>
                <thead>
                  <tr>
                    <th>Mã phụ phí</th>
                    <th>Tên phụ phí</th>
                    <th>Mã nhân viên</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thời gian thêm phụ phí</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSurcharges.map((d, i) => (
                    <tr key={i}>
                      <td>{d.maPP}</td>
                      <td>{d.tenPhuPhi}</td>
                      <td>{d.maNV}</td>
                      <td>{d.soLuong}</td>
                      <td>{d.tongTien}</td>
                      <td>{d.thoiGian }</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="button">
                <input type="submit" value="Thoát" id="cancel-button" onClick={handleCancelClick} />
              </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default InvoiceDetails;
