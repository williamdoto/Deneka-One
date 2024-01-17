import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Menu, Dropdown, Input } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import LightBulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { setSearchInput, toggleDarkMode } from '../../lib/redux/slices/topBarSlice';
import { logout } from '../../lib/redux/slices/authSlice'; // Assuming you have a logout action
import logo from '../../assets/media/Deneka-One.png';
import './TopBar.css';


const TopBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { searchInput, isDarkMode } = useSelector((state) => state.topBar);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSearchInputChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  const handleSearch = () => {
    console.log('Search:', searchInput);
    // Implement search functionality here
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/signin');
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
const iconColor = isDarkMode ? '#FFF' : '#333';
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

  if (!isAuthenticated) return null;
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
          <LightBulbIcon style={{ color: isDarkMode ? 'yellow' : 'gray' }} />

        </button>
        <Dropdown menu={{ items }}>
        <button 
            className={`icon-button power-btn ${isDarkMode ? 'icon-button-dark' : ''}`}
            onClick={toggleNotificationBar}  // Attach the toggleNotificationBar function to onClick
        >
            <NotificationsIcon />
          </button>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <button className={`icon-button profile-btn ${isDarkMode ? 'icon-button-dark' : ''}`}>
          <AccountCircleIcon />
          </button>
        </Dropdown>
      </div>
    </div>
  );
  
  
}

export default TopBar;
