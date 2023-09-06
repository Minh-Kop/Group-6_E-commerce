import React, { useState, useRef } from "react";
import "../scss/signin.scss";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import Popup from "../components/popup";
import axios from "axios";

const Signup = () => {
  const Name = useRef(null);
  const Pass = useRef(null);
  const Email = useRef(null);
  const SDT = useRef(null);

  const [Click, setClick] = useState(false);

  const sendData = () => {
    setClick(true);

    axios
      .post("http://127.0.0.1:3001/api/users/signup", {
        fullName: Name.current.value,
        password: Pass.current.value,
        email: Email.current.value,
        phoneNumber: SDT.current.value,
      })
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleClick = () => {
    if (Click) setClick(!Click);
  };

  return (
    <div onClick={() => handleClick()} className="signup">
      <header className="signup__header"></header>
      <div className="signup__form">
        <div className="signup__form__title"> Sign up</div>
        <div className="signup__form__enter">
          <div className="signup__form__enter__cover">
            <div className="signup__form__enter__cover__name">Tài khoản</div>
            <input
              ref={Name}
              className="signup__form__enter__input"
              placeholder="Username"
            />
          </div>
          <div className="signup__form__enter__cover">
            <div className="signup__form__enter__cover__name"> Mật khẩu</div>
            <input
              ref={Pass}
              className="signup__form__enter__input"
              placeholder="Password"
            />
          </div>

          <div className="signup__form__enter__cover">
            <div className="signup__form__enter__cover__name"> Email</div>
            <input
              ref={Email}
              className="signup__form__enter__input"
              placeholder="Email"
            />
          </div>
          <div className="signup__form__enter__cover">
            <div className="signup__form__enter__cover__name"> SDT</div>
            <input
              ref={SDT}
              className="signup__form__enter__input"
              placeholder="Phone number"
            />
          </div>
        </div>
        <Popup
          title="Thành công"
          content="Bạn đã đăng kí thành công"
          trigger={Click}
          link="/home_page"
        />
        <div className="signup__form__btnsCover">
          <NavLink to={"/"} className="signup__form__btnsCover__btn DN">
            Trở lại
          </NavLink>
          <button
            onClick={() => sendData()}
            className="signup__form__btnsCover__btn DK"
          >
            Đăng ký
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
