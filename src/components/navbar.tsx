import React, { useState, useEffect } from "react";
import "./navbar.css";

const VerticalMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Update `isMobile` based on screen size
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    updateScreenSize(); // Initialize state on mount
    window.addEventListener("resize", updateScreenSize); // Update on resize

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <div className="vertical-menu">
      {/* SVG Button */}
      <button
        className="menu-toggle-button"
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <img
          src="/src/assets/logo.svg"
          loading="lazy"
          alt="Menu"
          className="vertical-menu-item"
        />
      </button>
      <nav className='poppins-thin main-nav'>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>

     {/* Full-Screen Pop-up Menu */}
     <div className={`fullscreen-popup-menu ${isMenuOpen && isMobile ? "open" : ""}`}>
      <nav className=" poppins-thinpopup">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a onClick={toggleMenu}>Close</a></li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default VerticalMenu;
