import React from 'react';
import './TopBar.css';
import { Bell, Person } from 'react-bootstrap-icons'; // You can use any icon library

const TopBar = () => {
  return (
    <div className="d-flex justify-content-between topbar">
      <h4>My App</h4>
      <div>
        <button className="icon-button notification-btn">
          <Bell size={24} /> 
        </button>
        <button className="icon-button profile-btn">
          <Person size={24} />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
