import React from 'react'
import '../scss/user.scss'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function UserInfo() {
  return (
    <>
    <Navbar />
    <div className='user-info-container'>
        <div className='user-info-sidebar'>
            <button type='button'>Đơn hàng</button>
            <button type='button'>Kho voucher</button>
            <button type='button'>Điểm tích lũy</button>
            <button type='button'>Sửa thông tin</button>
            <button type='button'>Sửa mật khẩu</button>
        </div>
        <div className='user-info'>
            <div className='user-personal-info'>
                <p>Tài khoản:</p>
                <p>Mật khẩu:</p>
                <p>Email:</p>
                <p>Số điện thoại:</p>
                <p>Địa chỉ:</p>
            </div>
            <div className='user-personal-info-data'>
                <p>User5763</p>
                <p>XXXXXXX</p>
                <p>user5763@gamil.com</p>
                <p>023456789</p>
                <p>Việt Nam</p>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default UserInfo