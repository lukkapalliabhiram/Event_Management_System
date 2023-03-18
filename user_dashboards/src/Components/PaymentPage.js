import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function PaymentsPage() {
  const navigate = useNavigate();
  const venueIndex = window.location.pathname.split("/").pop();
  const { venue, bookingTime } = useLocation().state;

  const handlePayment = (e) => {
    e.preventDefault();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    navigate(`/confirmation/${venueIndex}`, { state: { venue, bookingTime, paymentMethod } });
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
          <strong>Selected Time Slot:</strong> {bookingTime}
        </div>
        
        <form onSubmit={handlePayment}>
        <h3>Payment Information</h3>
        <div>
          <h4>Select Payment Method:</h4>
          <label htmlFor="CreditCard">
            <input type="radio" id="CreditCard" name="paymentMethod" value="CreditCard"  />
            Credit Card
          </label>
          <label htmlFor="DebitCard">
            <input type="radio" id="DebitCard" name="paymentMethod" value="DebitCard"  />
            Debit Card
          </label>
          <label htmlFor="googlePay">
            <input type="radio" id="googlePay" name="paymentMethod" value="googlePay"  />
            Google Pay
          </label>
          <label htmlFor="paypal">
            <input type="radio" id="paypal" name="paymentMethod" value="paypal"  />
            PayPal
          </label>
          <label htmlFor="bankAccount">
            <input type="radio" id="bankAccount" name="paymentMethod" value="bankAccount"  />
            Bank Account
          </label>
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" name="cardNumber" />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" id="expirationDate" name="expirationDate"  />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv"  />
        </div>
        <button type="submit">Make Payment</button>
      </form>
      </div>
      
    </div>
  );
}

export default PaymentsPage;
