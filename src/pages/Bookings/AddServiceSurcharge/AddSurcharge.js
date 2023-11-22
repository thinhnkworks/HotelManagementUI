import React, { useState, useEffect } from 'react';
import './AddSurcharge.css';

function AddSurchargeForm(props) {
  const [newSurcharge, setNewSurcharge] = useState({
    maPP: '',
    maNV: '',
    maSKDP: props.maSKDP,
    soLuong: '',
    thoiGian: '',
  });
  const [errors, setErrors] = useState({
    maPP: '',
    maNV: '',
    maSKDP: '',
    soLuong: '',
    thoiGian: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSurcharge({
      ...newSurcharge,
      [name]: value,
    });
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        setErrors({
          ...errors,
          [name]: '',
        });
  };
  const [dataSurcharges, setDataSurcharges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const apiPhuPhis = 'https://service-hotelmanagement-dev.azurewebsites.net/api/phuphis';

  const fetchSurchargeData = () => {
    const fetchDataWithAuthorization = async () => {
      try {
        const response = await fetch(apiPhuPhis, {
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
        setDataSurcharges(data.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the function to fetch data
    fetchDataWithAuthorization();
  };

  useEffect(() => {
    fetchSurchargeData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dataSurcharges.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataSurcharges.length / recordsPerPage); i++) {
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
    const validationErrors = validateInput(newSurcharge);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      alert("Vui lòng kiểm tra thông tin.");
      return;
    }

    // Chuẩn bị dữ liệu cần gửi lên API
    const dataToSend = { ...newSurcharge };
  console.log(JSON.stringify(dataToSend));
    // Gửi dữ liệu khách hàng mới lên API
    fetch('https://service-hotelmanagement-dev.azurewebsites.net/api/ThemPhuPhis', {
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
        // props.onAddSurcharge(newSurcharge); // Pass the new Surcharge data
        props.onCancel();
        // Có thể thêm xử lý khác sau khi gửi thành công
      })
      .catch((error) => {
        console.log(dataToSend)
        console.error('Lỗi khi gửi dữ liệu:', error);
        // Hiển thị thông báo lỗi cho người dùng (hoặc xử lý lỗi theo cách phù hợp với ứng dụng của bạn)
      });
  };

  const validateInput = (Surcharge) => {
    const errors = {
      maPP: '',
      maNV: '',
      maSKDP:'',
      soLuong: '',
      thoiGian: '',
    };
  
    // Kiểm tra mã phụ phí
    if (!Surcharge.maPP) {
      errors.maPP = "Vui lòng nhập mã phụ phí.";
    }
  
    // Kiểm tra mã nhân viên
    if (!Surcharge.maNV) {
      errors.maNV = "Vui lòng nhập mã nhân viên.";
    }
  
    // Kiểm tra số lượng
    if (Surcharge.soLuong === undefined || Surcharge.soLuong === null) {
      errors.soLuong = "Vui lòng nhập số lượng.";
    } else if (!/^\d+$/.test(Surcharge.soLuong) || parseInt(Surcharge.soLuong) <= 0) {
      errors.soLuong = "Số lượng phải là một số nguyên dương.";
    }
  
    // Kiểm tra thời gian
    if (!Surcharge.thoiGian) {
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
      <div className="formSurcharge">
        <div className="overlay">
          <div className="form-container">
            <div className="tableThemKH">
              <table>
                <thead>
                  <tr>
                    <th>Mã phụ phí</th>
                    <th>Tên phụ phí</th>
                    <th>Giá</th>    
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((d, i) => (
                    <tr key={i}>
                      <td>{d.maPP}</td>
                      <td>{d.tenPP}</td>
                      <td>{d.gia}</td>
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
              <input type="text" id="maSKDP" name="maSKDP" placeholder="Mã sự kiện đặt phòng"  disabled value={newSurcharge.maSKDP} onChange={handleInputChange}/>
              <br/>
              <label>Mã phụ phí</label>
              <br />
              <input type="text" id="maPP" name="maPP" placeholder="Mã phụ phí" value={newSurcharge.maPP} onChange={handleInputChange}/>
              <br />
              <br />
              <label>Mã nhân viên</label>
              <br />
              <input type="text" id="maNV" name="maNV" placeholder="Nhập mã nhân viên" value={newSurcharge.maNV} onChange={handleInputChange}/>
              <br />
              <br />
              <label>Số lượng</label>
              <br />
              <input type="text" name="soLuong" placeholder="Nhập số lượng" value={newSurcharge.soLuong} onChange={handleInputChange} />
              <br />
              <div className="error-message"></div>
              <br />
              <label>Thời gian  </label><br/>
              <input type="date" id="thoiGian" name="thoiGian" placeholder="Thời gian " value={newSurcharge.thoiGian}  onChange={handleInputChange}/><br />

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

export default AddSurchargeForm;
