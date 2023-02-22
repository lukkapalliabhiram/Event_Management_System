import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import OwnerHomepage from './OwnerHomepage';
import VenueManagement from './VenueManagement';
import ActivityManagement from './ActivityManagement';
import UserManagement from './UserManagement';
import './App.css';


function App() {
  const [activeSection, setActiveSection] = useState('homepage');

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
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
      <Header onSectionClick={handleSectionClick} />
      {content}
      <Footer />
    </div>
  );
}

export default App;
