import React, { useState } from 'react';

function Header({ onSectionClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    // Handle logout logic
  };

  return (
    <header className="header">
      <div className="logo">Event Management System</div>
      <div className="nav">
        <ul>
          <li>
            <button onClick={() => onSectionClick('homepage')}>Home</button>
          </li>
          <li>
            <button onClick={() => onSectionClick('venues')}>
              Venue Management
            </button>
          </li>
          <li>
            <button onClick={() => onSectionClick('activities')}>
              Activity Management
            </button>
          </li>
          <li>
            <button onClick={() => onSectionClick('users')}>
              User Management
            </button>
          </li>
        </ul>
      </div>
      <div className="profile">
        <button className="profile-button" onClick={handleProfileClick}>
          My Profile
        </button>
        {isDropdownOpen && (
          <div className="dropdown">
            <button onClick={handleLogoutClick}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
