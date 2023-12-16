// Header.js

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Navigation from "./Navigation";

// Import or define your background image
import headerImage from "../assets/logoblackcrop.png";

const Header = () => {
  return (
    <Box
      backgroundImage={`url(${headerImage})`}
      backgroundPosition="left"
      backgroundSize="contain"
      color="white"
      py="4"
      height="200px"
      backgroundRepeat="no-repeat"
    >
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="lg"></Heading>
        <Navigation />
      </Flex>
    </Box>
  );
};

export default Header;
