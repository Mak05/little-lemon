import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders footer landmark, logo, and section headers', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Verify contentinfo role landmark
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();

    // Verify navigation and contact section headings
    expect(screen.getByRole('heading', { name: /Navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Contact Us/i })).toBeInTheDocument();

    // Verify footer image
    const footerLogo = screen.getByAltText(/Little Lemon/i);
    expect(footerLogo).toBeInTheDocument();
  });
});