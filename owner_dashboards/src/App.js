import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import OwnerHomepage from './OwnerHomepage';
import VenueManagement from './VenueManagement';
import ActivityManagement from './ActivityManagement';
import UserManagement from './UserManagement';
import EditProfile from './EditProfile';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('homepage');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    mobileNumber: '1234567890',
    password: 'password123',
    location: 'New York, NY',
    photo: 'https://via.placeholder.com/150'
  });

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  let content;

  switch (activeSection) {
    case 'venues':
      content = <VenueManagement />;
      break;
    case 'activities':
      content = <ActivityManagement />;
      break;
    case 'users':
      content = <UserManagement />;
      break;
    default:
      content = <OwnerHomepage owner={{ name: 'John Doe', email: 'john.doe@example.com', venues: [], activities: [], previousVenues: [], previousActivities: [] }} />;
  }

  return (
    <div className="App">
      <Header onSectionClick={handleSectionClick} user={user} onEditProfileClick={handleEditProfileClick} />
      {content}
      <Footer />
      {isEditProfileOpen && <EditProfile user={user} onClose={handleEditProfileClose} />}
    </div>
  );
}

export default App;
