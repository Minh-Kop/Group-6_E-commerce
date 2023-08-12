import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import book from "../assets/SGK.jpg";
import "../scss/admin.scss"
import Navbar from '../components/Navbar';

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
  return (
    <div className='product-management-container'>
        <div className='product-search'>
            <form>
                <input type='text' placeholder='Tên sảm phẩm'></input>
                <button type='button'>Tìm kiếm</button>
            </form>
        </div>
        <AdminNavbar />
        <div className='product-add-button'>
            <button className='add-button' type='button'>+ Thêm sản phẩm</button>
        </div>
        
        <div className='product-info'>
            {productList.map((product) => (
                <div className='product-data'>
                    <img src={product.img}></img>
                    <div className='product-description'>
                        <p>Mã sản phẩm: {product.id}</p>
                        <p>Tên sản phẩm: {product.book}</p>
                        <p>Giá hiện tại: {product.price}</p>
                    </div>
                    <button type='button'>Chi tiết</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AdminProductManagement