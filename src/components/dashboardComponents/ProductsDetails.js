import React, { useEffect, useState } from "react";
import "../../style/ProductsDetails.css";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Table, Row, Typography, Button, Skeleton, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Text } = Typography;

function ProductsDetails() {
  // VARIABLES
  const history = useHistory();

  // LOCAL STATES
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // STATES FOR DELETE MODEL
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  // MODEL SHOW OR NOT AND SET DELETE ITEM TO STATE
  const showModal = (id) => {
    setIsModalVisible(true);
    setDeleteItem(id);
  };

  // DELETE SPECIFIC PRODUCT
  const handleOk = async () => {
    await axios
      .request({
        method: "delete",
        url: `http://localhost:4000/fury/admin/products/${deleteItem}`,
      })
      .then(() => {
        let updatedProducts = products.filter(
          (product) => product._id !== deleteItem
        );
        setProducts(updatedProducts);
        setIsModalVisible(false);
        message.success(`Successfully removed  from your stock !`);
      });
  };

  // CANCEL DELETE MODEL
  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
        console.log(response.data);
      });
  };

  // INITIAL API CALL FOR GER PRODUCTS
  useEffect(() => {
    getProducts();
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
          <DeleteOutlined
            className="product-details-table-delete"
            onClick={() => {
              showModal(path.id);
            }}
          />
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

      <Modal
        title="Remove"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered="true"
      >
        <p>Do you really want to remove this product ?</p>
      </Modal>
    </div>
  );
}

export default ProductsDetails;
