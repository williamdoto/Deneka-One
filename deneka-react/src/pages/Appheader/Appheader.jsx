import { Button, Space } from "antd";
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import './AppHeader.css'; // Importing CSS for styling
import logo from './Deneka-One.png'; // Import the logo


const AppHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };

  return (
    <Space className="header_space">
      <Button className="header_space_brand" href="/" type="link">
        <img src={logo} alt="Deneka-One Logo" className="logo" /> {/* Included the logo */}
      </Button>
      <Space className="auth_buttons">
        {user ? (
          <>
            <Button className="auth_button_login" href="/profile" type="link">
              {user.username}
            </Button>
            <Button className="auth_button_signUp" type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button className="auth_button_login" href="/signin" type="link">
              Login
            </Button>
            <Button className="auth_button_signUp" href="/signup" type="primary">
              Sign Up
            </Button>
          </>
        )}
      </Space>
    </Space>
  );
};

export default AppHeader;
