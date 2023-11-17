import React, { useState, useEffect } from 'react';
import './InvoiceDetails.css';
import DeleteClientForm from '../DeleteBookings.js';
import { AiTwotoneDelete } from 'react-icons/ai';


function InvoiceDetails(props) {
  const [dataServices, setDataServices] = useState([]);
  const [dataSurcharges, setDataSurcharges] = useState([]);

  const apiDichVus = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemDichVus';
  const apiSurcharges = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemPhuPhis';

  const fetchDataWithAuthorization = async (api, setData) => {
    const maSKThuePhong = props.maSKDP;
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

  //=============DELETE=================
  const [dataToDelete, setDataToDelete] = useState(null);
  const [deleteDataClick, setDeleteDataClick] = useState(false);
  const [typeToDelete,setTypeToDelete]=useState(null);



  const handleDeleteClick = (data, type) => {
    setDataToDelete(data);
    // Set deleteService based on the provided type
    setDeleteDataClick(type === 'services');
  };
  
  
  const handleCancelDelete = () => {
    setDataToDelete(null);
    setDeleteDataClick(false);
  };
  
  const handleRemoveClick = () => {
    if (dataToDelete) {
      const maSK = dataToDelete.maSK;
      console.log(maSK);
      const apiUrl = typeToDelete ? apiDichVus : apiSurcharges;
      console.log(`${apiUrl}/${maSK}`);
      // Tìm vị trí của phần tử cần xóa trong mảng dataServices hoặc dataSurcharges
      const indexToRemove = deleteDataClick
        ? dataServices.findIndex((service) => service.maSK === maSK)
        : dataSurcharges.findIndex((surcharge) => surcharge.maSK === maSK);
  
      if (indexToRemove !== -1) {
        // Thực hiện yêu cầu DELETE đến API
        fetch(`${apiUrl}/${maSK}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
  
            // Xóa phần tử khỏi mảng dataServices hoặc dataSurcharges sau khi xóa thành công trên API
            const newData = deleteDataClick
              ? [...dataServices]
              : [...dataSurcharges];
  
            newData.splice(indexToRemove, 1);
  
            // Cập nhật danh sách dữ liệu
            deleteDataClick
              ? setDataServices(newData)
              : setDataSurcharges(newData);
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
  
        // Đóng Form Hủy
        handleCancelDelete();
      }
    }
  };
  
  

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchDataWithAuthorization(apiDichVus, setDataServices),
        fetchDataWithAuthorization(apiSurcharges, setDataSurcharges),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelClick = () => {
    props.onCancel();
  };


  return (
    <div>
      <div className="formInvoiceDetails">
        <div className="overlay">
          <div className="form-container">
            <div className="tableServices">
              <label><strong>Danh sách dịch vụ</strong></label>
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
                      <td>{d.thoiGian}</td>
                      <td id='removeData' onClick={() => { handleDeleteClick(d, 'services'); setTypeToDelete(true); }}><AiTwotoneDelete /></td>

            </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tableSurcharges">
              <label><strong>Danh sách phụ phí</strong></label>
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
                      <td>{d.thoiGian}</td>
                      <td id='removeData' onClick={() => { handleDeleteClick(d, 'surcharges'); setTypeToDelete(false); }}><AiTwotoneDelete /></td>


                    </tr>
                  ))}
                </tbody>
              </table>
                        <div>
                        {dataToDelete && (
  <DeleteClientForm
    onCancel={handleCancelDelete}
    onConfirm={handleRemoveClick}
    typeToDelete={typeToDelete}
  />
)}
          </div>
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
