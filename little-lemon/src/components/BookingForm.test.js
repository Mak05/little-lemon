import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './Main';

describe('BookingForm Component & State Logic', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();

  // 1. Static Text & Elements Rendering
  test('renders form headings, labels, and submit button', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm} 
      />
    );

    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByText(/Make Your Reservation/i)).toBeInTheDocument();
  });

  // 2. HTML5 Validation Attributes
  test('applies HTML5 validation attributes to inputs', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
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

  // 3. Form Submission Handling
  test('calls submitForm when submit button is clicked', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        dispatch={mockDispatch} 
        submitForm={mockSubmitForm} 
      />
    );

    const submitButton = screen.getByText(/Make Your Reservation/i);
    fireEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  });

  // 4. Reducer Logic - initializeTimes
  test('initializeTimes returns a non-empty array of initial times', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  // 5. Reducer Logic - updateTimes
  test('updateTimes returns expected state given a date payload', () => {
    const initialState = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES', date: '2026-09-20' };
    const newState = updateTimes(initialState, action);

    expect(Array.isArray(newState)).toBe(true);
    expect(newState.length).toBeGreaterThan(0);
  });
});