import React, { useState } from 'react';
import EditProfile from './EditProfile';

function Header({ onSectionClick, user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
    setIsDropdownOpen(false);
  };

  const handleEditProfileClose = () => {
    setIsEditingProfile(false);
    setIsDropdownOpen(true);
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
        {isDropdownOpen && !isEditingProfile && (
          <div className="dropdown">
            <div className="profile-details">
              <div className="profile-detail">
                <label htmlFor="firstName">First Name:</label>
                <span id="firstName">{user.firstName}</span>
              </div>
              <div className="profile-detail">
                <label htmlFor="lastName">Last Name:</label>
                <span id="lastName">{user.lastName}</span>
              </div>
              <div className="profile-detail">
                <label htmlFor="username">Username:</label>
                <span id="username">{user.username}</span>
              </div>
              <div className="profile-detail">
                <label htmlFor="email">Email Address:</label>
                <span id="email">{user.email}</span>
              </div>
              <div className="profile-detail">
                <label htmlFor="password">Password:</label>
                <span id="password">*********</span>
              </div>
              <div className="profile-detail">
                <label htmlFor="mobileNumber">Mobile Number:</label>
                <span id="mobileNumber">{user.mobileNumber}</span>
              </div>
            </div>
            <button className="edit-profile" onClick={handleEditProfileClick}>
              Edit Profile
            </button>
            <button className="logout" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        )}
        {isEditingProfile && (
          <EditProfile user={user} onClose={handleEditProfileClose} />
        )}
      </div>
    </header>
  );
}

export default Header;
