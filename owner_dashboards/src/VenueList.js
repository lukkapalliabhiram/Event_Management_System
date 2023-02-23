import React from 'react';
import VenueCard from './VenueCard';

function VenueList({ venues }) {
  return (
    <div>
      {venues.map((venue) => (
        <VenueCard key={venue.id} {...venue} />
      ))}
    </div>
  );
}

export default VenueList;
