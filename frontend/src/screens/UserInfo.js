import React from "react";
import "../scss/user.scss";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NavLink, Outlet } from "react-router-dom";

function UserInfo() {
  return (
    <>
      <Navbar />
      <div className="user-info-container">
        <div className="user-info-sidebar">
          <button type="button">
            <NavLink className="navlink">Đơn hàng</NavLink>
          </button>
          <button type="button">
            <NavLink className="navlink">Kho voucher</NavLink>
          </button>
          <button type="button">
            <NavLink to="point" className="navlink">
              Điểm tích lũy
            </NavLink>
          </button>
          <button type="button">
            <NavLink className="navlink">Sửa thông tin</NavLink>
          </button>
          <button type="button">
            <NavLink className="navlink">Sửa mật khẩu</NavLink>
          </button>
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
    </>
  );
}

export default UserInfo;
