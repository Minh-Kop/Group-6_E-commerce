import React, { useState } from "react";
import "../scss/components.scss";

function Navbar() {
  let name = "Mike";
  const [openCategory, setOpenCategory] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const handleCategoryClick = () => setOpenCategory(!openCategory);

  const categoryList = ["Novel", "Comic", "Horror"];
  const subCategoryList = [
    ["1asdasdadddddddddddddddddsd", "2asdasd", "3asdasd"],
    ["4asdas", "5asdasd", "6asdasd"],
    ["7asdada", "8asdasda", "9"],
  ];

  function SubCategoryShow(index) {
    return (
      <>
        <ul className="navbar-sub-category">
          {subCategoryList[index].map((subC) => (
            <li>
              <a href="/">{subC}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }

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
          <div className="navbar-category-dropdown">
            <button type="button" onClick={handleCategoryClick}>
              Category
            </button>

            {openCategory && (
              <ul className="navbar-category">
                {categoryList.map((category, index) => (
                  <>
                    <li
                      onMouseOver={() => {
                        setSelectedIndex(index);
                      }}
                    >
                      <a href="/">{category}</a>
                    </li>
                    {selectedIndex === index && SubCategoryShow(index)}
                  </>
                ))}
              </ul>
            )}
          </div>
          <input></input>
          <button className="navbar-search-button" type="submit">
            <img src={require("../assets/search.png")} alt="Search" />
          </button>
        </form>

        <div className="navbar-item">
          <a className="navbar-cart" href="/">
            <img src={require("../assets/cart.png")} alt="Cart" />
          </a>
          <a className="navbar-user" href="/">
            {name}
          </a>
          <img src={require("../assets/user.png")} alt="UserIcon" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
