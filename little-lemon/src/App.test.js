import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import { initializeTimes, updateTimes } from './components/Main';
import * as api from './api';

// Mock the API library
jest.mock('./api', () => ({
  fetchAPI: jest.fn(() => ['17:00', '18:00', '19:00', '20:00']),
  submitAPI: jest.fn(() => true),
}));

describe('Little Lemon Booking Web App', () => {
  test('Renders static heading in BookingForm', () => {
    render(<BookingForm availableTimes={['17:00', '18:00']} dispatch={() => {}} submitForm={() => {}} />);
    const headingElement = screen.getByText('Reserve a Table');
    expect(headingElement).toBeInTheDocument();
  });

  test('initializeTimes fetches initial time array', () => {
    const times = initializeTimes();
    expect(times).toEqual(['17:00', '18:00', '19:00', '20:00']);
    expect(api.fetchAPI).toHaveBeenCalled();
  });

  test('updateTimes returns updated times based on selected date payload', () => {
    const initialState = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES', payload: new Date('2026-10-10') };
    const result = updateTimes(initialState, action);
    expect(result).toEqual(['17:00', '18:00', '19:00', '20:00']);
  });

  test('BookingForm fields apply correct HTML5 validation attributes', () => {
    render(<BookingForm availableTimes={['17:00']} dispatch={() => {}} submitForm={() => {}} />);

    const dateInput = screen.getByLabelText(/Choose date/i);
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('required');

    const guestsInput = screen.getByLabelText(/Number of guests/i);
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(guestsInput).toHaveAttribute('required');
  });

  test('Displays validation message when guests count is invalid (<1)', () => {
    render(<BookingForm availableTimes={['17:00']} dispatch={() => {}} submitForm={() => {}} />);

    const guestsInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);

    const errorMessage = screen.getByText(/Please select a party size between 1 and 10 guests/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('Disables submit button when form state is invalid', () => {
    render(<BookingForm availableTimes={['17:00']} dispatch={() => {}} submitForm={() => {}} />);

    const guestsInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '15' } });

    const submitBtn = screen.getByRole('button', { name: /On Click to Reserve Table/i });
    expect(submitBtn).toBeDisabled();
  });
});