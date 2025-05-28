import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalMenu from '../components/navbar.tsx';
import { Analytics } from "@vercel/analytics/react";
import PathDrawing from '../components/map.tsx';

import japan_light from '../assets/page_light.svg';
import japan_dark from '../assets/page_dark.svg';
import italy_light from '../assets/italy_light.svg';
import italy_dark from '../assets/italy_dark.svg';
import france_light from '../assets/france_light.svg';
import france_dark from '../assets/france_dark.svg';

import { Moon, Sun, ArrowUp  } from 'lucide-react';

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

const Home: React.FC = () => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    return localStorage.getItem('selectedCountry') || 'japan';
  });
  
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

    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) setSelectedCountry(savedCountry);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Persist selected country
  useEffect(() => {
    localStorage.setItem('selectedCountry', selectedCountry);
  }, [selectedCountry]);

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
    {/*  VERCEL MODULES */}
    <Analytics />

    {/* Load menu */}
    <div className="menu-container ">
      <VerticalMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>

    <main>
      {/* Intro Part */}
      <div className="intro  snap-scroll">
        <div className="page-card-wide instrument-serif-regular">
        <h4 className="animate-on-scroll">
          {selectedCountry.toLowerCase() === 'japan' ? (
            <span className="instrument-serif-regular-italic text-highlight">Diego Brandjes</span>
          ) : (
            <span className="instrument-serif-regular-italic text-highlight-yellow">Diego Brandjes</span>
          )}
          — a Travel Photographer with a passion for video editing. I
          capture the world through my lens and enjoy creating compelling stories
          with my visuals.
          <br />
        </h4>
          <p className="animate-on-scroll poppins-thin">Scroll for more</p>
        </div>
      </div>


    <div className="darkmode-selector">
      <a onClick={toggleDarkMode} className="poppins-thin" style={{ cursor: 'pointer' }}>
        {darkMode ? <Sun strokeWidth={0.75} size={30} /> : <Moon strokeWidth={0.75} size={30} />}
      </a>
    </div>

      {/* Page logo */}
      <section className="animate-on-scroll">
      <div className="page-banner  snap-scroll">
      <img
        src={
          (() => {
            const country = selectedCountry.toLowerCase();
            const imageMap: Record<string, { light: string; dark: string }> = {
              japan: { light: japan_light, dark: japan_dark },
              italy: { light: italy_light, dark: italy_dark },
              france: { light: france_light, dark: france_dark },
            };

            const fallback = { light: japan_light, dark: japan_dark };
            const countryImages = imageMap[country] || fallback;
            return darkMode ? countryImages.dark : countryImages.light;
          })()
        }
        loading="lazy"
        alt="Logo"
        className="animate-on-scroll"
      />
      </div>
        {/* Key changes when selectedCountry changes */}
        <div className='paralax'>
          <PathDrawing key={selectedCountry} darkMode={darkMode} country={selectedCountry} />
        </div>
      </section>

      <section className="chapter-banner animate-on-scroll poppins-thin">
        {data.countries.map((country, i) => (
          <React.Fragment key={i}>
            <button
              className={`grey ${darkMode ? 'dark' : 'light'}`}
              style={{
                cursor: 'pointer',
                border: 'none',
                font: 'inherit',
              }}
              onClick={() => setSelectedCountry(country.country.toLowerCase())}
            >
              <p>{country.country}</p>
            </button>
            {i < data.countries.length - 1 && (
              <p className={`grey ${darkMode ? 'dark' : 'light'}`}>|</p>
            )}
          </React.Fragment>
        ))}
      </section>
      
      <div className="chapter-fill"></div>

      {/* Country Content */}
      <div className="country-section">
        {data.countries
          .filter((c) => c.country.toLowerCase() === selectedCountry)
          .map((country) =>
            country.chapters.map((item, index) => (
              <React.Fragment key={index}>
                <div className="chapter snap-scroll">
                  <div className="page-card-small animate-on-scroll">
                    <a href={item.link}>
                      <img src={item.image || 'placeholder.jpg'} alt={item.chapter} />
                    </a>
                  </div>
                  <div className="page-card-small animate-on-scroll instrument-serif-regular page-card-text">
                    <h1 className="poppins-bold">{item.chapter}</h1>
                    <p>{item.paragraphs && item.paragraphs.length > 0 ? item.paragraphs[0] : ''}</p>
                    <a className={`grey ${darkMode ? 'dark' : 'light'}`} href={item.link}>
                      <p>See more →</p>
                    </a>
                  </div>

                </div>
              </React.Fragment>
            ))
          )}
      </div>

      {/* About Page */}
      <div id="about-section" className="chapter snap-scroll">
        <div className="page-card-tiny animate-on-scroll instrument-serif-regular">
          <h1 className="poppins-bold">About Me</h1>
        </div>
        <div className="page-card-tiny"></div>
        <div className="page-card-tiny instrument-serif-regular">
          <p>
            I'm Diego, a 25-year-old Dutch guy who loves to explore and travel around, taking things one step at a time. Whether its getting lost in a new city, trying dishes I can't pronounce, or just soaking in the local vibe, I'm all about the little moments that make a trip unforgettable. I'm not in a rush—just out here collecting stories, meeting people, and seeing where the road leads.
          </p>
        </div>
        <div className="page-card-tiny poppins-thin extra-padding">
          <ul className='main-nav'>
            <li><h3>Fujifilm XT30II 26.1MP</h3></li>
            <li><h3>X-Trans CMOS 4</h3></li>
            <li><h3>Aspect Ratio 3:2</h3></li>
            <li><h3>6240x4160</h3></li>
            <li><h3>-</h3></li>
            <li ><a href="mailto:diegobrandjes@hotmail.com"><h3>Contact</h3></a></li>
            <li><h3>© 2025</h3></li>
          </ul>
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
export default Home;
