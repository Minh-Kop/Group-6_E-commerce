import React from "react";
import voucher_img from "../assets/voucher-icon.png";
import "../scss/user.scss";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

const testVoucher = [
  {
    id: 1,
    name: "Free ship",
    percentage: 100,
    image: voucher_img,
    type: 0,
  },
  {
    id: 2,
    name: "Giảm đồ gia dụng",
    percentage: 20,
    image: voucher_img,
    type: 2,
  },
  {
    id: 3,
    name: "Giảm đồ điện tử",
    percentage: 5,
    image: voucher_img,
    type: 2,
  },
  {
    id: 4,
    name: "Giảm giá bất kì",
    percentage: 10,
    image: voucher_img,
    type: 2,
  },
  {
    id: 5,
    name: "Free ship",
    percentage: 100,
    image: voucher_img,
    type: 0,
  },
];

function UserVoucher() {
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

        <div className="user-voucher-container">
          <div className="voucher-search">
            <form>
              <input className="search-bar" placeholder="Tên voucher"></input>
              <button type="button">Tìm kiếm</button>
            </form>
          </div>
          <div className="voucher-table">
            {testVoucher.map((voucher) => (
              <div className="voucher">
                <img src={voucher.image} alt="Voucher icon"></img>
                <div className="voucher-detail">
                  <p>{voucher.name}</p>
                  <p>Phần trăm giảm: {voucher.percentage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default UserVoucher;
