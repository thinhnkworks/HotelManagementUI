import React, { useState, useEffect } from 'react';
import './InvoiceDetails.css';

function InvoiceDetails(props) {
  const [dataServices, setDataServices] = useState([]);
  const [dataSurcharges, setDataSurcharges] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);

  const apiDichVus = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemDichVus';
  const apiSurcharges = 'https://service-hotelmanagement-dev.azurewebsites.net/api/ThemPhuPhis';
  const apiHoaDons=`https://service-hotelmanagement-dev.azurewebsites.net/api/HoaDon`;
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
  const handlePrintInvoice=()=>{
      console.log('Đang xuất hóa đơn')
      // Gửi dữ liệu khách hàng mới lên API
      fetch(`${apiHoaDons}/${props.editData.maHD}?check=true`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          } else if (response.status === 204) {
            console.log('Đã xuất hóa đơn');
            props.onConfirm();
            // Có thể thực hiện xử lý khác sau khi gửi thành công
          }
        })
        .catch((error) => {
          console.error('Lỗi khi gửi dữ liệu:', error);
          // Xử lý lỗi khi gửi yêu cầu
        });
  }

  const handlePrint = () => {
    // Thiết lập trạng thái đang in thành true khi bắt đầu in
    setIsPrinting((prevIsPrinting) => !prevIsPrinting);
    handlePrintInvoice();
    // Mô phỏng một số công việc in cần thực hiện
    // Trong thực tế, bạn có thể muốn thực hiện các công việc in thực sự ở đây
  
    // Đợi cập nhật state hoàn tất, sau đó chạy window.print()
    setTimeout(() => {
      window.print();
  
      // Sau khi in xong, đặt trạng thái đang in lại thành false
      setIsPrinting((prevIsPrinting) => !prevIsPrinting);
    }, 0);

    
  };


  return (
    <div>
      <div className="formInvoiceDetails">
        <div className="overlay">
          <div className="form-container">

            <div className="tableServices">
            <h1 style={{ color: 'rgb(255, 0, 0)' }}><strong>Hóa đơn</strong></h1>
            <br/>
            <label>Mã hóa đơn:{props.editData.maHD}</label>

            <br/>
            <br/>

            <h3>Thông tin cá nhân</h3>
            <br/>
            <label>Họ và tên khách hàng : {props.editData.hoTenKhachHang}</label>
            <br/>
            <br/>
            <label>Ngày nhận phòng : {new Date(props.editData.ngayCheckIn).toLocaleDateString()}</label>
            <br/>
            <br/>
            <label>Ngày trả phòng : {new Date(props.editData.ngayCheckOut).toLocaleDateString()}</label>
            <br/>
            <br/>
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

            </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="tableSurcharges">
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            <h3>Thông tin phòng</h3>
            <br/>
            <label>Họ tên nhân viên đăng ký : {props.editData.hoTenNhanVien}</label>
            <br/>
            <br/>
            <label>Tên phòng : {props.editData.tenPhong}</label>
            <br/>
            <br/>
            <label>Trị giá hóa đơn : {props.editData.triGiaDonHang.toLocaleString()}  VNĐ</label>
            <br/>
            <br/>
            

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


                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
            <div>
              <h2 style={{ color: '#007bff' }}>Khách sạn NOVOLTEL</h2>
              <br/>
              <label>Địa chỉ: Số 1, Đường ABC, Phường Hiệp phú,Thành phố Thủ Đức, Việt Nam</label>
              <br/>
              <label style={{ color: 'rgb(255, 0, 0)' }}>Hotline: 0123456789</label>

            </div>
            <div className="button">
              {!isPrinting && (
        <input type="submit" value="Thoát" id="cancel-button" onClick={handleCancelClick} />
        )}

        {!isPrinting && (
          <input type="submit" value="In" id="cancel-button" onClick={handlePrint} />
        )}

      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
