import React from 'react';

function OwnerHomepage({ owner }) {
  const { name, email, venues, activities, previousVenues, previousActivities } = owner;

  return (
    <div className="owner-homepage">
      <div className="owner-profile">
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
      <div className="owner-venues">
        <h3>Current Venues</h3>
        {venues.length === 0 ? (
          <p>No current venues.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sport</th>
                <th>Venue Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.sport}</td>
                  <td>{venue.name}</td>
                  <td>{venue.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="owner-activities">
        <h3>Current Activities</h3>
        {activities.length === 0 ? (
          <p>No current activities.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Age Range</th>
                <th>Cost</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                  <td>{activity.ageRange}</td>
                  <td>{activity.cost === 0 ? 'Free' : `$${activity.cost}`}</td>
                  <td>{activity.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="owner-previous-venues">
        <h3>Previous Venues</h3>
        {previousVenues.length === 0 ? (
          <p>No previous venues.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sport</th>
                <th>Venue Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {previousVenues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.sport}</td>
                  <td>{venue.name}</td>
                  <td>{venue.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="owner-previous-activities">
        <h3>Previous Activities</h3>
        {previousActivities.length === 0 ? (
          <p>No previous activities.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Age Range</th>
                <th>Cost</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {previousActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                  <td>{activity.ageRange}</td>
                  <td>{activity.cost === 0 ? 'Free' :`$${activity.cost}`}</td>
              <td>{activity.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>);
}


export default OwnerHomepage;
