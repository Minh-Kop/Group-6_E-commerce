import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import book from "../assets/SGK.jpg";
import "../scss/admin.scss";
import AdminAddProduct from "../components/AdminAddProduct";
import AdminProductDetail from "../components/AdminProductDetail";
import axios from "axios";

const productList = [
  {
    id: 1,
    img: book,
    book: "Sách giáo khoa",
    price: "30.000",
    vote: "5.0",
    quantity: 1,
  },
  {
    id: 2,
    img: book,
    book: "Sách giáo khoa toán",
    price: "30.000",
    vote: "5.0",
    quantity: 1,
  },
  {
    id: 3,
    img: book,
    book: "Sách",
    price: "30.000",
    vote: "5.0",
    quantity: 3,
  },
  {
    id: 4,
    img: book,
    book: "Sách giáo khoa toán",
    price: "30.000",
    vote: "5.0",
    quantity: 4,
  },
];

function AdminProductManagement() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/api/books?page=1&limit=50`)
      .then((res) => {
        setRecords(res.data.books);
        console.log(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  const [selectedProduct, setSelected] = useState(-1);
  const [showProduct, setOpenProduct] = useState(false);
  const [openProduct, setOpen] = useState(false);
  return (
    <>
      <div className="admin-product-management-container">
        <AdminNavbar />

        <div className="product-search">
          <form>
            <input type="text" placeholder="Tên sản phẩm"></input>
            <button type="button">Tìm kiếm</button>
          </form>
        </div>

        <div className="product-add-button">
          <button
            className="add-button"
            type="button"
            onClick={() => setOpen(true)}
          >
            + Thêm sản phẩm
          </button>
        </div>

        <div className="product-info">
          {records.map((product) => (
            <div className="product-data">
              <img src={product.image} alt="Book"></img>
              <div className="product-description">
                <p>Mã sản phẩm: {product.bookId}</p>
                <p>Tên sản phẩm: {product.bookName}</p>
                <p>Giá hiện tại: {product.discountedNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpenProduct(true);
                  setSelected(product.bookId);
                }}
              >
                Chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
      {openProduct === true && <AdminAddProduct setOpen={setOpen} />}
      {showProduct === true && (
        <AdminProductDetail id={selectedProduct} setOpen={setOpenProduct} />
      )}
    </>
  );
}

export default AdminProductManagement;
