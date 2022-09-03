import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const ApplicationMenu = ({ nav, applicationId }) => {
  const [currentNav, setCurrentNav] = useState(nav);

  const handleClick = (e) => {
    setCurrentNav(e.key);
  };
  return (
    <Menu
      style={StyleSheet.centerStyle}
      onClick={handleClick}
      selectedKeys={[currentNav]}
      mode="horizontal"
    >
      <Menu.Item key="preview">
        <Link to={`/preview/${applicationId}`}>Preview</Link>
      </Menu.Item>
      <Menu.Item key="status">
        <Link to={`/status/${applicationId}`}>Status</Link>
      </Menu.Item>
      {/* <Menu.Item key="payment">
        <Link to="/payment">Payment</Link>
      </Menu.Item> */}
      {/* <Menu.Item key="apply">
        <Link to="/new-application">New application</Link>
      </Menu.Item> */}
    </Menu>
  );
};

const StyleSheet = {
  centerStyle: {
    display: "flex",
    justifyContent: "center",
  },
};
export default ApplicationMenu;
