// HomePage.tsx
import React from "react";
import Slider from "react-slick"; // Import the Slider component
import "./slick.css"; // Import slick carousel CSS
import "./slick-theme.css"; // Import slick carousel theme CSS
import { Box, Center } from "@chakra-ui/react";
import MovieCard from "../components/HairCard";
import data from "./mock.json";

const HomePage = () => {
  // Settings for the react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
    <Slider {...settings}>
      {data.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </Slider>
  );
};

export default HomePage;
