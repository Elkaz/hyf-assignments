import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";

export const metadata = {
  title: "Galactica",
  description: "Your space travel agency",
};

export const RootLayout = () => {
  return (
    <div className="inter">
      <Navbar />
      <Outlet />
      {/* Task - Week 1 */}
      {/* Import and use the Footer component here */}
      {/* Footer found in the ui/Footer.js folder */}
    </div>
  );
}

export default RootLayout;