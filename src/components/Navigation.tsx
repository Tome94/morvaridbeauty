import React from "react";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Booking from "../pages/Bookings";
import { HStack } from "@chakra-ui/react";
const Navigation = () => {
  return (
    <HStack>
      <About />
      <Pricing />
      <Booking />
    </HStack>
  );
};

export default Navigation;
