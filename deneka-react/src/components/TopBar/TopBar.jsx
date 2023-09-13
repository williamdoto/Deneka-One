import React from 'react';
import './TopBar.css';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import logo from '../../assets/media/Deneka-One.png'; // Importing the logo


const TopBar = () => {
  return (
    <div className="topbar">
      <img src={logo} alt="Deneka One Logo" className="topbar-logo" />
      <h4>Deneka One</h4>
      <div className="icon-group">
        <button className="icon-button notification-btn">
          <BellOutlined />
        </button>
        <button className="icon-button profile-btn">
          <UserOutlined />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
