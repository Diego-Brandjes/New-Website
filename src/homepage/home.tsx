import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalMenu from '../components/navbar.tsx';
import { Analytics } from "@vercel/analytics/react";
import page from "/src/assets/page.svg";

interface Chapter {
  chapter: string;
  link: string;
  banner: string;
  image: string;
  paragraphs: string[];
}

interface PageData {
  chapters: Chapter[];
}

const Home: React.FC = () => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically set the background image via CSS variable
    const root = document.documentElement;
    root.style.setProperty('--bg-image-parallax1', `url('/path/to/your/image1.jpg')`);
  }, []);

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

  // Setup scroll animations after data is loaded
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
  }, [loading]); // Run when loading is set to false

  // If data is not loaded, show loading screen
  if (loading) {
    return (
      <div className="notfound-page">
        {/* Loading content */}
      </div>
    );
  }

  // If no data found, return null (handled by navigation)
  if (!data) {
    return null;
  }



  // Main body
  return (
    <body className="body">

      {/*  VERCEL MODULES */}
      <Analytics/>


      {/* Load menu */}
      <div className="menu-container ">
        <VerticalMenu />
      </div>

      <main>
        {/* Page banner */}
        <div className="page-banner  snap-scroll">
          <img
            src={page}
            loading="lazy"
            alt="Logo"
            className="logo animate-on-scroll"
          />
        </div>

        {/* First background parallax */}
        <section className="parallax bg"></section>

        {/* Intro Part */}
        <div className="intro  snap-scroll">
          <div className="page-card-wide poppins-thin">
            <h4 className="animate-on-scroll extra-padding">
              I'm Diego — a Travel Photographer with a passion for video editing. I
              capture the world through my lens and enjoy creating compelling stories
              with my visuals.
            </h4>
            <p className="animate-on-scroll">Scroll for more</p>
          </div>
        </div>

        {data.chapters.map((item, index) => (
        <React.Fragment key={index}>
          {/* <section
            className="parallax chapter-banner"
            style={{
              '--bg-image': `url(${item.banner || 'default-image.png'})`,
            } as React.CSSProperties} // Cast style to React.CSSProperties
          ></section> */}

          <div className="chapter snap-scroll">
            <div className="page-card-small animate-on-scroll poppins-thin page-card-text">
              <h1 className="poppins-bold">{item.chapter}</h1>
              <p>{item.paragraphs && item.paragraphs.length > 0 ? item.paragraphs[0] : ''}</p>
              <a className="grey" href={item.link}>
                <p>See more →</p>
              </a>
            </div>

            <div className="page-card-small animate-on-scroll">
              <a href={item.link}>
                <img src={item.image || 'default-image.png'} alt={item.chapter} />
              </a>
            </div>
              <div className='chapter-fill'></div>
          </div>
        </React.Fragment>
      ))}


        {/* About Page */}
        <div className="chapter snap-scroll">
        <div className="page-card-tiny animate-on-scroll poppins-thin">
              <h1 className="poppins-bold">About Me</h1>
            </div>
            <div className="page-card-tiny poppins-thin"></div>
            <div className="page-card-tiny poppins-thin">
              <p>
              I'm Diego, a 25-year-old Dutch guy who loves to explore and travel around, taking things one step at a time. Whether its getting lost in a new city, trying dishes I can't pronounce, or just soaking in the local vibe, I'm all about the little moments that make a trip unforgettable. I'm not in a rush—just out here collecting stories, meeting people, and seeing where the road leads.              
              </p>
            </div>
            <div className="page-card-tiny poppins-thin extra-padding">
              <ul>
                <li><h3>Fujifilm XT30II</h3></li>
                <li><h3>26.1MP</h3></li>
                <li><h3>X-Trans CMOS 4</h3></li>
                <li><h3>6240x4160</h3></li>
                <li><h3>Aspect Ratio 3:2</h3></li>
                <li><h3>-</h3></li>
                <li><a href="mailto:diegobrandjes@hotmail.com"><h3>Contact</h3></a></li>
                <li><h3>-</h3></li>
                <li><h3>© 2025</h3></li>
              </ul>
            </div>
          </div>
          <div className="chapter snap-scroll"></div>
          </main>
    </body>
  );
};

export default Home;
