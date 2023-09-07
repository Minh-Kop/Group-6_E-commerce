import React from "react";
import "../scss/user.scss";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

function UserInfo() {
  return (
    <div>
      <Navbar />
      <div className="user-info-container">
        <div className="user-info-sidebar">
          <NavLink to="/user" className="navlink">
            <button type="button">Thông tin cá nhân</button>
          </NavLink>
          <NavLink to="/order" className="navlink">
            <button type="button">Đơn Hàng</button>
          </NavLink>
          <NavLink to="/voucher" className="navlink">
            <button type="button">Kho voucher</button>
          </NavLink>
          <NavLink to="/point" className="navlink">
            <button type="button">Điểm tích lũy</button>{" "}
          </NavLink>
          <NavLink to="/change_password" className="navlink">
            <button type="button">Sửa mật khẩu</button>
          </NavLink>
        </div>
        <div className="info-container">
          <h2>Hồ sơ của tôi</h2>
          <h3>Quản lí thông tin hồ sơ để bảo mật tài khoản</h3>
          <div className="user-info">
            <div className="user-personal-info">
              <p>Tài khoản:</p>
              <p>Tên:</p>
              <p>Email:</p>
              <p>Số điện thoại:</p>
              <p>Địa chỉ:</p>
            </div>
            <div className="user-personal-info-data">
              <p>User5763</p>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
              <input type="text"></input>
            </div>
          </div>
          <button className="save-info" type="button">
            Lưu
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserInfo;
