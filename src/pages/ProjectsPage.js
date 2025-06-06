import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiImage, FiGithub } from 'react-icons/fi';
import { FaMobileAlt, FaLaptopCode } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ImageGalleryPopup from '../components/ImageGalleryPopup';
import TechIcon from '../components/TechIcon';
import '../styles/ProjectsPage.css';

// Main project thumbnail images
import pollAppImg from '../assets/PollApp/PollApp1.png';
import pollApp1 from '../assets/PollApp/PollApp1.png';
import pollApp2 from '../assets/PollApp/PollApp2.png';
import pollApp3 from '../assets/PollApp/PollApp3.png';
import pollApp4 from '../assets/PollApp/PollApp4.png';
import smoothJourneyImg from '../assets/SmoothJourney/SmoothJourney1.jpeg';
import smoothJourney1 from '../assets/SmoothJourney/SmoothJourney1.jpeg';
import smoothJourney2 from '../assets/SmoothJourney/SmoothJourney2.jpeg';
import smoothJourney3 from '../assets/SmoothJourney/SmoothJourney3.png';
import smoothJourney4 from '../assets/SmoothJourney/SmoothJourney4.png';
import smoothJourney5 from '../assets/SmoothJourney/SmoothJourney5.jpeg';
import smoothJourney6 from '../assets/SmoothJourney/SmoothJourney6.jpeg';
import smoothJourney7 from '../assets/SmoothJourney/SmoothJourney7.jpeg';
import smoothJourney8 from '../assets/SmoothJourney/SmoothJourney8.jpg';
import smoothJourney9 from '../assets/SmoothJourney/SmoothJourney9.jpeg';
import tcmwaImg from '../assets/TCMWA.png';
import employeeTrackerImg from '../assets/EmployeeTracker/EmployeeTracker1.png';
import employeeTracker1 from '../assets/EmployeeTracker/EmployeeTracker1.png';
import employeeTracker2 from '../assets/EmployeeTracker/EmployeeTracker2.png';
import employeeTracker3 from '../assets/EmployeeTracker/EmployeeTracker3.png';
import employeeTracker4 from '../assets/EmployeeTracker/EmployeeTracker4.png';
import employeeTracker5 from '../assets/EmployeeTracker/EmployeeTracker5.png';
import employeeTracker6 from '../assets/EmployeeTracker/EmployeeTracker6.png';

// Gallery images for each project
const projectScreenshots = {
  'Smooth Journey': [
    smoothJourney1,
    smoothJourney2,
    smoothJourney3,
    smoothJourney4,
    smoothJourney5,
    smoothJourney6,
    smoothJourney7,
    smoothJourney8,
    smoothJourney9
  ],
  'PollApp': [
    pollApp1,
    pollApp2,
    pollApp3,
    pollApp4
  ],
  'Tree-Cutting Management': [
    tcmwaImg
  ],
  'Employee Tracker': [
    employeeTracker1,
    employeeTracker2,
    employeeTracker3,
    employeeTracker4,
    employeeTracker5,
    employeeTracker6
  ]
};

const projects = [
  {
    id: 1,
    title: 'Smooth Journey',
    image: smoothJourneyImg,
    isMobileApp: true,
    description: 'Michigan drivers often deal with rough or damaged roads that can\'t be spotted ahead of time. These hidden bumps and potholes can lead to car damage overtime. Since most of these road issues aren\'t marked or updated in regular GPS apps, drivers are left guessing and hoping for a smooth drive. \n\nSmooth Journey is a mobile app designed to solve this problem. It uses two main sources of data: official road condition information from the Southeast Michigan Council of Governments (SEMCOG), and motion data from your phone\'s built-in gyroscope sensor. By combining this sensor data with the SEMCOG maps, the app can show drivers which roads are smooth and which ones to avoid. It also gives better route suggestions by choosing paths with fewer road issues, not just the fastest way.',
    technologies: ['Python', 'Flask', 'PostgreSQL', 'PostGIS', 'Mapbox', 'Swift', 'SwiftUI', 'UIKit', 'Google Cloud'],
    githubLink: 'https://github.com/IssaPortfolio',
    completed: 'Spring 2024'
  },
  {
    id: 2,
    title: 'PollApp',
    image: pollAppImg,
    description: 'PollApp is a unique social media platform centered around polls, allowing users to create polls, vote on them, and view the results. Built with a robust stack of technologies including Node.js, Express.js, React, MySQL, Bootstrap, HTML, CSS, Git, and Vite, PollApp offers a seamless experience for engaging with friends, colleagues, or the wider community. Whether you want to use it for fun, work, or to stay informed about various topics, PollApp makes decision-making more interactive and enjoyable. The application features a user-friendly interface with a home page, login and registration functionalities, and a dedicated dashboard for managing polls and results. The application implements both front-end and back-end components to ensure smooth user interaction and efficient data handling.',
    technologies: ['HTML', 'CSS3', 'React', 'Node.js', 'Express', 'MySQL', 'Bootstrap', 'Vite', 'AWS'],
    githubLink: 'https://github.com/IssaPortfolio/Poll-App',
    completed: 'Summer 2024'
  },
  {
    id: 3,
    title: 'Tree-Cutting Management',
    image: tcmwaImg,
    description: 'Web-based application using Java, MySQL, and JSP to manage tree-cutting services, including client registrations, quote requests, negotiations, and billing.',
    technologies: ['Java', 'MySQL', 'JSP', 'HTML5', 'CSS3'],
    githubLink: 'https://github.com/DBMS-Project-1/Part-3',
    completed: 'Fall 2023'
  },
  {
    id: 4,
    title: 'Employee Tracker',
    image: employeeTrackerImg,
    description: 'The employee tracker app kicks off with a screen displaying roles like software engineers or HR, each with its own image. Users can pick a role, leading them to a detailed page showing the current employee count and individual info. The app simplifies management by allowing users to easily add or remove employees in the selected role, making workforce tracking straightforward. Additionally, there is a button that when clicked, will display all the employees at once, allowing users to efficiently edit information for the entire workforce.',
    technologies: ['Python', 'Tkinter', 'Turtle', 'HTML5', 'CSS3'],
    githubLink: 'https://github.com/IssaPortfolio/Employee-Tracker',
    completed: 'Fall 2023'
  }
];

