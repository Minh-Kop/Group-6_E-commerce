import { React, useEffect, useState } from "react";
import "../scss/admin.scss";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";

const customerList = [
  {
    id: 1,
    name: "asdasdasdAasdas",
    rank: "gold",
    coin: 100,
  },
  {
    id: 2,
    name: "A",
    rank: "silver",
    coin: 100,
  },
  {
    id: 3,
    name: "S",
    rank: "gold",
    coin: 100,
  },
  {
    id: 4,
    name: "K",
    rank: "gold",
    coin: 100,
  },
  {
    id: 5,
    name: "B",
    rank: "bronze",
    coin: 100,
  },
];

function AdminCustomerManagement() {
  const header = ["Tên khách hàng", "Cấp bậc", "Coin"];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/api/users?sortType=HPoint")
      .then((res) => {
        setRecords(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="customer-management-container">
      <AdminNavbar />
      <div className="customer-table">
        <div className="customer-name">
          <p className="header">{header[0]}</p>
          {records.map((c) => (
            <p className="data">{c.fullName}</p>
          ))}
        </div>
        <div className="customer-rank">
          <p className="header">{header[1]}</p>
          {customerList.map((c) => (
            <p className="data">{c.rank}</p>
          ))}
        </div>
        <div className="customer-coin">
          <p className="header">{header[2]}</p>
          {customerList.map((c) => (
            <p className="data">{c.coin}</p>
          ))}
        </div>
      </div>
      <button className="customer-coin-history" type="button">
        Lịch sử sử dụng coin
      </button>
    </div>
  );
}

export default AdminCustomerManagement;
