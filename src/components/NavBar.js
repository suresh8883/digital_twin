import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import appLogo from '../assets/images/appLogo.png';

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Navbar
      className={`nav-bar-style${scrolled ? ' scrolled' : ''}`}
      fixed="top"
      expand="lg"
    >
      <div className="container">
        <Navbar.Brand href="/">
          <img src={appLogo} className="logo-style" alt="Digital Twin Technologies" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" style={{ borderColor: 'var(--color-border)' }} />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto menu-nav">
            <NavLink className="nav-link" activeClassName="active" to="/" exact>Home</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/services">Services</NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/contactUs">Contact Us</NavLink>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navigation;
