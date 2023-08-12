import React from "react";
import "../scss/order.scss";

import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import book from "../assets/SGK.jpg";

function Order() {
  const product = [
    {
      id: 1,
      img: book,
      book: "Sách giáo khoa",
      price: "30000",
      quantity: 1,
    },
    {
      id: 2,
      img: book,
      book: "Sách giáo khoa toán",
      price: "30000",
      quantity: 1,
    },
    {
      id: 3,
      img: book,
      book: "Sách",
      price: "30000",
      quantity: 3,
    },
    {
      id: 4,
      img: book,
      book: "Sách giáo khoa toán",
      price: "30000",
      quantity: 4,
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
        <h2>Theo dõi đơn hàng</h2>
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

              <div className="order__items__state">Đang giao</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Order;
