import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmedBooking = () => {
  return (
    <main className="confirmation-page" role="main">
      <div className="confirmation-card" tabIndex="0">
        <div className="icon-success" aria-hidden="true">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Thank you for choosing Little Lemon.</p>
        <p>Your table reservation has been successfully placed. We have sent a confirmation email with details.</p>
        <Link to="/" className="home-btn" aria-label="Return to homepage">
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default ConfirmedBooking;