import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// load css
import "./fonts.css";
import "./index.css";
import "./animation.css";
import "./components/navbar.css"

// Load pages
import Home from './homepage/home.tsx'
import NotFound from './notfound/notfound.tsx'
import GalleryPage from './gallery/gallery.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
  path: "/:chapterSlug",
  element: <GalleryPage />
  },
  {
    path: "*",  // Catch-all route
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)