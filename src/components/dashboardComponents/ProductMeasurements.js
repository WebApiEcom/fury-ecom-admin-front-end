import React from "react";
import "../../style/ProductMeasurements.css";
import { useSelector } from "react-redux";
import { Row, Col, Typography, Skeleton } from "antd";

const { Text } = Typography;

function ProductMeasurements() {
  // ACCESS THE ISLOADING VALUE FROM STATE FOR SET SKELITON
  const { isLoading } = useSelector((state) => state.product);

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
                  <p className="popins pm-item-circle-count">5</p>
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
