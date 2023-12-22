// HomePage.tsx
import React from "react";
import Slider from "react-slick"; // Import the Slider component
import "./slick.css"; // Import slick carousel CSS
import "./slick-theme.css"; // Import slick carousel theme CSS
import { Box, Center } from "@chakra-ui/react";
import MovieCard from "../components/HairCard";
import data from "./mock.json";
import movies from "../utils/HairModels";

const HomePage = () => {
  // Settings for the react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      // Add more breakpoints as needed
    ],
  };

  return (
    <Box bgColor="#323232">
      {" "}
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </Slider>
    </Box>
  );
};

export default HomePage;
