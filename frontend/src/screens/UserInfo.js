import React from "react";
import "../scss/user.scss";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NavLink, Outlet } from "react-router-dom";

function UserInfo() {
  return (
    <div>
      <Navbar />
      <div className="user-info-container">
        <div className="user-info-sidebar">
          <NavLink to="voucher" className="navlink">
            <button type="button">Đơn Hàng</button>
          </NavLink>
          <NavLink to="voucher" className="navlink">
            <button type="button">Kho voucher</button>
          </NavLink>
          <NavLink to="point" className="navlink">
            <button type="button">Điểm tích lũy</button>{" "}
          </NavLink>
          <NavLink className="navlink">
            <button type="button">Sửa thông tin</button>
          </NavLink>
          <NavLink className="navlink">
            <button type="button">Sửa mật khẩu</button>
          </NavLink>
        </div>
        <div className="user-info">
          <div className="user-personal-info">
            <p>Tài khoản:</p>
            <p>Mật khẩu:</p>
            <p>Email:</p>
            <p>Số điện thoại:</p>
            <p>Địa chỉ:</p>
          </div>
          <div className="user-personal-info-data">
            <p>User5763</p>
            <p>XXXXXXX</p>
            <p>user5763@gamil.com</p>
            <p>023456789</p>
            <p>Việt Nam</p>
          </div>
        </div>
      </div>
      <Outlet />

      <Footer />
    </div>
  );
}

export default UserInfo;
