import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCode, FiDatabase, FiServer, FiLayers, FiGithub, FiLinkedin, FiMail, FiBriefcase, FiGlobe } from 'react-icons/fi';
import { FaGraduationCap, FaLaptopCode, FaAward, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import TechIcon from '../components/TechIcon';
import '../styles/HomePage.css';

// Profile and project images
import profilePhoto from '../assets/Photo.jpg';
import pollAppImg from '../assets/PollApp/PollApp1.png';
import employeeTrackerImg from '../assets/EmployeeTracker/EmployeeTracker1.png';

const HomePage = () => {
  return (
    <main className="home-page-container">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-grid">  
            {/* About Me Card - Left Column */}
            <motion.div 
              className="hero-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="profile-container">
                <div className="profile-image">
                  <img src={profilePhoto} alt="Issa Habeeb" />
                </div>
              </div>
              <div className="profile-text">
                <h2 className="title">Software Engineer</h2>
                <p className="bio">
                  Strong foundation in fullstack development, object-oriented programming, and data-driven applications, including data structures and algorithms. Experienced in deploying scalable, cloud-based solutions on AWS and Google Cloud with robust documentation and testing. Collaborative team player skilled at driving projects from concept to production.
                </p>
                <div className="cta-buttons">
                  <Link to="/projects" className="btn btn-primary">View My Work</Link>
                  <Link to="/contact" className="btn btn-outline">Contact Me</Link>
                </div>
                
                <div className="social-links">
                  <a href="https://github.com/IssaPortfolio" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FiGithub />
                  </a>
                  <a href="https://linkedin.com/in/issa-habeeb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FiLinkedin />
                  </a>
                  <a href="mailto:Habeeb.H.Issa@gmail.com" aria-label="Email">
                    <FiMail />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Technical Skills Card - Right Column */}
            <motion.div
              className="skills-container glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card-header">
                <div className="card-icon-container">
                  <FaLaptopCode className="card-icon" />
                </div>
                <h3>Technical Skills</h3>
              </div>

              <div className="skills-content">
                <div className="skill-list">
                  <h4><FiCode className="skill-list-icon" /> Programming Languages</h4>
                  <div className="tech-stack">
                    <TechIcon name="Python" />
                    <TechIcon name="C++" />
                    <TechIcon name="C" />
                    <TechIcon name="Java" />
                    <TechIcon name="JavaScript" />
                    <TechIcon name="Rust" />
                    <TechIcon name="Swift" />
                  </div>
                </div>
                
                <div className="skill-list">
                  <h4><FiLayers className="skill-list-icon" /> Frontend Development</h4>
                  <div className="tech-stack">
                    <TechIcon name="React" />
                    <TechIcon name="HTML5" />
                    <TechIcon name="CSS3" />
                    <TechIcon name="Bootstrap" />
                    <TechIcon name="Vite" />
                    <TechIcon name="SwiftUI" />
                    <TechIcon name="UIKit" />
                    <TechIcon name="Turtle" />
                    <TechIcon name="JSP" />
                  </div>
                </div>
                
                <div className="skill-list">
                  <h4><FiServer className="skill-list-icon" /> Backend Development</h4>
                  <div className="tech-stack">
                    <TechIcon name="Node.js" />
                    <TechIcon name="Express" />
                    <TechIcon name="Flask" />
                    <TechIcon name="Tkinter" />
                  </div>
                </div>
                
                <div className="skill-list">
                  <h4><FiDatabase className="skill-list-icon" /> Databases</h4>
                  <div className="tech-stack">
                    <TechIcon name="MySQL" />
                    <TechIcon name="PostgreSQL" />
                  </div>
                </div>
                
                <div className="skill-list">
                  <h4><FiServer className="skill-list-icon" /> Cloud Services</h4>
                  <div className="tech-stack">
                    <TechIcon name="AWS EC2" />
                    <TechIcon name="AWS S3" />
                    <TechIcon name="Google Cloud E2" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section section-padding">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Relevant Experience
          </motion.h2>

          <motion.div
            className="experience-container glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-header">
              <div className="card-icon-container" style={{ background: 'rgba(255, 160, 0, 0.15)' }}>
                <FiBriefcase className="card-icon" style={{ color: '#FFA000' }} />
              </div>
              <h3>Smooth Journey</h3>
            </div>
            
            <div className="job-item">
              <div className="job-header">
                <h4>Software Engineer</h4>
                <span className="job-date">January - April 2025</span>
              </div>
              <ul className="job-duties">
                <li>Built a SwiftUI frontend and Python/Flask backend connected via RESTful APIs, leveraging PostgreSQL/PostGIS to serve spatial queries in real time.</li>
                <li>Created a custom route-grading algorithm that ingests 214,000+ SEMCOG and iPhone-sensor road segments, dynamically scoring and ranking routes by smoothness.</li>
                <li>Integrated the Mapbox iOS SDK for turn-by-turn directions and the Mapbox Search API server-side, enabling fast destination lookup.</li>
                <li>Collaborated in a 3-member team to deliver the full navigation solution; authored the SRS, design plan, test plan, traceability matrix, user manual, and README, then deployed on Google Cloud.</li>
              </ul>
              <div className="tech-used">
                <span className="label">Technologies Used:</span>
                <div className="tech-stack">
                  <TechIcon name="Python" />
                  <TechIcon name="Flask" />
                  <TechIcon name="PostgreSQL" />
                  <TechIcon name="PostGIS" />
                  <TechIcon name="Mapbox" />
                  <TechIcon name="Swift" />
                  <TechIcon name="SwiftUI" />
                  <TechIcon name="UIKit" />
                  <TechIcon name="Google Cloud E2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div> {/* Closing div.container for Experience */}
      </section> {/* Closing section.experience-section */}

      {/* Education Section */}
      <section className="education-section section-padding">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Education
          </motion.h2>
          
          <div className="education-grid">
            <motion.div
              className="education-container glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card-header">
                <div className="card-icon-container" style={{ background: 'rgba(46, 125, 50, 0.15)' }}>
                  <FaGraduationCap className="card-icon" style={{ color: '#2E7D32' }} />
                </div>
                <h3>Wayne State University</h3>
              </div>
              
              <div className="education-content">
                <div className="education-item">
                  <h4>Bachelor of Science in Computer Science</h4>
                  <p className="education-meta"><FaCalendarAlt size={14} /> Graduated May 2025 | <span className="gpa">GPA: 3.85</span></p>
                  <p className="education-location"><FaMapMarkerAlt size={14} /> Detroit, MI</p>
                  <p className="education-honor"><FaAward size={14} /> Dean's List - All Semesters</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="education-container glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="card-header">
                <div className="card-icon-container" style={{ background: 'rgba(46, 125, 50, 0.15)' }}>
                  <FaGraduationCap className="card-icon" style={{ color: '#2E7D32' }} />
                </div>
                <h3>Macomb Community College</h3>
              </div>
              
              <div className="education-content">
                <div className="education-item">
                  <h4>Associate of General Studies</h4>
                  <p className="education-meta"><FaCalendarAlt size={14} /> Graduated August 2022 | <span className="gpa">GPA: 3.65</span></p>
                  <p className="education-location"><FaMapMarkerAlt size={14} /> Warren, MI</p>
                  <p className="education-honor"><FaAward size={14} /> Magna Cum Laude</p>
                  <p className="education-honor"><FaAward size={14} /> Dean's List - All Semesters</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div> {/* Closing div.container for Education */}
      </section> {/* Closing section.education-section */}

      {/* Featured Projects Section */}
      <section className="featured-projects section-padding">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="featured-grid one-row">
            <motion.div 
              className="project-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card-header">
                <div className="card-icon-container" style={{ background: 'rgba(211, 47, 47, 0.15)' }}>
                  <FiGlobe className="card-icon" style={{ color: '#D32F2F' }} />
                </div>
                <h3>PollApp</h3>
              </div>
              <p>
                PollApp is a unique social media platform centered around polls, allowing users to create polls, vote on them, and view the results.
              </p>
              <div className="project-image-container">
                <img src={pollAppImg} alt="PollApp" className="project-image" />
              </div>
              <div className="project-tech">
                <TechIcon name="HTML" />
                <TechIcon name="CSS3" />
                <TechIcon name="React" />
                <TechIcon name="Node.js" />
                <TechIcon name="Express" />
                <TechIcon name="MySQL" />
                <TechIcon name="Bootstrap" />
                <TechIcon name="Vite" />
                <TechIcon name="AWS EC2" />
                <TechIcon name="AWS S3" />
              </div>
              <div className="project-links">
                <Link to="/projects" className="btn btn-sm btn-primary">Learn More</Link>
                <a href="https://github.com/IssaPortfolio/Poll-App" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                  <FiGithub style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> GitHub
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="project-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="card-header">
                <div className="card-icon-container" style={{ background: 'rgba(211, 47, 47, 0.15)' }}>
                  <FaLaptopCode className="card-icon" style={{ color: '#D32F2F' }} />
                </div>
                <h3>Employee Tracker</h3>
              </div>
              <p>
                The employee tracker app displays roles like software engineers or HR, allowing users to easily add or remove employees and efficiently edit information for the entire workforce.
              </p>
              <div className="project-image-container">
                <img src={employeeTrackerImg} alt="Employee Tracker" className="project-image" />
              </div>
              <div className="project-tech">
                <TechIcon name="Python" />
                <TechIcon name="Tkinter" />
                <TechIcon name="Turtle" />
                <TechIcon name="JSP" />
                <TechIcon name="HTML5" />
                <TechIcon name="CSS3" />
              </div>
              <div className="project-links">
                <Link to="/projects" className="btn btn-sm btn-primary">Learn More</Link>
                <a href="https://github.com/IssaPortfolio/Employee-Tracker" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                  <FiGithub style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> GitHub
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="see-more-container" style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/projects" className="btn btn-primary">See More</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
