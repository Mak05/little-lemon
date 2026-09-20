import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders header landmark and logo image', () => {
    render(<Header />);

    // Verify header tag exists
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    // Verify logo image renders with accessible alt text
    const logoImage = screen.getByAltText(/Little Lemon/i);
    expect(logoImage).toBeInTheDocument();
  });
});