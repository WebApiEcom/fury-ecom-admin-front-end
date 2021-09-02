import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import "../style/UpdateProduct.css";
import firebase from "../firebase/firebase";
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
} from "antd";
import axios from "axios";
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function UpdateProduct() {
  // VARIABLES
  const history = useHistory();
  const { productId } = useParams();

  //  LOACAL STATES
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertMessageStatus, setAlertMessageStatus] = useState();
  const [submitdisable, setSubmitdisable] = useState(false);
  const [useSame, setUseSame] = useState(true);
  const [selectImage, setSelectImage] = useState(false);
  const [x, setX] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // LOCAL STATES FOR SPECIFIC PRODUCT
  const [productName, setProductName] = useState();
  const [productType, setProductType] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState();
  const [productQty, setProductQty] = useState();
  const [productIsActive, setProductIsActive] = useState();
  const [productWeight, setProductWeight] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productImage, setProductImage] = useState();

  // INITAL CALLS
  useEffect(() => {
    getProduct();
  }, []);

  // GET SPECIFIC PRODUCT
  const getProduct = async () => {
    axios
      .request({
        method: "get",
        url: `http://localhost:4000/fury/admin/products/${productId}`,
      })
      .then((response) => {
        setIsPageLoading(false);
        setProductName(response.data.name);
        setProductType(response.data.category);
        setProductPrice(
          response.data && response.data.prices
            ? response.data.prices.price
            : null
        );
        setProductDiscount(
          response.data && response.data.prices
            ? response.data.prices.discount
            : null
        );
        setProductQty(response.data.qty);
        setProductIsActive(response.data.isActive);
        setProductWeight(response.data.weight);
        setProductDescription(response.data.description);
        setProductImage(response.data.imgUrl);
      });
  };

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

  // WEIGHT
  const onWeight = (e) => {
    setProductWeight(e.target.value);
  };

  // DESCRIPTON
  const onDescription = (e) => {
    setProductDescription(e.target.value);
  };

  // ACTIVE PRODUCT
  const onActive = (e) => {
    setProductIsActive(e.target.checked);
  };

  // IMAGE SELECT FROM COMPUTER
  const onImageSelect = (e) => {
    if (e.target.files[0]) {
      setProductImage(null);
      setImage(e.target.files[0]);
      setX(URL.createObjectURL(e.target.files[0]));
    }
  };

  // IMAGE SELECTION ACTIVATOR
  const onChangeSelectImage = () => {
    setUseSame(!useSame);
    setSubmitdisable(!submitdisable);
    setSelectImage(true);
  };

  // IMAGE UPLOAD
  const handleUpload = () => {
    if (image == null && productImage == null) {
      setShowAlert(true);
      setAlertMessage("Please select a Image");
      setAlertMessageStatus("error");
    } else if (selectImage == true && image == null) {
      setSubmitdisable(false);
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
            setProductImage(url);
            setSubmitdisable(false);
          });
          document.getElementById("file").value = null;
        }
      );
    }
  };

  // UPADATE THE PRODUCT
  const updateProduct = async () => {
    await axios
      .put(`http://localhost:4000/fury/admin/products/${productId}`, {
        name: productName,
        qty: productQty,
        imgUrl: productImage,
        category: productType,
        isActive: productIsActive,
        prices: {
          price: productPrice,
          discount: productDiscount,
        },
        description: productDescription,
        weight: productWeight,
      })
      .then((res) => {
        setShowAlert(true);
        setAlertMessage(res.data.message);
        setAlertMessageStatus("success");
      })
      .catch((e) => {
        setShowAlert(true);
        setAlertMessage(e.response.data);
        setAlertMessageStatus("error");
      });
  };

  // REDIRECT TO DACHBOARD AFTER UPDATING
  const clearStateAndGo = () => {
    history.push("/");
  };

  return (
    <Skeleton loading={isPageLoading}>
      <div>
        {alertMessageStatus == "success" ? (
          <Result
            status="success"
            title={alertMessage}
            extra={
              <Button type="primary" key="console" onClick={clearStateAndGo}>
                Go To Dashboard
              </Button>
            }
          />
        ) : (
          <>
            <Row>
              <Text className="popins add-product-title">Update product</Text>
              <Divider />
            </Row>
            <div className="add-product-form">
              <Row>
                <Col xl={8} xxl={5} className="add-product-field">
                  <Text className="popins">Product name</Text>
                  <Input
                    className="add-product-input"
                    onChange={onName}
                    value={productName}
                  />
                </Col>
                <Col xl={8} xxl={5} className="add-product-field">
                  <Text className="popins">Type</Text>
                  <Select
                    className="add-product-input"
                    onChange={onType}
                    value={productType}
                  >
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
                    value={productPrice}
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
                    value={productDiscount}
                  />
                </Col>
              </Row>

              <Row className="add-product-secondrow">
                <Col xl={8} xxl={5} className="add-product-field">
                  <Text className="popins">Weight</Text>
                  <Input
                    className="add-product-input"
                    onChange={onWeight}
                    value={productWeight}
                  />
                </Col>
                <Col xl={8} xxl={5} className="add-product-field">
                  <Text className="popins">Description</Text>
                  <TextArea
                    rows={5}
                    className="add-product-input"
                    onChange={onDescription}
                    value={productDescription}
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
                    value={productQty}
                  />
                </Col>
                <Col xl={8} xxl={5} className="add-product-field-check">
                  <Checkbox
                    className="add-product-input"
                    onChange={onActive}
                    checked={productIsActive}
                  >
                    Active product
                  </Checkbox>
                </Col>
              </Row>

              <Row className="add-product-secondrow">
                <Col xl={8} xxl={5} className="add-product-fieldx">
                  {useSame ? (
                    <Button
                      block
                      type="primary"
                      className="update-product-upload"
                      onClick={onChangeSelectImage}
                    >
                      Select new Image
                    </Button>
                  ) : (
                    <div>
                      <Text className="popins">Upload image </Text>
                      <input
                        className="add-product-input-file"
                        type="file"
                        id="file"
                        onChange={onImageSelect}
                      />
                    </div>
                  )}
                </Col>

                <Col xl={8} xxl={5} className="add-product-fieldx">
                  <div className="add-product-image-section">
                    <img
                      src={productImage || x}
                      alt="Uploaded Images"
                      className="add-product-image"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="add-product-secondrow">
                <Col xl={16} xxl={10}>
                  {useSame ? null : (
                    <>
                      <Progress
                        className="add-product-progress"
                        percent={progress}
                      />
                      <Button
                        block
                        type="primary"
                        className="add-product-upload"
                        onClick={handleUpload}
                      >
                        Upload
                      </Button>
                    </>
                  )}

                  <Button
                    block
                    type="primary"
                    className="add-product-submit"
                    onClick={updateProduct}
                    disabled={submitdisable}
                  >
                    Update product
                  </Button>
                </Col>
              </Row>

              <Row className="add-product-secondrow">
                <Col xl={16} xxl={10}>
                  {showAlert ? (
                    <Alert
                      className="add-product-upload"
                      message={alertMessage}
                      type={alertMessageStatus}
                      showIcon
                    />
                  ) : null}
                </Col>
              </Row>
            </div>
          </>
        )}
      </div>
    </Skeleton>
  );
}

export default UpdateProduct;
