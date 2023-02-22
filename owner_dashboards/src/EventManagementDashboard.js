import React, { useState } from 'react';
import VenueManagement from './VenueManagement';
import ActivityManagement from './ActivityManagement';
import UserManagement from './UserManagement';

function EventManagementDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

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
      content = (
        <div>
          <h1>Event Management Dashboard</h1>
          <ul>
            <li>
              <button onClick={() => handleSectionClick('venues')}>
                Venue Management
              </button>
            </li>
            <li>
              <button onClick={() => handleSectionClick('activities')}>
                Activity Management
              </button>
            </li>
            <li>
              <button onClick={() => handleSectionClick('users')}>
                User Management
              </button>
            </li>
          </ul>
        </div>
      );
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default EventManagementDashboard;
