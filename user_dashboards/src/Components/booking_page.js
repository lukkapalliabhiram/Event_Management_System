import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function BookingPage({ data }) {
  const navigate = useNavigate();
  const venueIndex = window.location.pathname.split("/").pop();
  const [bookingTime, setBookingTime] = useState("");
  const { item } = useLocation().state;
  const venue = item;
  console.log(venue);

  const handleBooking = (e) => {
    e.preventDefault();
    // TODO: Send booking data to server and show confirmation message
    navigate(`/payments/${venueIndex}`, { state: { venue, bookingTime } });
  };

  return (
    <div className="booking-page">
      <div className="venue-details">
        <h2>{venue.venueName}</h2>
        <div>
          <strong>Location:</strong> {venue.location}
        </div>
        <div>
          <strong>Sport:</strong> {venue.sportName}
        </div>
        <div>
          <strong>Description:</strong> {venue.description}
        </div>
        <div>
          <strong>Available Time Slots:</strong>
          <ul>
            {venue.availableTimeSlots.map((timeSlot, index) => (
              <li key={index}>{timeSlot}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Ratings:</strong> {venue.rating}{" "}
          <span className="star-ratings">
            {Array.from({ length: venue.rating }, (_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
          </span>
        </div>
        <div>
          <strong>Facilities/Amenities:</strong>
          <ul>
            {venue.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={venue.architecturalMapImage} alt="Map" />
        </div>
        <form onSubmit={handleBooking}>
          <h3>Book a Time Slot</h3>
          <select
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
          >
            <option value="">Select a time slot</option>
            {venue.availableTimeSlots.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
          {bookingTime && (
            <p>
              Selected time slot: <strong>{bookingTime}</strong>
            </p>
          )}
          <button type="submit" disabled={!bookingTime}>
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
