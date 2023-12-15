// HomePage.tsx
import React, { useState } from "react";
import { Link, Element } from "react-scroll";
import images from "../utils/ImageLoader";
import "../App.css";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"; // Import arrow icons

const HomePage = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    const lastIndex = images.length - 1;
    let newStartIndex;

    if (direction === "left") {
      newStartIndex = startIndex === 0 ? lastIndex - 3 : startIndex - 1;
    } else {
      newStartIndex = startIndex === lastIndex - 3 ? 0 : startIndex + 1;
    }

    setStartIndex(newStartIndex);
  };

  console.log(images);

  return (
    <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
      <HStack>
        <IconButton
          aria-label="Scroll Left"
          icon={<ChevronLeftIcon />}
          onClick={() => handleScroll("left")}
        />
        {images.slice(startIndex, startIndex + 4).map((image, index) => (
          <Box
            key={index}
            boxSize="40vh"
            height="80vh"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
            border="2px"
            m="2"
          />
        ))}
        <IconButton
          aria-label="Scroll Right"
          icon={<ChevronRightIcon />}
          onClick={() => handleScroll("right")}
        />
      </HStack>
    </Box>
  );
};

export default HomePage;
