import React, { useEffect } from "react";
import { Statistic, Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "../style/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
import ProductMeasurements from "../components/dashboardComponents/ProductMeasurements";
import ProductsDetails from "../components/dashboardComponents/ProductsDetails";

function Dashboard() {
  const { Countdown } = Statistic;
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

  function onFinish() {
    console.log("finished!");
  }

  function onChange(val) {
    if (4.95 * 1000 < val && val < 5 * 1000) {
      console.log("changed!");
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <ProductMeasurements />
      <ProductsDetails />
    </div>
  );
}

export default Dashboard;
