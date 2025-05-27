import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused imports
import '../styles/ImageGalleryPopup.css';

const ImageGalleryPopup = ({ isOpen, onClose, images, projectTitle, iphoneOverlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const galleryContentRef = React.useRef(null);

  // Monitor theme changes for styling
  useEffect(() => {
    setIsDark(document.body.getAttribute('data-theme') === 'dark');
    const observer = new MutationObserver(() => {
      setIsDark(document.body.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Close gallery when clicking outside content area
  const handleBackdropClick = (e) => {
    if (galleryContentRef.current && !galleryContentRef.current.contains(e.target)) {
      handleClose();
    }
  };

  // Mobile swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next image
      navigateImages('next');
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous image
      navigateImages('prev');
    }
  };

  const navigateImages = useCallback((direction) => {
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  }, [images]);

  // Close gallery with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350); // Match animation duration
  }, [onClose]);

  // Handle keyboard navigation (move after handleClose/navigateImages to avoid no-use-before-define)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        navigateImages('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImages('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, navigateImages]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={`gallery-backdrop${isDark ? ' dark' : ' light'}${isClosing ? ' gallery-closing gallery-popup-animating-out' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          style={{zIndex: 10000}}
        >
          {/* Close button */}
          <button
            className="gallery-close-rect"
            onClick={handleClose}
            aria-label="Close gallery"
            style={{zIndex: 20, position: 'absolute', top: '1.5rem', right: '1.5rem'}}
          >
            <span style={{color: '#fff', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1}}>×</span>
          </button>
          <div
            ref={galleryContentRef}
            className={`gallery-content${isDark ? ' dark' : ' light'}${iphoneOverlay ? ' iphone-overlay' : ''}${isClosing ? ' gallery-closing gallery-popup-animating-out' : ''}`}
            style={iphoneOverlay ? {paddingLeft: '2.5rem', paddingRight: '2.5rem'} : {}}
          >
            <div 
              className="gallery-image-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={iphoneOverlay ? {display: 'flex', justifyContent: 'center', alignItems: 'center'} : {}}
            >
              {iphoneOverlay ? (
                <div className="phone-mockup">
                  <div className="phone-screen">
                    <img 
                      src={images[currentIndex]} 
                      alt={`${projectTitle} screenshot ${currentIndex + 1}`} 
                      className="mobile-image"
                    />
                  </div>
                </div>
              ) : (
                <img 
                  src={images[currentIndex]} 
                  alt={`${projectTitle} screenshot ${currentIndex + 1}`} 
                  className="gallery-image"
                  style={{width: '100%', height: 'auto'}}
                />
              )}
            </div>
            {/* Thumbnails for navigation (desktop/tablet) */}
            <div className="gallery-thumbnails gallery-thumbnails-desktop">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img src={image} alt={`${projectTitle} thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="gallery-mobile-arrows">
              <button 
                className={`gallery-arrow-btn${isDark ? ' dark' : ' light'}`}
                onClick={() => navigateImages('prev')}
                aria-label="Previous image"
                type="button"
              >
                &#60;
              </button>
              <button 
                className={`gallery-arrow-btn${isDark ? ' dark' : ' light'}`}
                onClick={() => navigateImages('next')}
                aria-label="Next image"
                type="button"
              >
                &#62;
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageGalleryPopup;