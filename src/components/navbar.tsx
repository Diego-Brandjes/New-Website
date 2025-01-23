// src/components/VerticalMenu.tsx
import React from 'react';
import './navbar.css';

const VerticalMenu: React.FC = () => {
  return (
    <div className="vertical-menu">
      <a href="/home" aria-current="page" className="">
            <img 
              src="/logo.svg"
              loading="lazy" 
              alt="Logo" 
              className="vertical-menu-item" 
            />
          </a>
      
      <nav className='poppins-bold magic-button'>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default VerticalMenu;