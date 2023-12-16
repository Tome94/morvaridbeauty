import React from "react";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Booking from "../pages/Bookings";
const Navigation = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <About />
          </li>
          <li>
            <Pricing />
          </li>
          <li>
            <Booking />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
