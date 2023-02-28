import React from "react";

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <div className="event" key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>
            <strong>Date:</strong> {event.date}, {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Sport:</strong> {event.sport}
          </p>
          <p>
            <strong>Cost:</strong> {event.cost}
          </p>
          <p>
            <strong>Age Range:</strong> {event.ageRange}
          </p>
          <p>
            <strong>Skill Level:</strong> {event.skillLevel}
          </p>
          <p>
            <strong>Gender:</strong> {event.gender}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
