import React, { useEffect, useState } from 'react';
import VerticalMenu from '../components/navbar.tsx';
import { Moon, Sun, ArrowUp  } from 'lucide-react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const gallery: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { chapterSlug } = useParams();
  const [imageList, setImageList] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

useEffect(() => {
  if (imageList.length === 0) return; // don't run if no images yet

  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    },
    { threshold: 0.15 }
  );

  elementsToAnimate.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}, [imageList]);
useEffect(() => {
  const loadManifest = async () => {
    try {
      const res = await fetch(`https://media.brandjes.me/${chapterSlug}/manifest.json`);

      if (!res.ok) {
        throw new Error(`Manifest not found (${res.status})`);
      }

      const json = await res.json();

      // Basic validation check — adjust as needed
      if (!json || !json.images || !Array.isArray(json.images) || json.images.length === 0) {
        throw new Error("Invalid or empty manifest data");
      }

      setImageList(json.images);
      setDescription(json.description || "");
      setTitle(json.title || "");
    } catch (err) {
      console.error("Manifest fetch failed:", err);
      navigate("/page-not-found"); // Redirect on error
    }
  };

  loadManifest();
}, [chapterSlug, navigate]);
  
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
      <div className="chapter-fill"></div>
    

    {/* Gallery Content */}
    <div className="country-section snap-scroll">
      {/* First chapter block: first image + text */}
      {imageList.length >= 0 && (
        <div className="chapter snap-scroll">
          <div className="page-card-small animate-on-scroll">
            <img
              src={`https://media.brandjes.me/${chapterSlug}/${imageList[0]}`}
              alt={`${chapterSlug} 0`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'placeholder.webp';
              }}
            />
          </div>

          <div className="page-card-small animate-on-scroll instrument-serif-regular page-card-text">
            <h1 className="poppins-bold">{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      )}

      {/* Remaining images side-by-side stacked downwards */}
      <div className="chapter snap-scroll">
        {imageList.slice(1).map((img, i) => (
          <div key={i + 1} className="page-card-small animate-on-scroll">
            <img
              src={`https://media.brandjes.me/${chapterSlug}/${img}`}
              alt={`${chapterSlug} ${i + 1}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'placeholder.webp';
              }}
            />
          </div>
        ))}
      </div>
      <div className="chapter-fill"></div>
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
