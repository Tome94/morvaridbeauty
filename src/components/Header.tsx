// Header.js

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Navigation from "./Navigation";
import headerImage from "../assets/logoblackcrop.png";

const Header = () => {
  return (
    <Box
      backgroundImage={`url(${headerImage})`}
      backgroundPosition="left"
      backgroundSize="contain"
      bgColor="#323232"
      py="4"
      height="200px"
      backgroundRepeat="no-repeat"
      position="fixed" // Set the position to fixed
      top="0" // Stick to the top of the viewport
      left="0"
      right="0"
      zIndex="1000" // Adjust the zIndex as needed
    >
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="lg"></Heading>
        <Navigation />
      </Flex>
    </Box>
  );
};

export default Header;
