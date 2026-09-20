import React from 'react';
import BookingForm from './BookingForm';

const BookingPage = ({ availableTimes, dispatch, submitForm }) => {
  return (
    <main className="booking-page" role="main">
      <section className="booking-hero">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Experience authentic Mediterranean dining. Book a table online to guarantee your seating.
        </p>
      </section>
      <section className="booking-content">
        <BookingForm 
          availableTimes={availableTimes} 
          dispatch={dispatch} 
          submitForm={submitForm} 
        />
      </section>
    </main>
  );
};

export default BookingPage;