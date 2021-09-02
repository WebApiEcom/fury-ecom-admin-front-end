import React, { useState } from "react";
import "../style/AddProduct.css";
import axios from "axios";
import firebase from "../firebase/firebase";
import { useHistory } from "react-router";
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
} from "antd";
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function AddProduct() {
  // VARIABLES
  const history = useHistory();

  //  LOCAL STATES
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [dumy, setDumy] = useState("https://i.stack.imgur.com/y9DpT.jpg");
  const [productName, setProductName] = useState();
  const [productType, setProductType] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState();
  const [productQty, setProductQty] = useState();
  const [productIsActive, setProductIsActive] = useState(false);

  const [submitdisable, setSubmitdisable] = useState(true);
  const [productWeight, setProductWeight] = useState();
  const [productDescription, setProductDescription] = useState();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertSuccessResult, setAlertSuccessResult] = useState(false);
  const [alertSuccessResultMessage, setAlertSuccessResultMessage] = useState();

  // NAME
  const onName = (e) => {
    setProductName(e.target.value);
  };
  // TYPE
  const onType = (value) => {
    setProductType(value);
  };

  // PRICE
  const onPrice = (value) => {
    setProductPrice(value);
  };

  // DISCOUNT
  const onDiscount = (value) => {
    setProductDiscount(value);
  };

  // QUANTITY
  const onQty = (value) => {
    setProductQty(value);
  };

  // ACTIVE PRODUCT
  const onActive = (e) => {
    setProductIsActive(e.target.checked);
  };

  // WEIGHT
  const onWeight = (e) => {
    setProductWeight(e.target.value);
  };

  // DESCRIPTON
  const onDescription = (e) => {
    setProductDescription(e.target.value);
  };

  // IMAGE SELECTION
  const onImageSelect = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setDumy(URL.createObjectURL(e.target.files[0]));
    }
  };

  // UPLOAD IMAGE TO FIREBASE AND GET IMAGE URL
  const handleUpload = async () => {
    try {
      if (image == null) {
        setShowAlert(true);
        setAlertMessage("Please select a Image");
      } else {
        let file = image;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child("folder/" + file.name).put(file);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            var progress =
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            throw error;
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setDownloadURL(url);
              setSubmitdisable(false);
            });
            document.getElementById("file").value = null;
          }
        );
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // CREATE PRODUCT
  const onSubmit = async () => {
    await axios
      .post("http://localhost:4000/fury/admin/products", {
        name: productName,
        qty: productQty,
        imgUrl: downloadURL,
        category: productType,
        isActive: productIsActive,
        prices: {
          price: productPrice,
          discount: productDiscount,
        },
        description: productDescription,
        weight: productWeight,
      })
      .then((response) => {
        setAlertSuccessResult(true);
        setAlertSuccessResultMessage(response.data.message);
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertMessage(error.response.data);
      });
  };

  // CLEAR STATES AND NAVIGATE TO DASHBOARD
  const clearStateAndGo = () => {
    setProgress(0);
    setDownloadURL(null);
    setImage(null);
    setSubmitdisable(true);
    history.push("/");
  };

  return (
    <div>
      {alertSuccessResult ? (
        <Result
          status="success"
          title={alertSuccessResultMessage}
          extra={
            <Button type="primary" key="console" onClick={clearStateAndGo}>
              Go To Dashboard
            </Button>
          }
        />
      ) : (
        <>
          <Row>
            <Text className="popins add-product-title">Add product</Text>
            <Divider />
          </Row>
          <div className="add-product-form">
            <Row>
              <Col xl={8} xxl={5} className="add-product-field">
                <Text className="popins">Product name</Text>
                <Input className="add-product-input" onChange={onName} />
              </Col>
              <Col xl={8} xxl={5} className="add-product-field">
                <Text className="popins">Type</Text>
                <Select className="add-product-input" onChange={onType}>
                  <Option value="Celebration Cakes">Celebration Cakes</Option>
                  <Option value="Little Cupcakes">Little Cupcakes</Option>
                  <Option value="Fruit Desserts">Fruit Desserts</Option>
                </Select>
              </Col>
            </Row>

            <Row className="add-product-secondrow">
              <Col xl={8} xxl={5} className="add-product-field">
                <Text className="popins">Price (LKR)</Text>
                <InputNumber
                  className="add-product-input"
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={onPrice}
                />
              </Col>
              <Col xl={8} xxl={5} className="add-product-field">
                <Text className="popins">Discount</Text>
                <InputNumber
                  className="add-product-input"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={onDiscount}
                />
              </Col>
            </Row>

            <Row className="add-product-secondrow">
              <Col xl={8} xxl={5} className="add-product-field">
                <Text className="popins">Weight</Text>
                <Input className="add-product-input" onChange={onWeight} />
              </Col>
              <Col xl={8} xxl={5} className="add-product-field">
                <Text className="popins">Description</Text>
                <TextArea
                  rows={5}
                  className="add-product-input"
                  onChange={onDescription}
                />
              </Col>
            </Row>

            <Row className="add-product-secondrow">
              <Col xl={8} xxl={5} className="add-product-field">
                <Text className="popins">Quantity </Text>
                <InputNumber
                  min={1}
                  className="add-product-input"
                  onChange={onQty}
                />
              </Col>
              <Col xl={8} xxl={5} className="add-product-field-check">
                <Checkbox className="add-product-input" onChange={onActive}>
                  Active product
                </Checkbox>
              </Col>
            </Row>

            <Row className="add-product-secondrow">
              <Col xl={8} xxl={5} className="add-product-fieldx">
                <Text className="popins">Upload image </Text>
                <input
                  className="add-product-input-file"
                  type="file"
                  id="file"
                  onChange={onImageSelect}
                />
              </Col>

              <Col xl={8} xxl={5} className="add-product-fieldx">
                <div className="add-product-image-section">
                  <img
                    src={downloadURL || dumy || image}
                    alt="Uploaded Images"
                    className="add-product-image"
                  />
                </div>
              </Col>
            </Row>

            <Row className="add-product-secondrow">
              <Col xl={16} xxl={10}>
                <Progress className="add-product-progress" percent={progress} />

                <Button
                  block
                  type="primary"
                  className="add-product-upload"
                  onClick={handleUpload}
                >
                  Upload
                </Button>

                <Button
                  block
                  type="primary"
                  className="add-product-submit"
                  onClick={onSubmit}
                  disabled={submitdisable}
                >
                  Create product
                </Button>
              </Col>
            </Row>

            <Row className="add-product-secondrow">
              <Col xl={16} xxl={10}>
                {showAlert ? (
                  <Alert
                    className="add-product-upload"
                    message={alertMessage}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
}

export default AddProduct;
