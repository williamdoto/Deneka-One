import React, { useState } from 'react';
import './TopBar.css';
import { UserOutlined, BellOutlined, BulbOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Input } from 'antd';
import logo from '../../assets/media/Deneka-One.png'; // Importing the logo
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, toggleNotificationVisible } from '../../redux/slices/uiSlice';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { isDarkMode } = useSelector((state) => state.ui);
  const [searchInput, setSearchInput] = useState('');

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const toggleNotificationBar = () => {
    dispatch(toggleNotificationVisible());
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search:', searchInput);
  };

  const handleLogout = () => {
    // Clear the JWT token and any other relevant data
    localStorage.removeItem('jwtToken');
    // Navigate to the signin page
    navigate('/signin');
  };

  const items = [
    {
      label: <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">My Profile</a>,
      key: '0',
    },
    {
      label: <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">Settings</a>,
      key: '1',
    },
    { type: 'divider' },
    { label: 'Log Out', key: '3', onClick: handleLogout },
  ];

  return (
    <div className={`topbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Link to="/dashboard"><img src={logo} alt="Deneka One Logo" className="topbar-logo" /></Link>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h5>Deneka One</h5>
      </Link>
      <div className="search-bar">
        <Input 
          placeholder="Search..." 
          value={searchInput}
          onChange={handleSearchInputChange}
          onPressEnter={handleSearch}
          suffix={<SearchOutlined onClick={handleSearch} />}
          style={{ width: '30vw' }}
        />
      </div>
      <div className="icon-group">
        <button className={`icon-button power-btn ${isDarkMode ? 'icon-button-dark' : ''}`} onClick={handleToggleDarkMode}>
          <BulbOutlined style={{ color: isDarkMode ? 'yellow' : 'gray' }} />
        </button>

          <button className={`icon-button power-btn ${isDarkMode ? 'icon-button-dark' : ''}`} onClick={toggleNotificationBar}>
            <BellOutlined />
          </button>

        <Dropdown menu={{ items }}>
          <button className={`icon-button profile-btn ${isDarkMode ? 'icon-button-dark' : ''}`}>
            <UserOutlined />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopBar;
