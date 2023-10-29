import React, { useState, useEffect } from 'react';
import './css/ListRooms.css';
import AddRoomForm from './ListRooms/AddRoom.js';
import DeleteListRoomsForm from './Services/DeleteServices.js';
import EditListRoomsForm from './ListRooms/EditRoom.js';
import { FiFilter } from 'react-icons/fi';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {AiTwotoneDelete} from 'react-icons/ai';


function ListRoom() {
  const [selectedBtn, setSelectedBtn] = useState('allRooms');
  const [dataListRooms, setDataListRooms] = useState([]);
  const [totalRoomsCount, setTotalRoomsCount] = useState(0);
  const [totalRentedRoomsCount, setTotalRentedRoomsCount] = useState(0);
  const [totalEmptyRoomsCount, setTotalEmptyRoomsCount] = useState(0);
  const [records, setRecords] = useState([]); // Sử dụng state để lưu trữ records
  const [currentPage, setCurrentPage] = useState(1);
  const [npage, setNpage] = useState(1);
  const apiDSPhongs="https://service-hotelmanagement-dev.azurewebsites.net/api/phongs";

  // Function to add a new room
  const addRoom = (newRoom) => {
    // Add the new room to the dataListRooms state
    setDataListRooms((prevData) => [...prevData, newRoom]);
  };


  //*******************------------------ */ [] để đảm bảo sẽ chạy chỉ một lần sau khi nạp trang
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
// Sử dụng useEffect để theo dõi sự thay đổi của dataListRooms và cập nhật records


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
  const [filterCondition, setFilterCondition] = useState(null); // Sử dụng null cho 'Tất cả phòng'

  const handleAllRoomsClick = () => {
    setFilterCondition(null); // Set filter về null khi chọn 'Tất cả phòng'
    setSelectedBtn('allRooms');
    setCurrentPage(1);
  };
  
  const handleEmptyRoomsClick = () => {
    setFilterCondition(0); // Set filter về 0 khi chọn 'Phòng trống'
    setSelectedBtn('emptyRooms');
    setCurrentPage(1);
  };
  
  const handleRentedRoomsClick = () => {
    setFilterCondition(1); // Set filter về 1 khi chọn 'Phòng đã thuê'
    setSelectedBtn('rentedRooms');
    setCurrentPage(1);
  };
  
  useEffect(() => {
    setTotalRoomsCount(dataListRooms.length);
    const emptyRooms = dataListRooms.filter(room => room.trangThai === 0);
  const rentedRooms = dataListRooms.filter(room => room.trangThai === 1);

  setTotalEmptyRoomsCount(emptyRooms.length);
  setTotalRentedRoomsCount(rentedRooms.length);
    let filteredData = dataListRooms;

    if (filterCondition !== null) {
      filteredData = dataListRooms.filter((room) => room.trangThai === filterCondition);
    }
  
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
  
    const updatedRecords = filteredData.slice(firstIndex, lastIndex);
    setRecords(updatedRecords);
  
    // Cập nhật lại số trang (npage) dựa trên dữ liệu được lọc
    const updatedNpage = Math.ceil(filteredData.length / recordsPerPage);
    setNpage(updatedNpage);
  }, [dataListRooms, currentPage, filterCondition, recordsPerPage]);
  // Nơi hiển thị danh sách phòng
  const filteredRecords = records.filter(d => {
    if (filterCondition === null) {
      return true; // Hiển thị tất cả phòng
    } else {
      return d.trangThai === filterCondition; // Lọc theo điều kiện đã chọn

    }
  });
    useEffect(() => {
    const updatedRecords = dataListRooms.filter(room => {
      if (filterCondition === null) {
        return true; // Hiển thị tất cả phòng
      } else {
        return room.trangThai === filterCondition; // Lọc theo điều kiện đã chọn
      }
    }).slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    setRecords(updatedRecords);
    
  }, [dataListRooms, currentPage, filterCondition, recordsPerPage]);

  // ******************-------------------------------Form AddClient
const [addRoomsForm, setAddRooms] = useState(false);
const ShowAddRooms = () => setAddRooms(!addRoomsForm);

  
//**********************----------------------Form DeleteClient
const [roomToDelete, setRoomToDelete] = useState(null);

const [deleteRooms, setDeleteRooms] = useState(false);
const ShowDeleteRoom = () => setDeleteRooms(!deleteRooms);


  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
  ShowDeleteRoom(true);
  };
  const handleCancelDelete = () => {
    ShowDeleteRoom(false);
  };

