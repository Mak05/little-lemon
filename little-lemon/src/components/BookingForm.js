import React, { useState } from 'react';

const BookingForm = ({ availableTimes = [], dispatch, submitForm }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Controlled component states
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState(availableTimes[0] || '17:00');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('Birthday');

  // Track field touch state for field validation messaging
  const [touched, setTouched] = useState({
    date: false,
    guests: false,
  });

  // Validation Rules
  const isDateValid = date !== '' && new Date(date) >= new Date(todayStr);
  const isGuestsValid = guests >= 1 && guests <= 10;
  const isFormValid = isDateValid && isGuestsValid && time !== '';

  const handleDateChange = (e) => {
    const selectedDateStr = e.target.value;
    setDate(selectedDateStr);
    
    // Dispatch selected date to parent reducer to fetch new times dynamically
    if (selectedDateStr) {
      dispatch({ type: 'UPDATE_TIMES', payload: new Date(selectedDateStr) });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({ date: true, guests: true });
      return;
    }

    submitForm({
      date,
      time,
      guests: Number(guests),
      occasion,
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="booking-form"
      aria-label="Table Reservation Form"
      noValidate
    >
      <h2 id="form-heading">Reserve a Table</h2>

      {/* Date Input */}
      <div className="form-group">
        <label htmlFor="res-date">Choose date <span className="required-star">*</span></label>
        <input 
          type="date" 
          id="res-date" 
          name="res-date"
          value={date} 
          min={todayStr}
          onChange={handleDateChange}
          onBlur={() => handleBlur('date')}
          required
          aria-required="true"
          aria-invalid={touched.date && !isDateValid}
          aria-describedby={touched.date && !isDateValid ? "date-error" : undefined}
        />
        {touched.date && !isDateValid && (
          <span id="date-error" className="error-message" role="alert">
            Please select a valid current or future date.
          </span>
        )}
      </div>

      {/* Time Input */}
      <div className="form-group">
        <label htmlFor="res-time">Choose time <span className="required-star">*</span></label>
        <select 
          id="res-time" 
          name="res-time"
          value={time} 
          onChange={(e) => setTime(e.target.value)}
          required
          aria-required="true"
        >
          {availableTimes.length === 0 ? (
            <option value="">No times available for this date</option>
          ) : (
            availableTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))
          )}
        </select>
      </div>

      {/* Number of Guests Input */}
      <div className="form-group">
        <label htmlFor="guests">Number of guests <span className="required-star">*</span></label>
        <input 
          type="number" 
          placeholder="1" 
          min="1" 
          max="10" 
          id="guests" 
          name="guests"
          value={guests} 
          onChange={(e) => setGuests(e.target.value)}
          onBlur={() => handleBlur('guests')}
          required
          aria-required="true"
          aria-invalid={touched.guests && !isGuestsValid}
          aria-describedby={touched.guests && !isGuestsValid ? "guests-error" : undefined}
        />
        {touched.guests && !isGuestsValid && (
          <span id="guests-error" className="error-message" role="alert">
            Please select a party size between 1 and 10 guests.
          </span>
        )}
      </div>

      {/* Occasion Selection */}
      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select 
          id="occasion" 
          name="occasion"
          value={occasion} 
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Engagement">Engagement</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Submit Action */}
      <button 
        type="submit" 
        className="submit-btn" 
        disabled={!isFormValid}
        aria-label="On Click to Reserve Table"
      >
        Make Your Reservation
      </button>
    </form>
  );
};

export default BookingForm;