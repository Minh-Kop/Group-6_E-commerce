import React from "react";
import "../scss/components.scss";
import { NavLink } from "react-router-dom";

const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <header class="header"></header>

      <div className="popup__inner">
        <div className="title">{props.title}</div>
        <div className="content">{props.content}</div>
        <NavLink to={props.link}>
          <button className="comfirmBtn">Xác nhận</button>
        </NavLink>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
