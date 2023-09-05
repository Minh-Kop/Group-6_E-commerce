import { React, useState, useEffect } from "react";
import "../scss/productdetail.scss";
import book from "../assets/SGK.jpg";
import axios from "axios";

import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const handleGoBack = () => {
  window.history.back();
};

const productDetail = [
  "Kim Dong",
  "Viet Nam",
  "Tieng Viet",
  "Kim Dong",
  "2022",
  "100",
];

const productDetailTag = [
  "Thuong hieu:",
  "Nhap khau:",
  "Ngon ngu:",
  "Nha phat hanh:",
  "Nam xuat ban:",
  "Ton kho:",
];

const similarProduct = [
  {
    img: book,
    book: "Sách giáo khoa",
    price: "30.000 vnd",
    vote: "5.0",
  },
  {
    img: book,
    book: "Sách giáo khoa toán",
    price: "30.000 vnd",
    vote: "5.0",
  },
  {
    img: book,
    book: "Sách",
    price: "30.000 vnd",
    vote: "5.0",
  },
  {
    img: book,
    book: "Sách giáo khoa toán",
    price: "30.000 vnd",
    vote: "5.0",
  },
];

function ProductDetail() {
  const location = useLocation();

  const ID = location.state?.ID;

  const [records, setRecords] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/api/books/${ID}`)
      .then((res) => {
        setRecords(res.data.book);
        setType(res.data.book.category.children.children.categoryName);
        console.log(res.data.book);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-general-detail">
            <img src={records.mainImage} alt="Book image" />
            <div className="product-general-info">
              <h3>{records.bookName}</h3>
              <p>Thể loại: {type} </p>
              <p>Đánh giá: {records.avgRating} / 5.0</p>
              <p>Giá:</p>
              <div className="product-order-button">
                <form>
                  <button className="add-to-cart-button">
                    Them vao gio hang
                  </button>
                </form>
                <form>
                  <button className="buy-now-button">Mua ngay</button>
                </form>
              </div>
            </div>
          </div>

          <div className="product-detail-info">
            <h2>Thong tin san pham</h2>
            {productDetailTag.map((x, index) => (
              <p>
                {x} {productDetail[index]}
              </p>
            ))}
          </div>
          <button className="product-backBtn" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        <div className="similar-product-container">
          <h1>San pham tuong tu</h1>
          <div className="similar-product-list">
            {similarProduct.map((sProduct) => (
              <div className="similar-product">
                <img src={sProduct.img} alt={sProduct.book} />
                <p>{sProduct.book}</p>
                <p>{sProduct.price} VND</p>
                <p>{sProduct.vote}/5</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
