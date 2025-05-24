import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalMenu from '../components/navbar.tsx';

interface Post {
  post: string;
  date: string;
  paragraphs: string[];
}

interface PageData {
  posts: Post[];
}

const Blog: React.FC = () => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState(false); // ✅ Add this line
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);
  }, []); // ✅ Fixed dependency array

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/blog.json`);
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
  <body className={darkMode ? 'dark' : 'light'}>

    {/* Load menu */}
      <div className="menu-container ">
        <VerticalMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <main>
        <div className="chapter chapter-fill"></div>
        {data.posts.map((item, index) => (
          <React.Fragment key={index}>
            <div className="chapter snap-scroll">
                <div className="animate-on-scroll page-card-blog poppins-thin page-card-text">
                    <ul>
                        <li><h3>{item.post}</h3></li>
                        <li><h3>{item.date}</h3></li>
                    </ul>
                </div>
                <div className="animate-on-scroll page-card-blog poppins-thin page-card-text">
                  <p>{item.paragraphs && item.paragraphs.length > 0 ? item.paragraphs[0] : ''}</p>
                </div>


            </div>
          </React.Fragment>
        ))}

      </main>
    </body>
  );
};

export default Blog;
