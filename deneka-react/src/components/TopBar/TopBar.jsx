import React, { useState } from 'react';
import './TopBar.css';
import { UserOutlined, BellOutlined, BulbOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Input } from 'antd';
import logo from '../../assets/media/Deneka-One.png'; // Importing the logo
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, toggleNotificationVisible } from '../../redux/slices/uiSlice';
import { signOut } from '../../redux/slices/authSlice'; // Adjust the path as necessary
import { Link, useNavigate } from 'react-router-dom';

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state) => state.ui);
  const userId = useSelector((state) => state.auth.user?.id);
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
    console.log('Logout clicked', userId);
    if (userId) {
      dispatch(signOut(userId))
        .unwrap()
        .then(() => {
          console.log('Logout successful');
          localStorage.removeItem('jwtToken'); // Clear JWT token
          navigate('/signin'); // Navigate to the signin page
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    }
  };

  // Menu item click handler
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
    }
    // Handle other menu items here if needed
  };

  // Define the dropdown menu
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
          My Profile
        </a>
      </Menu.Item>
      <Menu.Item key="settings" icon={<BulbOutlined />}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Settings
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<UserOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );

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
