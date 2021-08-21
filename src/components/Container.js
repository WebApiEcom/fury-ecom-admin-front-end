import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "../style/Sidebar.css";
import { Layout, Menu, Modal, Typography } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import AuthRoutes from "../routes/AuthRoutes";
import { useDispatch, useSelector } from "react-redux";
import { logoutModelVisibility } from "../redux/popupSlice";
import BreadCrumb from "./BreadCrumb";
const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

function Container() {
  // Redux access and locaions
  const dispatch = useDispatch();
  const { logoutModelVisibale } = useSelector((state) => state.popup);

  // Local states
  const [islogout, setlogout] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Toggle for sidebar
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // Signout model will visible from here
  const signOut = () => {
    dispatch(logoutModelVisibility({ modelValue: true }));
  };

  // Sign out
  const handleOk = () => {
    dispatch(logoutModelVisibility({ modelValue: false }));
    localStorage.removeItem("token");
    setlogout(true);
  };

  // Cancel sign out model
  const handleCancel = () => {
    dispatch(logoutModelVisibility({ modelValue: false }));
  };

  if (islogout) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<RiseOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<LogoutOutlined />}
              href="#"
              onClick={signOut}
            >
              Sign out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ backgroundColor: "#ececec" }}>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <div
            style={{
              backgroundColor: "transparent",
              marginLeft: "16px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <BreadCrumb />
          </div>
          <Content
            className="site-layout-background"
            style={{
              marginRight: "16px",
              marginLeft: "16px",
              marginBottom: "16px",
              padding: 24,
              minHeight: 280,
              backgroundColor: "#FFFFFF",
            }}
          >
            <AuthRoutes />
          </Content>
          <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
            <Text strong> FURY-E-COM ©2021 Created by Team Fury 🚀🔥</Text>
          </Footer>
        </Layout>
      </Layout>

      {/* LOGOUT MODEL */}
      <Modal
        title="Sign out"
        visible={logoutModelVisibale}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        className="rubik-p"
      >
        <p className="popins">Do you want to leave the site?</p>
      </Modal>
    </div>
  );
}

export default withRouter(Container);
