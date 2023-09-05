import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import "../scss/user.scss";

function ChangePassword(props) {
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
            <button type="button">Điểm tích lũy</button>{" "}
          </NavLink>
          <NavLink className="navlink">
            <button to="/change_password" type="button">
              Sửa mật khẩu
            </button>
          </NavLink>
        </div>

        <div className="change-password-area">
          Thay Đổi Mật Khẩu
          <div className="change-password-area__input">
            <p>Nhập mật khẩu cũ</p>
            <input className="input" placeholder="Nhập mật khẩu cũ" />
          </div>
          <div className="change-password-area__input">
            <p>Nhập mật khẩu mới</p>
            <input className="input" placeholder="Nhập mật khẩu mới" />
          </div>
          <div className="change-password-area__input">
            <p>Xác nhận mật khẩu mới</p>
            <input className="input" placeholder="Xác nhận mật khẩu mới" />
          </div>
          <button>Xác nhận</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChangePassword;
