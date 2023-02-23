import React, { useState } from 'react';

function AddNewActivityForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleTimeChange = (event) => setTime(event.target.value);
  const handleCapacityChange = (event) => setCapacity(event.target.value);

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
        Date:
        <input type="text" value={date} onChange={handleDateChange} />
      </label>
      <br />
      <label>
        Time:
        <input type="text" value={time} onChange={handleTimeChange} />
      </label>
      <br />
      <label>
        Capacity:
        <input type="number" value={capacity} onChange={handleCapacityChange} />
      </label>
      <br />
      <button type="submit">Add Activity</button>
    </form>
  );
}

function ActivityCard({ name, address, location, date, time, capacity, registrations }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Address: {address}</p>
      <p>Location: {location}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Capacity: {capacity}</p>
      <p>Registrations: {registrations.length}</p>
    </div>
  );
}

function ActivityList({ activities }) {
  return (
    <div>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} {...activity} />
        ))}
        </div>
        );
        }
        
        export default function ActivityManagement() {
        const [activities, setActivities] = useState([]);
        
        const handleNewActivity = (activity) => setActivities([...activities, activity]);
        
        return (
        <div>
        <AddNewActivityForm onNewActivity={handleNewActivity} />
        <ActivityList activities={activities} />
        </div>
        );
        }
