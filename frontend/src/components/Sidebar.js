import React, { useEffect, useState } from "react";
import "../scss/components.scss";
import axios from "axios";

function Sidebar({ getID }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/api/category")
      .then((res) => {
        setRecords(res.data.categories);
        console.log(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sidebar">
      {records.map((lv1) => (
        <div className="sidebar__level1">
          {lv1.categoryName}
          {lv1.children.map((lv2) => (
            <div className="sidebar__level2">
              {lv2.categoryName}
              {lv2.children.map((lv3) => (
                <div onClick={() => getID(lv3.id)} className="sidebar__level3">
                  {lv3.categoryName}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
