import React, { useState } from "react";
import "../style/SignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { signInDrawerVisibility } from "../redux/popupSlice";
import { setEmail, setPassword, setCPassword } from "../redux/signUpSlice";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
} from "antd";
import { useEffect } from "react";
const { Title, Text } = Typography;

function SignUp(props) {
  // States for email and password
  // const [email, ssetEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [confirmPassword, setConfirmPassword] = useState(null);

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.signin);
  const { password } = useSelector((state) => state.signin);
  const { cpassword } = useSelector((state) => state.signin);

  // States for alert
  const [loginAlertVisibility, setLoginAlertVisibility] = useState("none");
  const [loginAlertMessage, setLoginAlertMessage] = useState(null);

  // Getting email
  const onEmailChange = (event) => {
    dispatch(setEmail({ email: event.target.value }));
  };

  // Getting password
  const onPasswordChange = (event) => {
    dispatch(setPassword({ password: event.target.value }));
  };

  // Getting confirm password
  const onConfirmPasswordChange = (event) => {
    dispatch(setCPassword({ cpassword: event.target.value }));
  };
  // Logging button click event
  const onSignUpClick = () => {
    dispatch(signInDrawerVisibility({ modelValue: false }));
    dispatch(setEmail({ email: "" }));
    dispatch(setPassword({ password: "" }));
    dispatch(setCPassword({ cpassword: "" }));
  };
  return (
    <div className="sign-up-container">
      <div className="sign-up-container-div">
        <h1 className="rubik lgoin-title" style={{ color: "#FFFFFF" }}>
          Sign up
        </h1>
        <p className="rubik-p lgoin-sub-title">
          Always on and durable, Secure from the start
        </p>
        <Form
          initialValues={{
            remember: true,
          }}
          className=""
        >
          <Form.Item>
            <Input
              className="rubik"
              size="large"
              value={email}
              onChange={onEmailChange}
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item>
            <Input.Password
              className="rubik"
              size="large"
              value={password}
              onChange={onPasswordChange}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Input.Password
              className="rubik"
              size="large"
              value={cpassword}
              onChange={onConfirmPasswordChange}
              placeholder="Confirm password"
            />
          </Form.Item>
          {/* 
          <div
            style={{
              display: { loginAlertVisibility },
            }}
          >
            <Alert
              className="login-alert"
              message="Success Text"
              type="error"
              showIcon
            />
          </div> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="rubik login-button"
              onClick={onSignUpClick}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