const handleRemoveClick = () => {
  if (roomToDelete) {
    const maPhong = roomToDelete.maPhong;
    // Tìm vị trí của phần tử cần xóa trong mảng dataListRooms
  const indexToRemove = dataListRooms.findIndex((room) => room.maPhong === maPhong);

  if (indexToRemove !== -1) {
    // Thực hiện yêu cầu DELETE đến API
    fetch(`https://service-hotelmanagement-dev.azurewebsites.net/api/phongs/${maPhong}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Xóa phần tử khỏi mảng dataListRooms sau khi xóa thành công trên API
        const newDataListRooms = [...dataListRooms];
        newDataListRooms.splice(indexToRemove, 1);

        // Cập nhật danh sách dữ liệu
        setDataListRooms(newDataListRooms);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    // Đóng Form Hủy
    ShowDeleteRoom(false);
  }
  }
  
};

//********************-------------------------From EditClient
const [selectedRoom, setSelectedRoom] = useState(null);


const [editListRoomsForm, setEditListRooms] = useState(false);
const ShowEditService = () => setEditListRooms(!editListRoomsForm);

const handleRowClick = (room) => {
  setSelectedRoom(room);
  console.log(room);
  ShowEditService(true);
};


const handleEditClick = () => {
  // Tìm vị trí của phần tử cần sửa trong mảng dataClients
    setEditListRooms(!editListRoomsForm);
    setSelectedRoom(null);
};


  useEffect(() => {
    // Fetch data from the API URL
    fetch(apiDSPhongs)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataListRooms(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [addRoomsForm,selectedRoom]);
  return (
    <div className='surcharges'>
      <p id='title'>Danh sách phòng</p>
      <div className='btn_FillAdd'>
        <button id='btn_themPP' type="submit" onClick={ShowAddRooms}>Thêm phòng</button>
        <div>{addRoomsForm && <AddRoomForm onCancel={() => setAddRooms(!addRoomsForm)}  onAddRoom={addRoom}/>}</div>
      </div>
      <div className='btn_ListRooms'>
        <button className={selectedBtn === 'allRooms' ? 'selected' : ''} onClick={handleAllRoomsClick}>Tất cả phòng ({totalRoomsCount})</button>
        <button className={selectedBtn === 'emptyRooms' ? 'selected' : ''} onClick={handleEmptyRoomsClick}>Phòng trống({totalEmptyRoomsCount})</button>
        <button className={selectedBtn === 'rentedRooms' ? 'selected' : ''} onClick={handleRentedRoomsClick}>Phòng đã thuê({totalRentedRoomsCount})</button>
      </div>
      {/* <div className='roomClassification'>

      </div> */}
      {/* class Thêm khách hàng */}
      <div className='tableThemKH'>
        <div>
          <table>
            <thead>
              <tr>
                <th>Mã phòng</th>
                <th>Tên loại phòng</th>
                <th>Số người ở</th>
                <th>Giá</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
              <tbody>
              {filteredRecords
        .map((d, i) => (
            <tr key={i}>
      <td>{d.maPhong}</td>
      <td>{d.loaiPhong.tenLoaiPhong}</td>
      <td>{d.loaiPhong.soNguoiO}</td>
      <td>{d.loaiPhong.gia}</td>
      <td>{d.trangThai ? "Đã thuê" : "Còn trống"}</td>
      <td id='removeData' onClick={() => handleDeleteClick(d)}> <AiTwotoneDelete/></td>
      <td id='editData' onClick={() => {handleRowClick(d);console.log(editListRoomsForm)}} > <BsThreeDotsVertical/></td>
                  <div> 
                  {deleteRooms && (
        <DeleteListRoomsForm onCancel={handleCancelDelete} onConfirm={() => handleRemoveClick(d.maPhong) }  roomToDelete={roomToDelete}/>)}
                  </div>
                  <div>
                    {editListRoomsForm && (<EditListRoomsForm onCancel={() => {setEditListRooms(!editListRoomsForm); setSelectedRoom(null);console.log(editListRoomsForm)}}
                                        editData={{
                                          maPhong: selectedRoom.maPhong,
                                          ...selectedRoom,
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


export default ListRoom;