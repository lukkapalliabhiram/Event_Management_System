import React from 'react';

function VenueCard({ name, address, location, timeSlots }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Address: {address}</p>
      <p>Location: {location}</p>
      <p>Time Slots: {timeSlots.join(', ')}</p>
    </div>
  );
}

export default VenueCard;
