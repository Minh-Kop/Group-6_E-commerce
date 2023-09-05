import React from "react";
import "../scss/order.scss";

import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import book from "../assets/SGK.jpg";

function HistoryOrder() {
  const check = (con) => {
    if (con === "Đang giao") return true;
    else return false;
  };

  const product = [
    {
      id: 1,
      img: book,
      book: "Sách giáo khoa",
      price: "30000",
      quantity: 1,
      state: "Đang giao",
    },
    {
      id: 2,
      img: book,
      book: "Sách giáo khoa toán",
      price: "30000",
      quantity: 1,
      state: "Đang giao",
    },
    {
      id: 3,
      img: book,
      book: "Sách",
      price: "30000",
      quantity: 3,
      state: "Hủy",
    },
    {
      id: 4,
      img: book,
      book: "Sách giáo khoa toán",
      price: "30000",
      quantity: 4,
      state: "Hủy",
    },
  ];

  const sum = (i) => {
    var sum = product[i].price * product[i].quantity;
    return sum;
  };

  return (
    <div>
      <Navbar />
      <div className="order__cover">
        <h2>Lịch sử đặt hàng</h2>
        <div className="order__items">
          {product.map((item, index) => (
            <div className="order__items__cover" key={item.id}>
              <NavLink className="order__items__item">
                <img className="order__items__img" src={item.img} alt="book" />
                <div className="order__items__inf">
                  <h3>{item.book}</h3>
                  <p>Tổng: {sum(index)}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
              </NavLink>

              <div
                className={
                  check(item.state)
                    ? "order__items__state"
                    : "order__items__state1"
                }
              >
                {item.state}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HistoryOrder;
