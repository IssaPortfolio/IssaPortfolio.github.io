import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import '../styles/ContactPage.css';

const ContactPage = () => {

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-hero-content"
          >
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-subtitle">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-wrapper">
            <motion.div 
              className="contact-info glass-card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Contact Information</h3>
              <p>I'm currently available for freelance work and full-time opportunities. Let's build something amazing together!</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <FiMapPin className="contact-icon" />
                  <div>
                    <h4>Location</h4>
                    <p>Shelby Township, Michigan</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:Habeeb.H.Issa@gmail.com">Habeeb.H.Issa@gmail.com</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FiGithub className="contact-icon" />
                  <div>
                    <h4>GitHub</h4>
                    <p><a href="https://github.com/IssaPortfolio" target="_blank" rel="noopener noreferrer">github.com/IssaPortfolio</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FiLinkedin className="contact-icon" />
                  <div>
                    <h4>LinkedIn</h4>
                    <p><a href="https://linkedin.com/in/issa-habeeb" target="_blank" rel="noopener noreferrer">linkedin.com/in/issa-habeeb</a></p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-form-container glass-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Get in Touch</h3>
              
              <div className="contact-options">
                <div className="contact-option">
                  <FiMail className="option-icon" />
                  <div className="option-details">
                    <h4>Email Me</h4>
                    <p>For job opportunities or project inquiries</p>
                    <a href="mailto:Habeeb.H.Issa@gmail.com" className="btn btn-sm btn-primary">Send Email</a>
                  </div>
                </div>
                
                <div className="contact-option">
                  <FiLinkedin className="option-icon" />
                  <div className="option-details">
                    <h4>Connect on LinkedIn</h4>
                    <p>Let's build our professional network</p>
                    <a href="https://linkedin.com/in/issa-habeeb" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">View Profile</a>
                  </div>
                </div>
                
                <div className="contact-option">
                  <FiPhone className="option-icon" />
                  <div className="option-details">
                    <h4>Phone</h4>
                    <p>Available for urgent inquiries</p>
                    <a href="tel:+12489452057" className="btn btn-sm btn-outline">Call Me</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
