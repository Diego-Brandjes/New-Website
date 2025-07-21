import React, { useEffect, useState } from 'react';
import VerticalMenu from '../components/navbar.tsx';
import { Moon, Sun, ArrowUp  } from 'lucide-react';
import { useParams } from "react-router-dom";

const gallery: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);


  const { chapterSlug } = useParams();
  const [imageList, setImageList] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const placeholderImage = (
  <div className="placeholder-image">
    <svg width="100%" height="90vh" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6" />
      <text x="50%" y="50%" textAnchor="middle" fill="#9ca3af" fontSize="18" dy=".3em">
        No Images Available
      </text>
    </svg>
  </div>
);

  useEffect(() => {
    const loadManifest = async () => {
      try {
        const res = await fetch(`https://<your-r2-domain>/${chapterSlug}/manifest.json`);
        const json = await res.json();
        setImageList(json.images);
        setDescription(json.description);
      } catch (err) {
        console.error("Manifest fetch failed", err);
      }
    };

    loadManifest();
  }, [chapterSlug]);
  
const scrollToTop = () => {
  const main = document.querySelector('main');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Remember user preference using localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);

  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);


  // Main body
return (
  <div className={darkMode ? 'dark' : 'light'}>

    {/* Load menu */}
    <div className="menu-container ">
      <VerticalMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>

    <main>

    <div className="darkmode-selector">
      <a onClick={toggleDarkMode} className="poppins-thin" style={{ cursor: 'pointer' }}>
        {darkMode ? <Sun strokeWidth={0.75} size={30} /> : <Moon strokeWidth={0.75} size={30} />}
      </a>
    </div>
      
    {/* Gallery Header */}
    {/* <div className="chapter snap-scroll">
      <div className="page-card-small animate-on-scroll">
        <h1 className="poppins-bold">{chapterSlug}</h1>
      </div>
    </div> */}

    {/* Gallery Images (reusing card layout) */}
    <div className="country-section">
      <div className="chapter snap-scroll">
        {imageList.length > 0 ? (
          imageList.map((img, i) => (
            <div key={i} className="page-card-small animate-on-scroll">
              <img
                src={`https://media.diegobrandjes.com/${chapterSlug}/${img}`}
                alt={`${chapterSlug} ${i}`}
                loading="lazy"
              />
            </div>
          ))
        ) : (
          placeholderImage
        )}
      </div>
    </div>

    </main>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${darkMode ? 'dark' : 'light'}`}
        aria-label="Back to Top"
      >
        <ArrowUp strokeWidth={0.75} size={30} />
      </button>
  </div>
);
}
export default gallery;
