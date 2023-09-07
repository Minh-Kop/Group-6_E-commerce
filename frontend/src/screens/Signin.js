import { React, useRef, useState } from "react";
import "../scss/signin.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const Signin = () => {
  const email = useRef(null);
  const pass = useRef(null);

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSignin = (event) => {
    axios
      .post("http://127.0.0.1:3001/api/users/login", {
        email: email.current.value,
        password: pass.current.value,
      })
      .then((res) => {
        setStatus(res.data.status);
        console.log(res);
      })
      .catch((err) => console.log(err));

    if (status === "success")
      setTimeout(() => {
        navigate("/home_page");
      }, 4500);
    else
      setTimeout(() => {
        navigate("/");
      }, 4500);
  };

  return (
    <div className="signin">
      <header className="signin__header"></header>
      <div className="signin__form">
        <div className="signin__form__welcome">Welcome to our website</div>
        <div className="signin__form__enter">
          <div className="signin__form__enter__cover">
            <div className="signin__form__enter__cover__name">Tài khoản</div>
            <input
              ref={email}
              className="signin__form__enter__input"
              placeholder="Username"
            />
          </div>
          <div className="signin__form__enter__cover">
            <div className="signin__form__enter__cover__name">Mật khẩu</div>
            <input
              ref={pass}
              type="password"
              className="signin__form__enter__input"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="signin__form__btnsCover">
          <NavLink
            onClick={() => handleSignin()}
            className="signin__form__btnsCover__btn DN"
          >
            Đăng nhập
          </NavLink>
          <NavLink to={"/signup"} className="signin__form__btnsCover__btn DK">
            Đăng ký
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
