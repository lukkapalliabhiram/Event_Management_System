import React, { useState } from 'react';

function AddNewVenueForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleTimeSlotsChange = (event) => setTimeSlots(event.target.value.split(','));

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform the submit action using the form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={handleAddressChange} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={handleLocationChange} />
      </label>
      <br />
      <label>
        Time Slots (comma-separated list):
        <input type="text" value={timeSlots.join(',')} onChange={handleTimeSlotsChange} />
      </label>
      <br />
      <button type="submit">Add Venue</button>
    </form>
  );
}

export default AddNewVenueForm;
