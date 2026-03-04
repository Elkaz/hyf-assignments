import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import DestinationPage from "./pages/DestinationPage/DestinationPage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import NasaCollaboration from "./pages/NasaCollaborationPage/NasaCollaborationPage.jsx";

import "./main.css";

// 🧑🏽‍🚀 Task - Week 4 - part 1
// Create a Wishlist context to share the wishlist data across components. 
// There is a /src/contexts folder- you will have to create a new file there.
// You will have to import and use the context provider here, so that all routes can access the context.
// The context should have the following properties:
// - planetsWishlist: an array of objects, each with a name and a thumbnail property.
// - addPlanetToWishlist: a function that adds an item to the wishlist.
// - removePlanetFromWishlist: a function that removes an item from the wishlist.
// - isPlanetInWishlist: a function that checks if an item is in the wishlist.
// - wishlistCount: a number that represents the number of items in the wishlist.
// ❗ NOTE: you have already created some of the above in other components. Copy those implementations into the context and adjust them if needed.

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