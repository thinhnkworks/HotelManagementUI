import React, { useState, useEffect } from 'react';
import './AddService.css';

function AddServiceForm(props) {
  const [newService, setNewService] = useState({
    maDV: '',
    maNV: props.maNV,
    maSKDP: props.maSKDP,
    soLuong: '',
    thoiGian: '',
  });
  const [errors, setErrors] = useState({
    maDV: '',
    maNV: '',
    maSKDP: '',
    soLuong: '',
    thoiGian: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value,
    });
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        setErrors({
          ...errors,
          [name]: '',
        });
  };
  const [dataServices, setDataServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const apiDichVus = 'https://service-hotelmanagement-dev.azurewebsites.net/api/dichvus';

  const fetchServiceData = () => {
    const fetchDataWithAuthorization = async () => {
      try {
        const response = await fetch(apiDichVus, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add your authorization token here, replace 'YOUR_TOKEN' with the actual token
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
  
        const data = await response.json();
        setDataServices(data.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the function to fetch data
    fetchDataWithAuthorization();
  
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dataServices.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataServices.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = (e) => {
  
    // Kiểm tra và hiển thị thông báo lỗi
    const validationErrors = validateInput(newService);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }

    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newService };
  console.log(JSON.stringify(dataToSend));
    // Gửi dữ liệu khách hàng mới lên API
    fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/ThemDichVus', {
      method: 'POST',
      mode: 'cors', // Đảm bảo mode là 'cors'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataToSend),
      
    })
    
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log('Dữ liệu đã được gửi thành công:', data);
        // Gọi hàm callback để thông báo cho component cha
        // props.onAddService(newService); // Pass the new service data
        props.onCancel();
        // Có thể thêm xử lý khác sau khi gửi thành công
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
        // Hiển thị thông báo lỗi cho người dùng (hoặc xử lý lỗi theo cách phù hợp với ứng dụng của bạn)
      });
  };

  const validateInput = (service) => {
    const errors = {
      maDV: '',
      maNV: '',
      maSKDP:'',
      soLuong: '',
      thoiGian: '',
    };
  
    // Kiểm tra mã dịch vụ
    if (!service.maDV) {
      errors.maDV = "Vui lòng nhập mã dịch vụ.";
    }
  
    // Kiểm tra mã nhân viên
    if (!service.maNV) {
      errors.maNV = "Vui lòng nhập mã nhân viên.";
    }
  
    // Kiểm tra số lượng
    if (service.soLuong === undefined || service.soLuong === null) {
      errors.soLuong = "Vui lòng nhập số lượng.";
    } else if (!/^\d+$/.test(service.soLuong) || parseInt(service.soLuong) <= 0) {
      errors.soLuong = "Số lượng phải là một số nguyên dương.";
    }
  
    // Kiểm tra thời gian
    if (!service.thoiGian) {
      errors.thoiGian = "Vui lòng nhập thời gian.";
    }
  
    return errors;
  };
  
  

  const handleSendClick = (e) => {
    e.preventDefault(); // Ngăn chặn mặc định của biểu mẫu
  handleSubmit(e); // Truyền sự kiện vào hàm handleSubmit

};

const handleCancelClick = () => {
  // Gọi hàm callback để thông báo cho component cha
  props.onCancel();
};
  return (
    <div>
      <div className="formService">
        <div className="overlay">
          <div className="form-container">
            <div className="tableThemKH">
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
                  {currentRecords.map((d, i) => (
                    <tr key={i}>
                      <td>{d.maDV}</td>
                      <td>{d.tenDV}</td>
                      <td>{d.gia}</td>
                      <td>{d.trangThai ? 'Đã sẵn sàng' : 'Chưa sẵn sàng'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="pagination">
                <li>
                    <button className="page-link" onClick={prevPage}>Previous</button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number}>
                    <button
                        className={`page-button ${number === currentPage ? 'currentPage' : ''}`}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </button>
                    </li>
                ))}
                <li>
                    <button className="page-link" onClick={nextPage}>Next</button>
                </li>
                </ul>
            </div>

            <form className="containerEditSurcharges">
            <label>Mã sự kiện đặt phòng</label>
              <br />
              <input type="text" id="maSKDP" name="maSKDP" placeholder="Mã sự kiện đặt phòng"  disabled value={newService.maSKDP} onChange={handleInputChange}/>
              <br/>
              <label>Mã dịch vụ</label>
              <br />
              <input type="text" id="maDV" name="maDV" placeholder="Mã dịch vụ" value={newService.maDV} onChange={handleInputChange}/>
              <br />
              <br />
              <label>Mã nhân viên</label>
              <br />
              <input type="text" id="maNV" name="maNV" placeholder="Nhập mã nhân viên" value={newService.maNV} onChange={handleInputChange}/>
              <br />
              <br />
              <label>Số lượng</label>
              <br />
              <input type="text" name="soLuong" placeholder="Nhập số lượng" value={newService.soLuong} onChange={handleInputChange} />
              <br />
              <div className="error-message"></div>
              <br />
              <label>Thời gian  </label><br/>
              <input type="date" id="thoiGian" name="thoiGian" placeholder="Thời gian " value={newService.thoiGian}  onChange={handleInputChange}/><br />

              <br />
              <div className="button">
                <input type="submit" value="Hủy" id="cancel-button" onClick={handleCancelClick} />
                <input type="submit" value="Xác nhận" id="submit-button" onClick={handleSendClick} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddServiceForm;
