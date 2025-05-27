import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Initialize theme based on saved preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      // Default to light mode
      setIsDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
      if (!savedTheme) localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    setAnimating(true);
    
    // Apply theme change to all relevant elements immediately
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme-specific classes to key elements to force immediate update
    const elementsToUpdate = [
      document.querySelector('.navbar-container'),
      document.querySelector('.mobile-toggle'),
      document.querySelector('.theme-toggle'),
      ...document.querySelectorAll('.glass-card'),
      ...document.querySelectorAll('.nav-links')
    ];
    
    elementsToUpdate.forEach(el => {
      if (el) {
        // Remove any transition temporarily to force immediate update
        el.style.transition = 'none';
        // Force a reflow
        void el.offsetHeight;
        // Do not restore transition
      }
    });

    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button 
      className={`theme-toggle${animating ? ' theme-animating' : ''}`} 
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
