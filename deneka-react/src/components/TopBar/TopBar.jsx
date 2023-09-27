import React, { useState } from 'react';
import './TopBar.css';
import { UserOutlined, BellOutlined, BulbOutlined } from '@ant-design/icons';
import { Dropdown, Space, theme, Button } from 'antd';
import logo from '../../assets/media/Deneka-One.png'; // Importing the logo

const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
       My Profile
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Settings
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Log Out',
    key: '3',
    disabled: true,
  },
];

const TopBar = ({ isDarkMode, toggleDarkMode }) => {
    const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <div className={`topbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <img src={logo} alt="Deneka One Logo" className="topbar-logo" />
      <h4>Deneka One</h4>
      <div className="icon-group">

      <button 
            className={`icon-button power-btn ${isDarkMode ? 'icon-button-dark' : ''}`} 
            onClick={toggleDarkMode}
          >
            <BulbOutlined style={{ color: isDarkMode ? 'yellow' : 'gray' }} />
          </button>
        <Dropdown menu={{ items }}>
          <button className={`icon-button power-btn ${isDarkMode ? 'icon-button-dark' : ''}`}>
            <BellOutlined />
          </button>
        </Dropdown>
        <Dropdown menu={{ items }}>
        <button className={`icon-button profile-btn ${isDarkMode ? 'icon-button-dark' : ''}`}>
            <UserOutlined />
          </button>
        </Dropdown>

      </div>
    </div>
  );
}

export default TopBar;
