
import React, { useState, useEffect } from "react";
import "../style/ProductsDetails.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Axious from 'axios';
import { Table, Row, Typography, Button, Skeleton } from "antd";
const { Text } = Typography;


function ViewOrders() {
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {

        Axious.get("http://localhost:4000/orders/").then((response) => {
            setOrdersList(response.data);
        });

    }, []);

    const columns = [
        {
            title: "Order ID",
            dataIndex: "_id",
            render: (text) => {
                return (
                    <Text type="primary" className="popins product-details-table-text">
                        {text}
                    </Text>
                )
            }
        },
        {
            title: "User Id",
            dataIndex: "user_id",
            render: (text) => {
                return (
                    <Text type="primary" className="popins product-details-table-text">
                        {text}
                    </Text>
                );
            },

        },
        {
            title: "Items",
            dataIndex: "items",

            render: (ItemsArray) => {
                return (
                    ItemsArray.map(item => <Text type="primary" className="popins product-details-table-text">
                        {item.item_name} × {item.qty}<br /> </Text >)

                )
            },
        },
        {
            title: "Total",
            dataIndex: "total",
            render: (text) => {
                return (
                    <Text type="primary" className="popins product-details-table-text">
                        {text}
                    </Text>
                );
            },
        },
        {
            title: "Payment Type",
            dataIndex: "payment_type",
            render: (text) => {
                return (
                    <Text type="primary" className="popins product-details-table-text">
                        {text}
                    </Text>
                );
            },
        },
        {
            title: "Expand",
            dataIndex: "_id",
            rowKey: "view",
            render: (orderID) => (
                <div>
                    <Link to={`/view_order/${orderID}`}>
                        <EditOutlined className="product-details-table-update" />
                    </Link>
                </div>
            ),
        }
    ];
    return (<div className="products-details-container">
        <Row className="products-details-container-header">
            <h1 className="popins products-details-title">Orders</h1>
        </Row>
        <Table
            className="products-details-table"
            columns={columns}
            dataSource={ordersList}
        />
    </div>);
}

export default ViewOrders;