import { useState } from "react";
import "./header.css";
import EveSearch from "./event_search";
import FilterSearch from "./Filter_Search";
import EditProfile from "./EditProfile";


const ProfileButton = ({ user, onEditProfileClick, onLogoutClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditProfileClick = () => {
    setIsDropdownOpen(false);
    onEditProfileClick();
  };

  return (
    <div className="profile-button">
      <button onClick={handleDropdownOpen}>Profile</button>
      {isDropdownOpen && (
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
          <button className="logout" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default function Header({user}) {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleSearchClick = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };

  const handleEditProfileClose = () => {
    setShowEditProfile(false);
  };

  const handleLogoutClick = () => {
    // Handle logout logic
  };

  return (
    <div className="header">
      <header>
        <div className="logo">
          <img src="https://via.placeholder.com/50" alt="Logo" />
          <h1>Event Management System</h1>
        </div>
        <nav>
          <ul>
            <li>
              <button className="SearchButton" href="#">
                Home
              </button>
            </li>
            <li>
              <button className="SearchButton" onClick={handleSearchClick}>
                Search Events
              </button>
              {showSearchBox && <FilterSearch />}
            </li>
            <li>
              <button className="SearchButton" href="#">
                My Reservations
</button>
</li>
<li>
<ProfileButton
             user={user}
             onEditProfileClick={handleEditProfileClick}
             onLogoutClick={handleLogoutClick}
           />
</li>
</ul>
</nav>
</header>
<main>
{showEditProfile && (
<EditProfile
user={user}
onSave={() => console.log("Profile saved!")}
onClose={handleEditProfileClose}
/>
)}
{/* Your main content here */}
</main>
<footer>
<p>© 2023 Event Management System</p>
</footer>
</div>
);
}
