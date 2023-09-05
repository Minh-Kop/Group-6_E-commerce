import { React, useState, useEffect } from "react";
import "../scss/homepage.scss";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

import { Outlet, NavLink } from "react-router-dom";

const HomePage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/api/books?page=1&limit=50")
      .then((res) => {
        setRecords(res.data.books);
        console.log(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div className="homepage__banner"></div>
      <Sidebar />
      <div className="homepage__cover">
        <div className="homepage__displayData">
          {records.map((subitem) => (
            <div key={subitem.bookId} className="homepage__displayData__inf">
              <div className="homepage__displayData__cover">
                <NavLink
                  to={{
                    pathname: `/home_page/${subitem.bookId}`,
                  }}
                  state={{ ID: `${subitem.bookId}` }}
                >
                  <img
                    className="homepage__displayData__book"
                    src={subitem.image}
                    alt="book"
                  />
                </NavLink>

                <div className="homepage__displayData__book__inf">
                  <div className="homepage__displayData__book__inf__name">
                    {subitem.bookName}
                  </div>
                  <div className="homepage__displayData__book__inf__disprice__cover">
                    <div className="homepage__displayData__book__inf__disprice">
                      {subitem.discountedPrice}đ
                    </div>
                    <div className="homepage__displayData__book__inf__disprice__num">
                      {subitem.discountedNumber}%
                    </div>
                  </div>
                  <div className="homepage__displayData__book__inf__price">
                    {subitem.originalPrice}đ
                  </div>

                  <div className="homepage__displayData__book__inf__rate">
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
  );
};

export default HomePage;
