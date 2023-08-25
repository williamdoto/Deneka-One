import React, { useState } from "react";
import { Button, Space } from "antd";
import { CgWebsite } from "react-icons/cg"; // Import other icons
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai"; // Import plus and close icons
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import './AppHeader.css';
import logo from './Deneka-One.png';

const AppHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };

  return (
    <div className={`header_space ${isExpanded ? 'expanded' : ''}`}>
      <div className="navbar">
        {isExpanded ? (
          <AiOutlineClose className="expand_button" onClick={() => setIsExpanded(!isExpanded)} />
        ) : (
          <AiOutlinePlus className="expand_button" onClick={() => setIsExpanded(!isExpanded)} />
        )}
        <div className="navbar_item">
          <CgWebsite className="navbar_icon" />
          {isExpanded && <span className="navbar_text">Website</span>}
        </div>
        {/* Repeat the same pattern for other items */}
      </div>
      <Button className="header_space_brand" href="/" type="link">
        <img src={logo} alt="Deneka-One Logo" className="logo" />
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
    </div>
  );
};

export default AppHeader;
