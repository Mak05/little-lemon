import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

describe('Nav Component', () => {
  test('renders navigation landmark and main menu links', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    // Verify nav role landmark
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();

    // Verify key navigation links exist
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Reservations/i })).toHaveAttribute('href', '/booking');
  });
});