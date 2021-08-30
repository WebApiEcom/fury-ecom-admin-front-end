import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../style/Login.css";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Drawer,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signInDrawerVisibility } from "../redux/popupSlice";
import { clearEmailPassword } from "../redux/signUpSlice";
import SignUp from "./SignUp";
import { useSpring, animated, config } from "react-spring";
import axios from "axios";

const { Title, Text } = Typography;

function Login() {
  // State for auth between login and dashboard
  const [islogged, setLogged] = useState(false);

  // States for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // States for alert
  const [loginAlertVisibility, setLoginAlertVisibility] = useState("none");
  const [loginAlertMessage, setLoginAlertMessage] = useState(null);

  // Getting email
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Getting password
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Logging button click event
  const onLoginClick = (event) => {
    // localStorage.setItem("token", "T");
    // setLogged(true);
    // event.preventDefault();
    setLoading(true);
    setError("");
    axios
      .post("http://localhost:4000/fury/users/login", {
        email: email,
        password: password,
      })
      .then(
        (response) => {
          console.log(response);
          setLoading(false);
          localStorage.setItem("token", "T");
          setLogged(true);
          event.preventDefault();
          setError("");
        },
        (error) => {
          console.log(error.response.data);
          setError(error.response.data);
          setLoading(false);
        }
      );
    // setEmail(null);
    // setPassword(null);
  };

  const dispatch = useDispatch();
  const { signInDrawerVisibale } = useSelector((state) => state.popup);

  const onSignUp = () => {
    dispatch(signInDrawerVisibility({ modelValue: true }));
  };

  const onDrawerClose = () => {
    dispatch(signInDrawerVisibility({ modelValue: false }));
    dispatch(clearEmailPassword({ email: "", password: "", cpassword: "" }));
  };

  // Animation stuff
  const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 50,
    config: config.molasses,
    onRest: () => set(!flip),
  });

  // Render to dashboard when user authenticated
  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  // Render login page
  return (
    <div>
      <Row>
        <Col
          xs={4}
          sm={6}
          md={6}
          lg={8}
          xl={8}
          xxl={8}
          className="login-container"
          style={{ backgroundColor: "#fff" }}
        >
          <img
            src="/images/illustrations/illustration_register.png"
            alt="login"
          />
        </Col>
        <Col
          xs={22}
          sm={20}
          md={20}
          lg={16}
          xl={16}
          xxl={16}
          className="login-container"
          style={{ backgroundColor: "#fff", height: "100vh" }}
        >
          <Row className="login-header">
            <Col xs={22} md={11}></Col>
            <Col xs={22} md={11} className="login-header-col">
              <div className="login-header-text-wrapper">
                <p className="rubik login-dont-have-acc">
                  Don't have an account?
                </p>
                <p
                  className="rubik login-dont-sign-in-text"
                  onClick={onSignUp}
                >
                  Sign up
                </p>
              </div>
            </Col>
          </Row>

          <Row className="login-form-container">
            <Row className="login-form-row" justify="center">
              {/* <div className="login-form-div"> */}
              <div className="login-form-div">
                <animated.h1
                  style={props}
                  className="login-animation-hello rubik"
                >
                  Hello
                </animated.h1>
                <h1 className="rubik lgoin-title">Welcome to Fury</h1>
                {error == "" ? (
                  <p className="rubik lgoin-sub-title">
                    Make smarter business decisions, and connect
                    people anywhere.
                  </p>
                ) : (
                  <p className="rubik lgoin-sub-title-error">
                    {error}
                  </p>
                )}

                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  className="login-form"
                >
                  <Form.Item name="username">
                    <Input
                      className="rubik"
                      size="large"
                      value={email}
                      onChange={onEmailChange}
                      placeholder="Email address"
                    />
                  </Form.Item>

                  <Form.Item name="password">
                    <Input.Password
                      className="rubik"
                      size="large"
                      value={password}
                      onChange={onPasswordChange}
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="rubik">Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    {loading ? (
                      <h1 className="rubik lgoin-title">Loading</h1>
                    ) : (
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        className="rubik"
                        onClick={onLoginClick}
                        className="login-button"
                      >
                        Sign In
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </div>
            </Row>
          </Row>

          <Row className="login-header">
            <Col xs={24} md={12}></Col>
            <Col xs={24} md={12} className="login-header-col">
              <div></div>
            </Col>
          </Row>
        </Col>
        <Col
          xs={1}
          sm={2}
          md={2}
          lg={4}
          xl={4}
          xxl={4}
          style={{ backgroundColor: "#fff", height: "100vh" }}
        ></Col>
      </Row>

      {/* Drawer for sign in */}
      <Drawer
        width={480}
        onClose={onDrawerClose}
        visible={signInDrawerVisibale}
        bodyStyle={{ paddingBottom: 80, backgroundColor: "#001529" }}
        placement="left"
        maskClosable="false"
      >
        <div style={{ backgroundColor: "#001529" }}>
          <SignUp />
        </div>
      </Drawer>
    </div>
  );
}

export default Login;
