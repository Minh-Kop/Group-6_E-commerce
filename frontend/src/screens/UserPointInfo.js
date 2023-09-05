import React, { useState } from "react";
import "../scss/user.scss";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

function UserPointInfo() {
  const [isSelected, setSelected] = useState(0);
  const pointTableHeader = ["STT", "Nội dung", "Ngày", "Biến động"];
  const pointTableData = [
    {
      id: 1,
      content: "aasdasdsdf",
      date: "12/12/2023",
      fluctuate: "-100",
    },
    {
      id: 2,
      content: "asdf",
      date: "12/12/2023",
      fluctuate: "-300",
    },
    {
      id: 3,
      content: "asdf",
      date: "12/12/2023",
      fluctuate: "+500",
    },
    {
      id: 4,
      content: "asdf",
      date: "12/12/2023",
      fluctuate: "+500",
    },
  ];

  const totalPoint = () => {
    var point = 0;
    for (var i = 0; i < pointTableData.length; i++) {
      point += parseInt(pointTableData[i].fluctuate);
    }
    return point;
  };

  return (
    <div>
      <Navbar />

      <div className="user-info-container">
        <div className="user-info-sidebar">
          <NavLink to="/order" className="navlink">
            <button type="button">Đơn Hàng</button>
          </NavLink>
          <NavLink to="/voucher" className="navlink">
            <button type="button">Kho voucher</button>
          </NavLink>
          <NavLink to="/point" className="navlink">
            <button type="button">Điểm tích lũy</button>
          </NavLink>
          <NavLink to="/change_password" className="navlink">
            <button type="button">Sửa mật khẩu</button>
          </NavLink>
        </div>

        <div className="user-point-info-container">
          <p className="user-point-total">Điểm thưởng: {totalPoint()}</p>
          <div className="user-point-category">
            <button type="button" onClick={() => setSelected(0)}>
              Tất cả
            </button>
            <button type="button" onClick={() => setSelected(1)}>
              Đã nhận
            </button>
            <button type="button" onClick={() => setSelected(-1)}>
              Đã dùng
            </button>
          </div>
          <div className="user-point-table">
            <div className="point-table-header">
              <p className="table-header-1">{pointTableHeader[0]}</p>
              <p className="table-header-2">{pointTableHeader[1]}</p>
              <p className="table-header-3">{pointTableHeader[2]}</p>
              <p className="table-header-4">{pointTableHeader[3]}</p>
            </div>
            {pointTableData.map((pdata) => {
              return (
                ((isSelected === 1 && parseInt(pdata.fluctuate) > 0) ||
                  (isSelected === -1 && parseInt(pdata.fluctuate) < 0) ||
                  isSelected === 0) && (
                  <>
                    <hr></hr>
                    <div className="point-table-data">
                      <p className="id-data">{pdata.id}</p>
                      <p className="content-data">{pdata.content}</p>
                      <p className="date-data">{pdata.date}</p>
                      <p className="fluc-data">{pdata.fluctuate}</p>
                    </div>
                  </>
                )
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserPointInfo;
