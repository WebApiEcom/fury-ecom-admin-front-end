import React, { useEffect } from "react";
import "../../style/ProductsDetails.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Typography, Button, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Text } = Typography;

function ProductsDetails() {
  // VARIABLES
  const dispatch = useDispatch();
  const history = useHistory();

  // LOCAL STATES
  const { isLoading, products } = useSelector((state) => state.product);

  // INITIAL API CALL FOR GER PRODUCTS
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // COLUMNS FOR TABLE
  const columns = [
    {
      title: "",
      dataIndex: "img",
      rowKey: "view",
      width: "7%",
      render: (url) => (
        <div>
          <img className="product-details-table-avatar" src={url} />
        </div>
      ),
    },
    {
      title: "PRODUCT",
      dataIndex: "productName",
      render: (text) => {
        return (
          <Text type="primary" className="popins product-details-table-text">
            {text}
          </Text>
        );
      },
    },
    {
      title: "TYPE",
      dataIndex: "type",
      render: (text) => {
        return (
          <Text type="primary" className="popins product-details-table-text">
            {text}
          </Text>
        );
      },
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      render: (text) => {
        return (
          <Text type="primary" className="popins product-details-table-text">
            {text}
          </Text>
        );
      },
    },
    {
      title: "PRICE",
      dataIndex: "price",
      render: (text) => {
        return (
          <Text type="primary" className="popins product-details-table-text">
            {text}
          </Text>
        );
      },
    },
    {
      title: "DISCOUNT",
      dataIndex: "discount",
      render: (text) => {
        return (
          <Text type="primary" className="popins product-details-table-text">
            {text} %
          </Text>
        );
      },
    },
    {
      title: "",
      dataIndex: "view",
      rowKey: "view",
      render: (text, path) => (
        <div>
          <Link to={`/update/${path.id}`}>
            <EditOutlined className="product-details-table-update" />
          </Link>
        </div>
      ),
    },

    {
      title: "",
      dataIndex: "dview",
      rowKey: "dview",
      render: (text, path) => (
        <div>
          <DeleteOutlined className="product-details-table-delete" />
        </div>
      ),
    },
  ];

  // SET UP THE DATA FOR TABLE
  const productList = [];
  products.map((product) => {
    productList.push({
      id: product._id,
      productName: product.name,
      type: product.category,
      quantity: product.qty,
      price: product.prices.price,
      discount: product.prices.discount,
      img: product.imgUrl,
    });
    return productList;
  });

  return (
    <div className="products-details-container">
      <Row className="products-details-container-header">
        <h1 className="popins products-details-title">Products</h1>
        <Skeleton loading={isLoading}>
          <Button
            icon={<PlusOutlined />}
            className="popins products-details-add-btn"
            onClick={() => history.push("/add-product")}
          >
            Add product
          </Button>
        </Skeleton>
      </Row>
      <Table
        className="products-details-table"
        loading={isLoading}
        columns={columns}
        dataSource={productList}
      />
    </div>
  );
}

export default ProductsDetails;
