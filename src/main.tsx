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
import Blog from './blog/blog.tsx'
import NotFound from './notfound/notfound.tsx'

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
    path: "/blog",
    element: <Blog />,
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