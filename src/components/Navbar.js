import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef();

  // Optimized scroll effect handler
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateScrolled = () => {
      setScrolled(window.scrollY > 10);
      ticking = false;
    };
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrolled();
        });
        ticking = true;
      }
    };
    
    // Check initial scroll position
    setScrolled(window.scrollY > 10);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !(e.target.closest && e.target.closest('.mobile-toggle'))
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <header 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span>Issa Habeeb</span>
        </Link>

        <div className="nav-right">
          <nav ref={navRef} className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
            <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
              Projects
            </Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
          </nav>

          <ThemeToggle />

          <button 
            className={`mobile-toggle ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