const ProjectsPage = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const location = useLocation();
  
  // Handle scrolling to specific project when coming from "Learn More" links
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.classList.add('highlight-project');
          setTimeout(() => {
            element.classList.remove('highlight-project');
          }, 2000);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);
  
  const openGallery = (project) => {
    setCurrentProject(project);
    setGalleryOpen(true);
  };
  
  const closeGallery = () => {
    setGalleryOpen(false);
  };
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <main className="projects-page">
        <section className="projects-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="projects-hero-content"
            >
              <h1 className="projects-title">My Projects</h1>
              <p className="projects-subtitle">
                A collection of my academic and personal projects, showcasing my skills and experience in software development.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="projects-list">
          <div className="container">
            <div className="projects-container">
              <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    id={project.title.replace(/\s+/g, '-').toLowerCase()}
                    className={`project-card glass-card ${project.isMobileApp ? 'has-phone' : ''}`}
                    variants={itemVariants}
                    style={{ scrollMarginTop: '120px' }} // Account for fixed navbar with proper offset
                  >
                    <div className="card-header">
                      <div className="card-icon-container" style={{ background: project.isMobileApp ? 'rgba(211, 47, 47, 0.15)' : 'rgba(211, 47, 47, 0.15)' }}>
                        {project.title === 'Employee Tracker' ? (
                          <FaLaptopCode className="card-icon" style={{ color: '#D32F2F' }} />
                        ) : project.isMobileApp ? (
                          <FaMobileAlt className="card-icon" style={{ color: '#D32F2F' }} />
                        ) : (
                          <FiGlobe className="card-icon" style={{ color: '#D32F2F' }} />
                        )}
                      </div>
                      <h3>{project.title}</h3>
                    </div>
                    
                    <div className="project-meta" style={{ marginTop: '8px', marginBottom: '12px' }}>
                      <span className="project-date">{project.completed}</span>
                    </div>
                    
                    <div className="project-description">
                      {project.description.split('\n\n').map((paragraph, i) => (
                        <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                      ))}
                    </div>
                    
                    {project.isMobileApp ? (
                      <div className="mobile-container">
                        <div className="phone-mockup">
                          <div className="phone-screen">
                            <img src={project.image} alt={`${project.title} Project`} className="mobile-image" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="project-image-container">
                        <img src={project.image} alt={`${project.title} Project`} className="project-image" />
                      </div>
                    )}
                    
                    <div className="project-tech-stack">
                      {project.title === 'Smooth Journey' && (
                        <>
                          <TechIcon name="Python" />
                          <TechIcon name="Flask" />
                          <TechIcon name="PostgreSQL" />
                          <TechIcon name="PostGIS" />
                          <TechIcon name="Mapbox" />
                          <TechIcon name="Swift" />
                          <TechIcon name="SwiftUI" />
                          <TechIcon name="UIKit" />
                          <TechIcon name="Google Cloud E2" />
                        </>
                      )}
                      {project.title === 'PollApp' && (
                        <>
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
                        </>
                      )}
                      {project.title === 'Tree-Cutting Management' && (
                        <>
                          <TechIcon name="Java" />
                          <TechIcon name="MySQL" />
                          <TechIcon name="JSP" />
                          <TechIcon name="HTML5" />
                          <TechIcon name="CSS3" />
                        </>
                      )}
                      {project.title === 'Employee Tracker' && (
                        <>
                          <TechIcon name="Python" />
                          <TechIcon name="Tkinter" />
                          <TechIcon name="Turtle" />
                          <TechIcon name="HTML5" />
                          <TechIcon name="CSS3" />
                        </>
                      )}
                    </div>
                    
                    <div className="project-links">
                      {project.title !== 'Smooth Journey' ? (
                        <>
                          <a href={project.githubLink} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                            <FiGithub style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> GitHub
                          </a>
                          <button 
                            className="btn btn-outline btn-sm" 
                            onClick={() => openGallery(project)}
                          >
                            <FiImage style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> View Screenshots
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            className="btn btn-outline btn-sm" 
                            onClick={() => openGallery(project)}
                          >
                            <FiImage style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> View Screenshots
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      {/* Move the popup outside of the main return block, but inside the React fragment */}
      {galleryOpen && currentProject && (
        <ImageGalleryPopup 
          isOpen={galleryOpen}
          onClose={closeGallery}
          images={projectScreenshots[currentProject.title]}
          projectTitle={currentProject.title}
          iphoneOverlay={currentProject.title === 'Smooth Journey'}
        />
      )}
    </>
  );
};

export default ProjectsPage;
