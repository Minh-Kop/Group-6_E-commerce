import React, { useEffect, useState } from "react";
import axios from "axios";
import "../scss/category.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CateSidebar from "../components/CateSidebar";

import { Outlet, NavLink, useParams } from "react-router-dom";
import config from "../config/config";

const client = axios.create({
  baseURL: config.SERVER_PATH,
});

function ProductsByCategories() {
  const [isSubcribe, setSub] = useState(false);
  const [books, setBooks] = useState([]);
  const [categoriesList, setCate] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    let isChange = false;
    if (!isChange) {
      client
        .get("api/books?categoryId=" + categoryId)
        .then((res) => {
          console.log(res.data.books);
          setBooks(res.data.books);
          console.log("stop changing");
          setSub(false);
        })
        .catch((err) => console.log(err));
    }

    client
      .get("api/category")
      .then((res) => {
        setCate(res.data.categories);
      })
      .catch((err) => console.log(err));

    return () => {
      isChange = true;
      console.log("is changing");
      setSub(true);
    };
  }, [categoryId]);

  return (
    <div className="category-container">
      <div className="category">
        <Navbar setRecords={setBooks} />
        <CateSidebar className="category__sidebar">
          {categoriesList.map((cate) => (
            <div className="category__main">
              <NavLink
                to={{ pathname: `/category/${cate.id}` }}
                onClick={() => setBooks([])}
              >
                {cate.categoryName}
              </NavLink>
              {cate.children.map((subCate) => (
                <div className="category__sub">
                  <NavLink
                    to={{ pathname: `/category/${subCate.id}` }}
                    onClick={() => setBooks([])}
                  >
                    {subCate.categoryName}
                  </NavLink>
                  {subCate.children.map((subSubCate) => (
                    <div className="category__sub__sub">
                      <NavLink
                        to={{ pathname: `/category/${subSubCate.id}` }}
                        onClick={() => setBooks([])}
                      >
                        {subSubCate.categoryName}
                      </NavLink>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </CateSidebar>
        <div className="category__cover">
          <div className="category__displayData">
            {!isSubcribe &&
              books.map((subitem) => (
                <div
                  key={subitem.bookId}
                  className="category__displayData__inf"
                >
                  <div className="category__displayData__cover">
                    <NavLink
                      to={{
                        pathname: `/home_page/${subitem.bookId}`,
                      }}
                      state={{ ID: `${subitem.bookId}` }}
                    >
                      <img
                        className="category__displayData__book"
                        src={subitem.image}
                        alt="book"
                      />
                    </NavLink>

                    <div className="category__displayData__book__inf">
                      <div className="category__displayData__book__inf__name">
                        {subitem.bookName}
                      </div>
                      <div className="category__displayData__book__inf__disprice__cover">
                        <div className="category__displayData__book__inf__disprice">
                          {subitem.discountedPrice}đ
                        </div>
                        <div className="category__displayData__book__inf__disprice__num">
                          {subitem.discountedNumber}%
                        </div>
                      </div>
                      <div className="category__displayData__book__inf__price">
                        {subitem.originalPrice}đ
                      </div>

                      <div className="category__displayData__book__inf__rate">
                        Đánh giá: {subitem.avgRating} /5.0
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Footer />
        <Outlet />
      </div>
    </div>
  );
}

export default ProductsByCategories;
