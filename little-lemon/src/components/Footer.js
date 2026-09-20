import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-content">
        <img src="/footer-logo.png" alt="Little Lemon Restaurant" className="footer-logo" />
        <div className="footer-nav">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="/booking">Reservations</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>123 Lemon Way, Chicago, IL</p>
          <p>Phone: +1 (312) 555-0199</p>
          <p>Email: info@littlelemon.com</p>
        </div>
        <div className="footer-social">
          <h3>Social Media</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;