import React from "react";
import "../style/NotFound.css";
import { Spin, Space } from "antd";

function NotFound() {
  return (
    <div className="not-fount-container">
      <Spin size="large" />
      <h1 className="not-fount-container-text rubik" style={{marginLeft:"25px"}}>Ops... Not found</h1>
    </div>
  );
}

export default NotFound;
