import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import { Box, Center } from "@chakra-ui/react";
import MovieCard from "../components/HairCard";
import movies from "../utils/HairModels";
import About from "./About";
import Calender from "../components/calender";

const HomePage = () => {
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
    <Box bgColor="#323232" pt="200px">
      {" "}
      {/* Add padding top to create space below the fixed header */}
      <About />
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Slider>
      <Calender />
    </Box>
  );
};

export default HomePage;
