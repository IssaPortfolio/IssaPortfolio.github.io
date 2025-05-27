import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

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
    
    // Force immediate theme application
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Force a repaint to ensure all elements update immediately
    document.body.style.display = 'none';
    // Trigger reflow by accessing offsetHeight
    void document.body.offsetHeight;
    document.body.style.display = '';
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
