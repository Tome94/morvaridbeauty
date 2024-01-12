import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import { Box } from "@chakra-ui/react";
import HairCard from "../components/HairCard";
import hairs from "../utils/HairModels";
import About from "./About";

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
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box bgColor="#323232" pt="200px">
      {" "}
      <About />
      <Slider {...settings}>
        {hairs.map((hair) => (
          <HairCard hair={hair} key={hair.id} />
        ))}
      </Slider>
    </Box>
  );
};

export default HomePage;
