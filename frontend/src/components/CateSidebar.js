import React from "react";

const CateSidebar = (props) => {
  return (
    <div className="cate-sidebar-container">
      <div className="cate-sidebar-content">{props.children}</div>
    </div>
  );
};

export default CateSidebar;
