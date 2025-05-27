import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

// Styles
import './styles/globals.css';

// ScrollToTop component to handle scroll restoration
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Don't scroll to top if we're navigating to a specific hash (like from "Learn More" links)
    if (!hash) {
      // Force scroll to top with multiple approaches for reliability
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Additional fallback with longer delay
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    }
  }, [pathname, hash]); // Trigger when pathname or hash changes
  
  return null;
}

function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
