import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const { venue,bookingTime, paymentMethod } = useLocation().state;

  return (
    <div className="booking-page">
      <h2>Booking Confirmed</h2>
      <div className="venue-details">
        <h3>{venue.venueName}</h3>
        <div>
          <strong>Location:</strong> {venue.location}
        </div>
        <div>
          <strong>Sport:</strong> {venue.sportName}
        </div>
        <div>
          <strong>Time Slot:</strong> {bookingTime}
        </div>
        <div>
          <strong>Payment Method:</strong> {paymentMethod}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
