import React, { useState, useEffect } from 'react';
import './css/Surcharges.css';
import AddSurChargeForm from './Surcharges/AddSurCharges.js';
import DeleteSurchargeForm from './Surcharges/DeleteSurcharges.js';
import EditSurchargesForm from './Surcharges/EditSurcharges.js';
import { FiFilter } from 'react-icons/fi';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function Surcharge() {
  const [dataSurcharges, setDataSurcharges] = useState([]);
  const apiPhuPhis="https://service-hotelmanagement-dev.azurewebsites.net/api/phuphis";

  // Function to add a new surcharge
  const addSurcharge = (newSurcharge) => {
    // Add the new surcharge to the dataSurcharges state
    setDataSurcharges((prevData) => [...prevData, newSurcharge]);
  };


  //*******************------------------ */ [] để đảm bảo sẽ chạy chỉ một lần sau khi nạp trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataSurcharges.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataSurcharges.length / recordsPerPage);
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
const [addSurchargesForm, setAddSurcharges] = useState(false);
const ShowAddSurcharges = () => setAddSurcharges(!addSurchargesForm);

  
//**********************----------------------Form DeleteClient
const [surchargeToDelete, setSurchargeToDelete] = useState(null);

const [deleteSurcharges, setDeleteSurcharges] = useState(false);
const ShowDeleteSurcharge = () => setDeleteSurcharges(!deleteSurcharges);


  const handleDeleteClick = (surcharge) => {
    setSurchargeToDelete(surcharge);
  ShowDeleteSurcharge(true);
  };
  const handleCancelDelete = () => {
    ShowDeleteSurcharge(false);
  };

const handleRemoveClick = () => {
  if (surchargeToDelete) {
    const maPP = surchargeToDelete.maPP;
    // Tìm vị trí của phần tử cần xóa trong mảng dataSurcharges
  const indexToRemove = dataSurcharges.findIndex((surcharge) => surcharge.maPP === maPP);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/phuphis/${maPP}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Xóa phần tử khỏi mảng dataSurcharges sau khi xóa thành công trên API
        const newDataSurcharges = [...dataSurcharges];
        newDataSurcharges.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataSurcharges(newDataSurcharges);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeleteSurcharge(false);
  }
  }
  
};

//********************-------------------------From EditClient
const [selectedSurcharge, setSelectedSurcharge] = useState(null);


const [editSurchargesForm, setEditSurcharges] = useState(false);
const ShowEditSurcharge = () => setEditSurcharges(!editSurchargesForm);

const handleRowClick = (surcharge) => {
  setSelectedSurcharge(surcharge);
  console.log(surcharge);
  ShowEditSurcharge(true);
};


const handleEditClick = () => {
  // Tìm vị trí của phần tử cần sửa trong mảng dataClients
    setEditSurcharges(!editSurchargesForm);
    setSelectedSurcharge(null);
};


  useEffect(() => {
    // Fetch data from the API URL
    fetch(apiPhuPhis)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataSurcharges(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [addSurchargesForm,selectedSurcharge]);
  return (
    <div className='surcharges'>
      <p id='title'>Phụ phí</p>
      <div className='btn_FillAdd'>
        <button id='btn_themPP' type="submit" onClick={ShowAddSurcharges}>Thêm phụ phí</button>
        <button id='btn_loc' type='submitLoc'> <FiFilter /> Lọc</button>
        <div>{addSurchargesForm && <AddSurChargeForm onCancel={() => setAddSurcharges(!addSurchargesForm)}  onAddSurcharge={addSurcharge}/>}</div>
      </div>
      {/* class Thêm khách hàng */}
      <div className='tableThemKH'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Mã phụ phí</th>
                <th>Tên phụ phí</th>
                <th>Giá</th>
              </tr>
            </thead>
              <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.maPP}</td>
                  <td>{d.tenPP}</td>
                  <td>{d.gia}</td>
                  <td id='removeData' onClick={() => handleDeleteClick(d)}> <AiTwotoneDelete/></td>
                  <td id='editData' onClick={() => {handleRowClick(d);console.log(editSurchargesForm)}} > <BsThreeDotsVertical/></td>
                  <div> 
                  {deleteSurcharges && (
        <DeleteSurchargeForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.maPP) }  surchargeToDelete={surchargeToDelete}/>)}
                  </div>
                  <div>
                    {editSurchargesForm && (<EditSurchargesForm onCancel={() => {setEditSurcharges(!editSurchargesForm); setSelectedSurcharge(null);console.log(editSurchargesForm)}}
                                        editData={{
                                          maPP: selectedSurcharge.maPP,
                                          ...selectedSurcharge,
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


export default Surcharge;