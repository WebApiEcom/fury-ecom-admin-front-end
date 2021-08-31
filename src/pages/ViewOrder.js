import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axious from 'axios';
import "../style/ViewOrder.css";

import {
    Row,
    Col,
    Typography,
    Button,
    Divider,
    Input,
    Select,
    InputNumber,
    Checkbox,
    Progress,
    Alert,
    Result,
    Skeleton,
    Table,
} from "antd";
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;





function ViewOrder() {

    const [_id, set_id] = useState("");
    const [user_id, setUserID] = useState("");
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [payment_type, setPaymentType] = useState("");
    const [created_date, setCreatedDate] = useState("");


    const { id } = useParams();


    useEffect(() => {

        Axious.get(`http://localhost:4000/fury/orders/${id}`).then((res) => {
            set_id(res.data._id);
            setUserID(res.data.user_id);
            setTotal(res.data.total);
            setItems(res.data.items);
            setPaymentType(res.data.payment_type);
            setCreatedDate(res.data.created_date);
        });



    })

    const columns = [
        {
            title: "",
            dataIndex: "img_url",
            rowKey: "img",
            width: "7%",
            render: (url) => (
                <div>
                    <img className="view-order-table-avatar" src={url} />
                </div>
            ),
        },
        {
            title: "Item",
            dataIndex: "item_name",
            render: (text) => {
                return (
                    <Text type="primary" className="popins product-details-table-text">
                        {text}
                    </Text>
                );
            },
        },
        {
            title: "Quantity",
            dataIndex: "qty",
            render: (text) => {
                return (
                    <Text type="primary" className="popins product-details-table-text">
                        {text}
                    </Text>
                );
            },
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (text) => {
                return (
                    <Text type="primary" className="popins product-details-table-text">
                        {text}
                    </Text>
                );
            },
        }
    ]

    return (<div>
        <Row>
            <Text className="popins add-product-title">Order {_id}</Text>
            <Divider />
        </Row>
        <div>
            <Row>
                <Text className="view-order-lable">User Id</Text>&nbsp;&nbsp;
                <Text className="view-order-value">{user_id}</Text>
            </Row>
            <Divider />
            <Table columns={columns}
                dataSource={items}
            />
            <Row>
                <Col xl={6} xxl={5} className="add-product-field">

                </Col>
                <Col xl={6} xxl={5} className="add-product-field">

                </Col>
                <Col xl={6} xxl={5} className="add-product-field">

                </Col>
                <Col xl={6} xxl={5} className="view-order-table-coloumn">
                    <Text className="view-order-lable-large-wide">Total LKR. {total}</Text>
                </Col>
            </Row>


        </div>
    </div>


    )
}

export default ViewOrder;