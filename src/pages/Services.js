import React, { useState, useEffect } from 'react';
import './css/Surcharges.css';
import AddServiceForm from './Services/AddServices.js';
import DeleteServicesForm from './Services/DeleteServices.js';
import EditServicesForm from './Services/EditServices.js';
import { FiFilter } from 'react-icons/fi';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function Service() {
  const [dataServices, setDataServices] = useState([]);
  const apiDichVus="https://service-hotelmanagement-dev.azurewebsites.net/api/dichvus";

  // Function to add a new service
  const addService = (newService) => {
    // Add the new service to the dataServices state
    setDataServices((prevData) => [...prevData, newService]);
  };


  //*******************------------------ */ [] để đảm bảo sẽ chạy chỉ một lần sau khi nạp trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataServices.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataServices.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const changeCpage = (id) => {
    setCurrentPage(id);
  }

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // ******************-------------------------------Form AddClient
const [addServicesForm, setAddServices] = useState(false);
const ShowAddServices = () => setAddServices(!addServicesForm);

  
//**********************----------------------Form DeleteClient
const [serviceToDelete, setServiceToDelete] = useState(null);

const [deleteServices, setDeleteServices] = useState(false);
const ShowDeleteService = () => setDeleteServices(!deleteServices);


  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
  ShowDeleteService(true);
  };
  const handleCancelDelete = () => {
    ShowDeleteService(false);
  };

const handleRemoveClick = () => {
  if (serviceToDelete) {
    const maDV = serviceToDelete.maDV;
    // Tìm vị trí của phần tử cần xóa trong mảng dataServices
  const indexToRemove = dataServices.findIndex((service) => service.maDV === maDV);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`${apiDichVus}/${maDV}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Xóa phần tử khỏi mảng dataServices sau khi xóa thành công trên API
        const newDataServices = [...dataServices];
        newDataServices.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataServices(newDataServices);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeleteService(false);
  }
  }
  
};

//********************-------------------------From EditClient
const [selectedService, setSelectedService] = useState(null);


const [editServicesForm, setEditServices] = useState(false);
const ShowEditService = () => setEditServices(!editServicesForm);

const handleRowClick = (service) => {
  setSelectedService(service);
  console.log(service);
  ShowEditService(true);
};


const handleEditClick = () => {
  // Tìm vị trí của phần tử cần sửa trong mảng dataClients
    setEditServices(!editServicesForm);
    setSelectedService(null);
};


  useEffect(() => {
    // Fetch data from the API URL
    fetch(apiDichVus)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataServices(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [addServicesForm,selectedService]);
  return (
    <div className='surcharges'>
      <p id='title'>Dịch vụ</p>
      <div className='btn_FillAdd'>
        <button id='btn_themPP' type="submit" onClick={ShowAddServices}>Thêm dịch vụ</button>
        <button id='btn_loc' type='submitLoc'> <FiFilter /> Lọc</button>
        <div>{addServicesForm && <AddServiceForm onCancel={() => setAddServices(!addServicesForm)}  onAddService={addService}/>}</div>
      </div>
      {/* class Thêm khách hàng */}
      <div className='tableThemKH'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Mã dịch vụ</th>
                <th>Tên dịch vụ</th>
                <th>Giá</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
              <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.maDV}</td>
                  <td>{d.tenDV}</td>
                  <td>{d.gia}</td>
                  <td>{d.trangThai ? "Đã sẵn sàng" : "Chưa sẵn sàng"}</td>
                  <td id='removeData' onClick={() => handleDeleteClick(d)}> <AiTwotoneDelete/></td>
                  <td id='editData' onClick={() => {handleRowClick(d);console.log(editServicesForm)}} > <BsThreeDotsVertical/></td>
                  <div> 
                  {deleteServices && (
        <DeleteServicesForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.maDV) }  serviceToDelete={serviceToDelete}/>)}
                  </div>
                  <div>
                    {editServicesForm && (<EditServicesForm onCancel={() => {setEditServices(!editServicesForm); setSelectedService(null);console.log(editServicesForm)}}
                                        editData={{
                                          maDV: selectedService.maDV,
                                          ...selectedService,
                                        }}
                                        onConfirm={() => handleEditClick()}
/>
                                      )}
                  </div>
                </tr>
              ))}
            </tbody>             
          </table>
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <button className='page-link' onClick={prevPage}>Prev</button>
              </li>
              {numbers.map((n, i) => (
                <li className='page-item' key={i}>
                  <button className={`page-item ${currentPage === n ? 'active' : ''}`} onClick={() => changeCpage(n)}>
                    {n}
                  </button>
                </li>
              ))}
              <li className='page-item'>
                <button className='page-link' onClick={nextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}


export default Service;