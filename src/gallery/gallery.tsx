import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalMenu from '../components/navbar.tsx';
import { Moon, Sun, ArrowUp  } from 'lucide-react';
import { useParams } from "react-router-dom";

interface Chapter {
  chapter: string;
  link: string;
  banner: string;
  image: string;
  paragraphs: string[];
}

interface Country {
  country: string;
  chapters: Chapter[];
}

interface PageData {
  countries: Country[];
}

const gallery: React.FC = () => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [selectedCountry] = useState<string>(() => {
    return localStorage.getItem('selectedCountry') || 'japan';
  });

  const { chapterSlug } = useParams();
  const [imageList, setImageList] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

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

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/page.json`);
        if (!response.ok) {
          throw new Error('Page not found');
        }
        const result: PageData = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/page-not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Setup scroll animations after data is loaded and selectedCountry changes
  useEffect(() => {
    if (!loading) {
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

      elementsToAnimate.forEach((element) => observer.observe(element));

      // Cleanup observer on component unmount
      return () => observer.disconnect();
    }
  }, [loading, selectedCountry]); // Depend on selectedCountry

  // If data is not loaded, show loading screen
  if (loading) {
    return (
      <div className="notfound-page"></div>
    );
  }

  // If no data found, return null (handled by navigation)
  if (!data) {
    return null;
  }

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
        {imageList.map((img, i) => (
          <div key={i} className="page-card-small animate-on-scroll">
            <img
              src={`https://media.diegobrandjes.com/${chapterSlug}/${img}`}
              alt={`${chapterSlug} ${i}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>

    <div className="gallery-page">
      <p>{description}</p>
      <div className="image-grid">
      {imageList.map((img, i) => (
        <img
          key={i}
          src={`https://<your-r2-domain>/${chapterSlug}/${img}`}
          alt={`${chapterSlug} ${i}`}
          loading="lazy"
        />
      ))}
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
