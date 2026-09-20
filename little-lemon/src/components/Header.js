import React from 'react';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="app-header" role="banner">
      <div className="header-container">
        <img 
          src="/logo.svg" 
          alt="Little Lemon Restaurant Logo" 
          className="logo"
        />
        <Nav />
      </div>
    </header>
  );
};

export default Header;