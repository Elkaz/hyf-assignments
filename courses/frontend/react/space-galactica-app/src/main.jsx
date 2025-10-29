import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import DestinationPage from "./pages/DestinationPage/DestinationPage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import NasaCollaboration from "./pages/NasaCollaborationPage/NasaCollaborationPage.jsx";

import "./main.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { 
          index: true,
          element: <HomePage /> 
      },
      {
        path: "/destination",
        element: <DestinationPage />,
      },
      {
        path: "/about_us",
        element: <AboutUsPage />,
      },
      {
        path: "/nasa_collaboration",
        element: <NasaCollaboration />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);