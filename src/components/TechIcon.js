import React, { useMemo } from 'react';
import { 
  FaReact, FaNodeJs, FaJava, FaPython, FaDesktop, FaHtml5, 
  FaCss3Alt, FaJs, FaBootstrap, FaSwift, FaAws, FaFlask
} from 'react-icons/fa';
import { SiExpress, SiMysql, SiPostgresql, SiMongodb, SiVite, SiCplusplus, SiC, SiRust, SiAmazonec2, SiAmazons3, SiGooglecloud, SiMapbox } from 'react-icons/si';
import '../styles/TechIcon.css';

const TechIcon = ({ name }) => {
  // Define color scheme for each technology
  const getIconColor = () => {
    switch (name.toLowerCase()) {
      case 'react': return '#61DAFB';
      case 'node.js':
      case 'node': return '#339933';
      case 'express':
      case 'express.js': return '#000000';
      case 'java': return '#007396';
      case 'python': return '#3776AB'; 
      case 'mysql': return '#4479A1';
      case 'postgresql': return '#336791';
      case 'html':
      case 'html5': return '#E34F26';
      case 'css':
      case 'css3': return '#1572B6';
      case 'javascript':
      case 'js': return '#F7DF1E';
      case 'bootstrap': return '#7952B3';
      case 'swift': return '#F05138';
      case 'swiftui': return '#F05138';
      case 'aws': return '#FF9900';
      case 'aws ec2': return '#FF9900';
      case 'aws s3': return '#FF9900';
      case 'google cloud': return '#4285F4';
      case 'google cloud e2': return '#4285F4';
      case 'tkinter': return '#5B9BD5';
      case 'jsp': return '#007396';
      case 'mongodb': return '#47A248';
      case 'vite': return '#646CFF';
      case 'flask': return '#000000';
      case 'postgis': return '#336791';
      case 'c++': return '#00599C';
      case 'c': return '#03599C'; // Match icon color to background
      case 'rust': return '#CE422B';
      case 'turtle': return '#3776AB';
      case 'mapbox': return '#4264FB';
      case 'uikit': return '#007AFF';
      default: return '#888888';
    }
  };

  // Create semi-transparent background color for frosted glass effect
  const bgColor = useMemo(() => {
    const color = getIconColor();
    if (color === '#000000') {
      return 'rgba(60, 60, 60, 0.15)';
    }
    
    // Convert hex color to RGB with transparency
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, 0.15)`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const getIcon = () => {
    const iconClass = `icon-${name.toLowerCase().replace('.', '').replace(' ', '-')}`;
    
    switch (name.toLowerCase()) {
      case 'react':
        return <FaReact className={iconClass} style={{ color: '#61DAFB' }} />;
      case 'node.js':
      case 'node':
        return <FaNodeJs className={iconClass} style={{ color: '#339933' }} />;
      case 'express':
      case 'express.js':
        return <SiExpress className={iconClass} style={{ color: '#000000' }} />;
      case 'java':
        return <FaJava className={iconClass} style={{ color: '#007396' }} />;
      case 'python':
        return <FaPython className={iconClass} style={{ color: '#3776AB' }} />;
      case 'mysql':
        return <SiMysql className={iconClass} style={{ color: '#4479A1' }} />;
      case 'postgresql':
        return <SiPostgresql className={iconClass} style={{ color: '#336791' }} />;
      case 'html':
      case 'html5':
        return <FaHtml5 className={iconClass} style={{ color: '#E34F26' }} />;
      case 'css':
      case 'css3':
        return <FaCss3Alt className={iconClass} style={{ color: '#1572B6' }} />;
      case 'javascript':
      case 'js':
        return <FaJs className={iconClass} style={{ color: '#F0DB4F' }} />;
      case 'bootstrap':
        return <FaBootstrap className={iconClass} style={{ color: '#7952B3' }} />;
      case 'swift':
        return <FaSwift className={iconClass} style={{ color: '#F05138' }} />;
      case 'swiftui':
        return <FaSwift className={iconClass} style={{ color: '#F05138' }} />;
      case 'aws':
        return <FaAws className={iconClass} style={{ color: '#FF9900' }} />;
      case 'aws ec2':
        return <SiAmazonec2 className={iconClass} style={{ color: '#FF9900' }} />;
      case 'aws s3':
        return <SiAmazons3 className={iconClass} style={{ color: '#FF9900' }} />;
      case 'google cloud':
        return <SiGooglecloud className={iconClass} style={{ color: '#4285F4' }} />;
      case 'google cloud 2':
        return <SiGooglecloud className={iconClass} style={{ color: '#4285F4' }} />;
      case 'google cloud e2':
        // Use Google Cloud icon for E2
        return <SiGooglecloud className={iconClass} style={{ color: '#4285F4' }} />;
      case 'tkinter':
        return <FaDesktop className={iconClass} style={{ color: '#5B9BD5' }} />;
      case 'jsp':
        return <FaJava className={iconClass} style={{ color: '#007396' }} />;
      case 'mongodb':
        return <SiMongodb className={iconClass} style={{ color: '#47A248' }} />;
      case 'vite':
        return <SiVite className={iconClass} style={{ color: '#646CFF' }} />;
      case 'flask':
        return <FaFlask className={iconClass} style={{ color: '#000000' }} />;
      case 'postgis':
        return <SiPostgresql className={iconClass} style={{ color: '#336791' }} />;
      case 'c++':
        return <SiCplusplus className={iconClass} style={{ color: '#004482' }} />;
      case 'c':
        return <SiC className={iconClass} style={{ color: '#03599C' }} />;
      case 'rust':
        return <SiRust className={iconClass} style={{ color: '#CE422B' }} />;
      case 'turtle':
        return <FaPython className={iconClass} style={{ color: '#3776AB' }} />;
      case 'mapbox':
        return <SiMapbox className={iconClass} style={{ color: '#4264FB' }} />;
      case 'uikit':
        return <span className={iconClass} style={{ color: '#007AFF', fontWeight: 'bold', fontSize: '1.1rem' }}>UI</span>;
      default:
        return <span className="tech-name">{name}</span>;
    }
  };

  return (
    <div className="tech-icon" style={{ 
      background: bgColor, 
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: '10px',
      padding: '7px 12px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '6px',
      boxShadow: `0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)`
    }}>
      {getIcon()}
      <span className="tech-label">{name}</span>
    </div>
  );
};

export default TechIcon;
