import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  getSpecificProduct,
  update_setProductName,
  update_setProductType,
  update_setProductPrice,
  update_setProductDiscount,
  update_setProductQty,
  update_setProductActive,
  update_setProductImageUrl,
  update_setProductDescription,
  update_setProductWeight,
} from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const { productId } = useParams();

  //  LOACAL STATES
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertMessageStatus, setAlertMessageStatus] = useState();
  const [submitdisable, setSubmitdisable] = useState(false);
  const [useSame, setUseSame] = useState(true);
  const [selectImage, setSelectImage] = useState(false);
  const [x, setX] = useState(null);

  const { isUpdateLoading, products, product } = useSelector(
    (state) => state.product
  );

  // INITAL CALLS
  useEffect(() => {
    dispatch(getSpecificProduct(productId));
  }, []);

  // ACTIVE PRODUCT
  const onName = (e) => {
    // setProductName(e.target.value);
    dispatch(update_setProductName(e.target.value));
  };
  // TYPE
  const onType = (value) => {
    // setProductType(value);
    dispatch(update_setProductType(value));
  };

  // PRICE
  const onPrice = (value) => {
    // setProductPrice(value);
    dispatch(update_setProductPrice(value));
  };

  // DISCOUNT
  const onDiscount = (value) => {
    // setProductDiscount(value);
    dispatch(update_setProductDiscount(value));
  };

  // QUANTITY
  const onQty = (value) => {
    // setProductQty(value);
    dispatch(update_setProductQty(value));
  };

  // WEIGHT
  const onWeight = (e) => {
    dispatch(update_setProductWeight(e.target.value));
  };

  // DESCRIPTON
  const onDescription = (e) => {
    dispatch(update_setProductDescription(e.target.value));
  };

  // ACTIVE PRODUCT
  const onActive = (e) => {
    dispatch(update_setProductActive(e.target.checked));
  };

  // IMAGE SELECT FROM COMPUTER
  const onImageSelect = (e) => {
    if (e.target.files[0]) {
      dispatch(update_setProductImageUrl(null));
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
    if (image == null && product.imgUrl == null) {
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
            dispatch(update_setProductImageUrl(url));
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
        name: product.name,
        qty: product.qty,
        imgUrl: product.imgUrl,
        category: product.category,
        isActive: product.isActive,
        prices: {
          price: product.prices.price,
          discount: product.prices.discount,
        },
        description: product.description,
        weight: product.weight,
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
    <Skeleton loading={isUpdateLoading}>
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
                    value={product.name}
                  />
                </Col>
                <Col xl={8} xxl={5} className="add-product-field">
                  <Text className="popins">Type</Text>
                  <Select
                    className="add-product-input"
                    onChange={onType}
                    value={product.category}
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
                    value={
                      product && product.prices ? product.prices.price : null
                    }
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
                    value={
                      product && product.prices ? product.prices.discount : null
                    }
                  />
                </Col>
              </Row>

              <Row className="add-product-secondrow">
                <Col xl={8} xxl={5} className="add-product-field">
                  <Text className="popins">Weight</Text>
                  <Input
                    className="add-product-input"
                    onChange={onWeight}
                    value={product.weight}
                  />
                </Col>
                <Col xl={8} xxl={5} className="add-product-field">
                  <Text className="popins">Description</Text>
                  <TextArea
                    rows={5}
                    className="add-product-input"
                    onChange={onDescription}
                    value={product.description}
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
                    value={product.qty}
                  />
                </Col>
                <Col xl={8} xxl={5} className="add-product-field-check">
                  <Checkbox
                    className="add-product-input"
                    onChange={onActive}
                    checked={product.isActive}
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
                      src={product.imgUrl || x}
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
                      {" "}
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
