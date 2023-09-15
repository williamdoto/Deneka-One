import React from 'react';
import './TopBar.css';
import { UserOutlined, BellOutlined, BulbOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import logo from '../../assets/media/Deneka-One.png'; // Importing the logo

const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item（disabled）',
    key: '3',
    disabled: true,
  },
];

const TopBar = () => {
  return (
    <div className="topbar">
      <img src={logo} alt="Deneka One Logo" className="topbar-logo" />
      <h4>Deneka One</h4>
      <div className="icon-group">
      <Dropdown menu={{ items }}>
          <button className="icon-button power-btn">
          <BulbOutlined />
          </button>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <button className="icon-button notification-btn">
            <BellOutlined />
          </button>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <button className="icon-button profile-btn">
            <UserOutlined />
          </button>
        </Dropdown>

      </div>
    </div>
  );
}

export default TopBar;
