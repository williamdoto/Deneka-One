import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import { Link } from 'react-router-dom';
import './css/style.css'; // Assuming you've copied all styles including the open/close sidebar styles into this file.

const AppHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to handle sidebar
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded); // Toggle sidebar
  };

  const handleLogout = () => {
    removeToken();
    navigate('/signin', { replace: true });
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav id="sidebar" className={isExpanded ? "active" : ""}>
      <ul class="list-unstyled components mb-5">
      <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={handleToggleSidebar}>
              <i className="fa fa-bars"></i>
              <span className="sr-only">Toggle Menu</span>
            </button>
          <li class="active">
            <a href="#"><span class="fa fa-home"></span> Home</a>
          </li>
          <li>
              <a href="#"><span class="fa fa-user"></span> About</a>
          </li>
          <li>
            <a href="#"><span class="fa fa-sticky-note"></span> Blog</a>
          </li>
          <li>
            <a href="#"><span class="fa fa-cogs"></span> Services</a>
          </li>
          <li>
            <a href="#"><span class="fa fa-paper-plane"></span> Contacts</a>
          </li>
        </ul>

        {/* ...same as before... */}
      </nav>
    </div>
  );
};

export default AppHeader;
