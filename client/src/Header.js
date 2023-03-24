import { useState, useEffect } from "react";
import "./header.css";
import EveSearch from "./event_search";
import axios from 'axios';


const ProfileButton = () => {
  const [userData, setUserData] = useState(null);
  const [isUserOpen, setIsUserOpen] = useState(false);

  useEffect(() => {
    axios.get('/')
      .then(response => setUserData(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleUserOpen = () => {
    setIsUserOpen(!isUserOpen);
  };

  return (
    <div className="profile-button">
      <button onClick={handleUserOpen}>Profile</button>
      {isUserOpen && (
        <div className="user-info">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="user-photo"
          />
          <div className="user-details">
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
            <p>New York, USA</p>
            <button className="logout-button">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Header() {
const [showSearchBox, setShowSearchBox] = useState(false);

const handleSearchClick = () => {
    setShowSearchBox(!showSearchBox);
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
              <button className="SearchButton" href="#">Home</button>
            </li>
            <li>
              <button className="SearchButton" onClick={handleSearchClick}>Search Events</button>
              {showSearchBox && (
                <EveSearch />
              )}
            </li>
            
            <li>
              <button className="SearchButton" href="#">My Reservations</button>
            </li>
            <li>
              <ProfileButton />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Your main content here */}
      </main>
      <footer>
        <p>© 2023 Event Management System</p>
      </footer>
    </div>
  );
}
