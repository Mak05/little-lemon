// src/components/Main.js
import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import { fetchAPI, submitAPI } from '../api';

/**
 * Reducer function for managing state of available booking times.
 */
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.payload);
    default:
      return state;
  }
};

/**
 * Initializes available times for current date.
 */
export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    const isSuccess = submitAPI(formData);
    if (isSuccess) {
      navigate('/booking-confirmed');
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <BookingPage 
            availableTimes={availableTimes} 
            dispatch={dispatch} 
            submitForm={submitForm} 
          />
        } 
      />
      <Route 
        path="/booking" 
        element={
          <BookingPage 
            availableTimes={availableTimes} 
            dispatch={dispatch} 
            submitForm={submitForm} 
          />
        } 
      />
      <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
    </Routes>
  );
};

export default Main;