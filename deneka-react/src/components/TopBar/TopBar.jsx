import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';
import { UserOutlined, BellOutlined, BulbOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Input } from 'antd';
import logo from '../../assets/media/Deneka-One.png'; // Importing the logo

const  TopBar = ({ isDarkMode, toggleDarkMode, toggleNotificationBar }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search
  const handleSearch = () => {
    console.log('Search:', searchInput);
    // Implement search functionality here
  };

  const handleLogout = () => {
    // Clear the JWT token
    localStorage.removeItem('jwtToken'); // or clear cookies if you're using cookies

    // Redirect to the login page
    navigate('/signin');
  };

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
      onClick: handleLogout, 
    },
  ];

  return (
    <div className={`topbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <img src={logo} alt="Deneka One Logo" className="topbar-logo" />
      <h5>Deneka One</h5>
      <div className="search-bar"> {/* Add search bar container */}
        <Input 
          placeholder="Search..." 
          value={searchInput}
          onChange={handleSearchInputChange}
          onPressEnter={handleSearch} // Trigger search on Enter
          suffix={<SearchOutlined onClick={handleSearch} />} // Search icon
          style={{ width: '30vw' }} // Adjust width as needed
        />
      </div>
      <div className="icon-group">
        <button 
            className={`icon-button power-btn ${isDarkMode ? 'icon-button-dark' : ''}`} 
            onClick={toggleDarkMode}
        >
          <BulbOutlined style={{ color: isDarkMode ? 'yellow' : 'gray' }} />
        </button>
        <Dropdown menu={{ items }}>
        <button 
            className={`icon-button power-btn ${isDarkMode ? 'icon-button-dark' : ''}`}
            onClick={toggleNotificationBar}  // Attach the toggleNotificationBar function to onClick
        >
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
