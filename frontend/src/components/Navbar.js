import React, { useState } from "react";
import "../scss/components.scss";
import CategoryPopUp from "./CategoryPopup";

function Navbar() {
  const [btnCategory, setBtnCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [openUserItem, setUserItem] = useState(false);
  const handleUserHover = () => setUserItem(!openUserItem);
  const userItem = [
    {
      name: "Thông tin cá nhân",
      path: "/user",
    },
    {
      name: "Theo dõi đơn hàng",
      path: "/order",
    },
    {
      name: "Lịch sử mua hàng",
      path: "/history",
    },

    {
      name: "Đăng xuất",
      path: "/",
    },
  ];

  //Test data\\
  let name = "Mike";
  const categoryList = ["Novel", "Comic", "Horror"];
  const subCategoryList = [
    ["1asdasdadddddddddddddddddsd", "2asdasd", "3asdasd"],
    ["4asdas", "5asdasd", "6asdasd"],
    ["7asdada", "8asdasda", "9"],
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a className="navbar-logo" href="/">
            <img
              style={{ marginRight: " 10px" }}
              src={require("../assets/logo.png")}
              alt="Logo"
            />
            Hachiko
          </a>
        </div>

        <form className="navbar-search">
          <button
            className="navbar-search-category"
            type="button"
            onClick={() => setBtnCategory(true)}
          >
            Category
          </button>
          <input></input>
          <button className="navbar-search-button" type="submit">
            <img src={require("../assets/search.png")} alt="Search" />
          </button>
        </form>

        <div className="navbar-item">
          <a className="navbar-cart" href="/cart">
            <img src={require("../assets/cart.png")} alt="Cart" />
          </a>
          <div className="navbar-user">
            <a
              className="navbar-user-name"
              href="/"
              onMouseOver={handleUserHover}
            >
              {name}
            </a>
            {openUserItem && (
              <ul className="navbar-user-items-dropdown">
                {userItem.map((item, index) => (
                  <li>
                    <a key={index} href={item.path}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <img src={require("../assets/user.png")} alt="UserIcon" />
          </div>
        </div>
      </div>

      <CategoryPopUp trigger={btnCategory} setTrigger={setBtnCategory}>
        <div className="main-category">
          {categoryList.map((category, index) => (
            <div onMouseOver={() => setSelectedCategory(index)}>
              <a href="/">{category}</a>
            </div>
          ))}
        </div>
        <div className="sub-category">
          {subCategoryList[selectedCategory].map((subCategory, subIndex) => (
            <div>
              <a href="/">{subCategory}</a>
            </div>
          ))}
        </div>
      </CategoryPopUp>
    </nav>
  );
}

export default Navbar;
