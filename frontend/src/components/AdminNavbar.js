import React from "react";
import "../scss/components.scss";

import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="sidebar-nav-container">
      <div className="sidebar-nav">
        <NavLink to="/admin-customer-management">
          <button type="button">Khách hàng</button>
        </NavLink>

        <NavLink to="/admin-order-management">
          <button type="button">Sản phẩm</button>
        </NavLink>

        <NavLink to="/admin-point-management">
          <button type="button">Voucher</button>
        </NavLink>

        <NavLink>
          <button type="button">Thống kê</button>
        </NavLink>

        <NavLink>
          <button type="button">Đơn hàng</button>
        </NavLink>
      </div>
    </div>
  );
}

export default AdminNavbar;
