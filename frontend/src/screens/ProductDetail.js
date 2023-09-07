import { React, useState, useEffect } from "react";
import "../scss/productdetail.scss";
import axios from "axios";

import { useLocation, NavLink } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const handleGoBack = () => {
  window.history.back();
};

function ProductDetail() {
  const location = useLocation();

  const ID = location.state?.ID;

  const [records, setRecords] = useState([]);
  const [type, setType] = useState([]);
  const [cateID, setCateID] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/api/books/${ID}`)
      .then((res) => {
        setRecords(res.data.book);
        setType(res.data.book.category.children.children.categoryName);
        setCateID(res.data.book.category.children.children.id);
        console.log(res.data.book);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://127.0.0.1:3001/api/books?categoryId=${cateID}&limit=3`)
      .then((res) => {
        setRelated(res.data.books);
        console.log(res.data.book);
      })
      .catch((err) => console.log(err));
  }, [cateID, ID]);

  return (
    <div className="prodcut-detail-cover">
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-general-detail">
            <img src={records.mainImage} alt="Book" />
            <div className="product-general-info">
              <h3>{records.bookName}</h3>
              <p> {type} </p>
              <p>
                {records.avgRating} / 5.0 (Đánh giá {records.countRating})
              </p>
              <div className="product-general-info__priceCover">
                <p className="product-general-info__disPrice">
                  {records.discountedPrice}đ
                </p>
                <p className="product-general-info__price">
                  {records.originalPrice}đ
                </p>
                <p className="product-general-info__numPrice">
                  {records.discountedNumber}%
                </p>
              </div>
              <div className="product-order-button">
                <form>
                  <button className="add-to-cart-button">
                    Thêm vào giỏ hàng
                  </button>
                </form>
                <form>
                  <button className="buy-now-button">Mua ngay</button>
                </form>
              </div>
            </div>
          </div>

          <div className="product-detail-info">
            <h2>Thông tin sản phẩm</h2>
            <p>Nhà xuất bản: {records.publisher}</p>
            <p>Tác giả: {records.author}</p>
            <p>Năm xuất bản {records.publishedYear}</p>
            <p>Chất liệu: {records.bookFormat}</p>
            <p>Số trang: {records.numberPage}</p>
            <p>Mô tả: {records.description}</p>
            <p>Tồn kho: {records.stock}</p>
          </div>
          <button className="product-backBtn" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        <div className="similar-product-container">
          <h1>Sản phẩm tương tự</h1>
          <div className="similar-product-list">
            {related.map((sProduct) => (
              <NavLink
                to={{
                  pathname: `/home_page/${sProduct.bookId}`,
                }}
                state={{ ID: `${sProduct.bookId}` }}
                className="similar-product-list__cover"
              >
                <img
                  className="similar-product-container__img"
                  src={sProduct.image}
                  alt="Related book"
                />
                <div className="similar-product-container__book__inf__name">
                  {sProduct.bookName}
                </div>
                <div className="similar-product-container__book__inf__disprice__cover">
                  <div className="similar-product-container__book__inf__disprice">
                    {sProduct.discountedPrice}đ
                  </div>
                  <div className="similar-product-container__book__inf__price">
                    {sProduct.originalPrice}đ
                  </div>
                  <div className="similar-product-container__book__inf__disprice__num">
                    {sProduct.discountedNumber}%
                  </div>
                </div>

                <div className="similar-product-container__book__inf__rate">
                  {sProduct.avgRating} /5.0
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;
