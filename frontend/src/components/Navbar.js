import React, { useEffect, useState } from "react";
import "../scss/components.scss";
import CategoryPopUp from "./CategoryPopup";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";

import config from "../config/config";

const client = axios.create({
  baseURL: config.SERVER_PATH,
});

let categoriesList = [];

function Navbar({ setRecords }) {
  //category
  const [btnCategory, setBtnCategory] = useState(false);
  const [selectedSub, setSub] = useState(0);

  //user dropdown
  const [openUserItem, setUserItem] = useState(false);
  const handleUserHover = () => setUserItem(!openUserItem);

  //search
  const [searchInput, setSearchInput] = useState("");
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
  useEffect(() => {
    client.get("api/category").then((res) => {
      //console.log(res);
      if (res.data.status === "success") {
        categoriesList = res.data.categories;
        //console.log(categoriesList);
      }
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    //console.log(searchInput);
    try {
      const response = await client.get(`/api/search?keyword=${searchInput}`);
      const { status, length, books } = response.data;
      //console.log(books);

      if (status === "success") {
        setRecords(books);
      }
    } catch {
      console.log("error api search");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a className="navbar-logo" href="/home_page">
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
            onClick={() => {
              setBtnCategory(true);
            }}
          >
            Category
          </button>
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <button
            className="navbar-search-button"
            type="submit"
            onClick={(e) => handleSearch(e)}
          >
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
        {categoriesList.map((category) => (
          <div className="category">
            <NavLink
              to={{ pathname: `/category/${category.id}` }}
              onClick={() => setBtnCategory(false)}
            >
              {category.categoryName}
            </NavLink>
            <div className="sub-category-container">
              {category.children.map((subCate) => (
                <div className="sub-category">
                  <NavLink
                    className="sub-category-name"
                    to={{ pathname: `/category/${subCate.id}` }}
                    onMouseOver={() => {
                      setSub(subCate.id);
                    }}
                    onClick={() => setBtnCategory(false)}
                  >
                    {subCate.categoryName}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="sub-sub-category-container">
              {category.children.map((subCate) => (
                <div className="sub-sub-category-content">
                  {subCate.id === selectedSub &&
                    subCate.children.map((subSubCate) => (
                      <div className="sub-sub-category">
                        <NavLink
                          className="sub-sub-category-name"
                          to={{ pathname: `/category/${subSubCate.id}` }}
                          onClick={() => setBtnCategory(false)}
                        >
                          {subSubCate.categoryName}
                        </NavLink>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CategoryPopUp>
      <Outlet />
    </nav>
  );
}

export default Navbar;
