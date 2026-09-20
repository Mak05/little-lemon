import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './Main';

describe('BookingForm Component & Logic Tests', () => {
  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();

  // 1. Static UI Rendering
  test('renders form labels and submit button correctly', () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
  });

  // 2. HTML5 Attribute Validation
  test('applies correct HTML5 validation attributes to input fields', () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);

    expect(dateInput).toHaveAttribute('type', 'date');
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  // 3. User Form Submission
  test('invokes submitForm handler when the form is submitted', () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Make Your Reservation/i });
    fireEvent.click(submitBtn);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  });

  // 4. Reducer Logic - initializeTimes
  test('initializeTimes returns a non-empty array of initial booking times', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  // 5. Reducer Logic - updateTimes
  test('updateTimes returns an updated array when a date is selected', () => {
    const initialState = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES', date: '2026-09-20' };
    const newState = updateTimes(initialState, action);

    expect(Array.isArray(newState)).toBe(true);
    expect(newState.length).toBeGreaterThan(0);
  });
});