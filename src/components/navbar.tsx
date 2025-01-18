// src/components/VerticalMenu.tsx
import React from 'react';
import './navbar.css';

const VerticalMenu: React.FC = () => {
  return (
    <div className="poppins-bold vertical-menu">
      <div className='margins'>
      <a href="/home" aria-current="page" className="">
            <img 
              src="/logo.svg"
              loading="lazy" 
              alt="Logo" 
              className="logo" 
            />
          </a>
      
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
      </div>
    </div>
  );
};

export default VerticalMenu;