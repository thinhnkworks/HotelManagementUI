import React, { useState, useEffect } from 'react';
import './InvoiceDetails.css';
import DeleteClientForm from '../Clients/DeleteClients.js';
import { AiTwotoneDelete } from 'react-icons/ai';

function InvoiceDetails(props) {
  const [dataServices, setDataServices] = useState([]);
  const [dataSurcharges, setDataSurcharges] = useState([]);

  const apiDichVus = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemDichVus';
  const apiSurcharges = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemPhuPhis';

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

  //=============DELETE=================
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [deleteService, setDeleteServices] = useState(false);

  const ShowDeleteService = () => setDeleteServices(!deleteService);

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    ShowDeleteService(true);
  };

  const handleCancelDelete = () => {
    ShowDeleteService(false);
  };

  const handleRemoveClick = (type) => {
    if (serviceToDelete) {
      const maSK = serviceToDelete.maSK;
      const apiUrl = type === 'services' ? apiDichVus : apiSurcharges;
      
      const data = type === 'services' ? dataServices : dataSurcharges;
      const setData = type === 'services' ? setDataServices : setDataSurcharges;

      const indexToRemove = data.findIndex((item) => item.maSK === maSK);

      if (indexToRemove !== -1) {
        fetch(`${apiUrl}/${maSK}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }

            const newData = [...data];
            newData.splice(indexToRemove, 1);

            setData(newData);
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });

        ShowDeleteService(false);
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
                      <td id='removeData' onClick={() => handleDeleteClick(d)}><AiTwotoneDelete /></td>
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
                      <td id='removeData' onClick={() => handleDeleteClick(d)}><AiTwotoneDelete /></td>
                      <div>
                        {deleteService && (
                          <DeleteClientForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick('surcharges')} serviceToDelete={serviceToDelete} />
                        )}
                      </div>
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
