import React, { useState } from 'react';
import AddNewVenueForm from './AddNewVenueForm';
import VenueList from './VenueList';

function VenueManagement() {
  const [venues, setVenues] = useState([]);

  const handleNewVenue = (venue) => setVenues([...venues, venue]);

  return (
    <div>
      <h1>Venue Management</h1>
      <AddNewVenueForm onNewVenue={handleNewVenue} />
      <VenueList venues={venues} />
    </div>
  );
}

export default VenueManagement;
