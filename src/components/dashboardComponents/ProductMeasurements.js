import React, { useEffect, useState } from "react";
import "../../style/ProductMeasurements.css";
import axios from "axios";
import { Row, Col, Typography, Skeleton } from "antd";

const { Text } = Typography;

function ProductMeasurements() {
  // LOCAL STATES
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FUNCTION FOR GET ALL PRODUCTS
  const getProducts = async () => {
    await axios
      .request({
        method: "get",
        url: "http://localhost:4000/fury/admin/products",
      })
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  };

  // INITIAL API CALL FOR GER PRODUCTS
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="pm-container">
      <Row>
        <h1 className="popins overview-text">Overview</h1>
      </Row>
      <Row>
        <Col lg={8} xl={8} xxl={8} className="pm-item-container">
          <Skeleton loading={isLoading}>
            <div className="pm-item">
              <div className="pm-item-wrapper">
                <Text className="popins pm-item-label">Total Products</Text>
                <span class="pm-item-circle-1">
                  <p className="popins pm-item-circle-count">
                    {products.length}
                  </p>
                </span>
              </div>
            </div>
          </Skeleton>
        </Col>
        <Col lg={8} xl={8} xxl={8} className="pm-item-container-2">
          <Skeleton loading={isLoading}>
            <div className="pm-item">
              <div className="pm-item-wrapper">
                <Text className="popins pm-item-label">Total Orders</Text>
                <span class="pm-item-circle-2">
                  <p className="popins pm-item-circle-count">26</p>
                </span>
              </div>
            </div>
          </Skeleton>
        </Col>
        <Col lg={8} xl={8} xxl={8} className="pm-item-container-3">
          <Skeleton loading={isLoading}>
            <div className="pm-item">
              <div className="pm-item-wrapper">
                <Text className="popins pm-item-label">Total Items</Text>
                <span class="pm-item-circle-3">
                  <p className="popins pm-item-circle-count">100</p>
                </span>
              </div>
            </div>
          </Skeleton>
        </Col>
      </Row>
    </div>
  );
}

export default ProductMeasurements;
