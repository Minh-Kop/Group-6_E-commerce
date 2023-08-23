import React from "react";
import "../scss/user.scss";

function UserInfoChange() {
  return (
    <div className="user-info-change-container">
      <button className="back-button" type="button">
        &lt; Back
      </button>
      <div className="info-container">
        <h2>Hồ sơ của tôi</h2>
        <h3>Quản lí thông tin hồ sơ để bảo mật tài khoản</h3>
        <div className="user-info">
          <div className="user-personal-info">
            <div className="user-account-name">
              <p>Tài khoản:</p>
              <input className="account-name-input"></input>
            </div>
            <div className="user-name">
              <p>Tên:</p>
              <input className="name-input"></input>
            </div>
            <div className="user-email">
              <p>Email:</p>
              <input className="email-input"></input>
            </div>
            <div className="user-phone-number">
              <p>Số điện thoại:</p>
              <input className="phone-number-input"></input>
            </div>
            <div className="user-address">
              <p>Địa chỉ:</p>
              <input className="address-input"></input>
            </div>
          </div>
        </div>
        <button className="save-change-button" type="button">
          Lưu
        </button>
      </div>
    </div>
  );
}

export default UserInfoChange;
