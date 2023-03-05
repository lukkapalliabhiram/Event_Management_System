import { useState } from "react";

function Reservation(reservationsData) {
  const [ratings, setRatings] = useState({}); // Object to store ratings
  const [selectedReservation, setSelectedReservation] = useState(null);
  const reservations = reservationsData.reservations.map((reservation) => ({
    ...reservation,
    rating: ratings[reservation.id], // Add rating property from ratings object
    key: reservation.id, // Add unique identifier
  }));
  const venueReservations = reservations.filter(reservation => reservation.hasOwnProperty('venueName'));
  const activityReservations = reservations.filter(reservation => reservation.hasOwnProperty('activityName'));
  const eventReservations = reservations.filter(reservation => reservation.hasOwnProperty('playerGender'));

  const handleRatingChange = (id, rating) => {
    setRatings({
      ...ratings,
      [id]: rating // Update ratings object with new rating
    });
  }



    const handleReservationClick = (reservation) => {
      console.log("Selected reservation:", reservation);
      setSelectedReservation(reservation);
    };



    function renderReservationDetails() {
      console.log("Render reservation details");
      if (!selectedReservation) {
        return null;
      }

      const ratingValue = selectedReservation.hasOwnProperty('venueName')
        ? selectedReservation.vrating
        : selectedReservation.hasOwnProperty('activityName')
          ? selectedReservation.arating
          : null;

      return (
        <div className="reservation-details-popup">
          <h2>Reservation Details</h2>
          {selectedReservation.hasOwnProperty('venueName') && (
            <>
              <p>{selectedReservation.venueName}</p>
              <p>{selectedReservation.location}</p>
              <p>{selectedReservation.sportName}</p>
              <p>{selectedReservation.date} at {selectedReservation.time}</p>
              <p>ownerEmail: {selectedReservation.venueOwnerEmail}</p>
              <p>Price: ${selectedReservation.price}</p>
              <p><span className="Bold">Given Ratings:</span> {selectedReservation.vrating}</p>
            </>
          )}

          {selectedReservation.hasOwnProperty('activityName') && (
            <>
              <p>{selectedReservation.activityName}</p>
              <p>{selectedReservation.activityLocation}</p>
              <p>{selectedReservation.date} at {selectedReservation.time}</p>
              <p>Price: ${selectedReservation.price}</p>
              <p><span className="Bold">Given Ratings:</span> {selectedReservation.arating}</p>
            </>
          )}

          {selectedReservation.hasOwnProperty('playerGender') && (
            <>
              <p>{selectedReservation.playerSportActivity}</p>
              <p>{selectedReservation.date} at {selectedReservation.time}</p>
              <p>{selectedReservation.description}</p>
              <p>{selectedReservation.emailId}</p>
            </>
          )}

          <label>
            Rating:
            <select
              value={ratingValue}
              onChange={(e) =>
                setSelectedReservation({
                  ...selectedReservation,
                  vrating: selectedReservation.hasOwnProperty('venueName')
                    ? e.target.value
                    : selectedReservation.hasOwnProperty('activityName')
                      ? null
                      : selectedReservation.vrating,
                  arating: selectedReservation.hasOwnProperty('activityName')
                    ? e.target.value
                    : selectedReservation.hasOwnProperty('venueName')
                      ? null
                      : selectedReservation.arating
                })
              }
            >
              <option value="">--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>

          <button onClick={() => setSelectedReservation(null)}>Close</button>
        </div>
      );
    }




    return (
      <div className="reservation-history">
        <h2>Reservation History</h2>
        {venueReservations.length > 0 && (
          <>
            <h3>Venue Reservations</h3>
            <ul>
              {venueReservations.map((reservation, index) => (
                <li key={index}>
                  <h4>{reservation.venueName}</h4>
                  <p>{reservation.date} at {reservation.time}</p>
                  <p><span className="Bold">Ratings:</span> {reservation.vrating}</p>
                  <label>
                    Rating:
                    <select value={ratings[reservation.id]} onChange={(e) => handleRatingChange(index, e.target.value)}>
                      <option value="">--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </label>
                  <button onClick={() => handleReservationClick(reservation)}>View Details</button>              </li>
              ))}
            </ul>
          </>
        )}
        {activityReservations.length > 0 && (
          <>
            <h3>Activity Reservations</h3>
            <ul>
              {activityReservations.map((reservation, index) => (
                <li key={index}>
                  <h4>{reservation.activityName}</h4>
                  <p>{reservation.date} at {reservation.time}</p>
                  <p><span className="Bold">Ratings:</span> {reservation.arating}</p>
                  <label>
                    <span className="Bold">Rating:</span>
                    <select value={ratings[reservation.id]} onChange={(e) => handleRatingChange(index, e.target.value)}>
                      <option value="">--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </label>
                  <button onClick={() => handleReservationClick(reservation)}>View Details</button>              </li>
              ))}
            </ul>
          </>
        )}
        {eventReservations.length > 0 && (
          <>
            <h3>Player Reservations</h3>
            <ul>
              {eventReservations.map((reservation, index) => (
                <li key={index}>
                  <p>{reservation.playerSportActivity}</p>
                  <p>{reservation.date} at {reservation.time}</p>
                  <button onClick={() => handleReservationClick(reservation)}>View Details</button>              </li>
              ))}
            </ul>
          </>
        )}
        {renderReservationDetails()}
        {reservations.length === 0 && (
          <p>No reservations to display.</p>
        )}
      </div>
    );
  }

  export default Reservation;
