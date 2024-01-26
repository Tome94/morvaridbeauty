import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import { Box, Flex } from "@chakra-ui/react";
import HairCard from "../components/HairCard";
import hairs from "../utils/HairModels";
import About from "./About";
import MapComponent from "../components/MapComponent";
import InfoCard from "../components/InfoCard";

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
  const businessInfo = {
    name: "Morvarid @ Nola Salon",
    address: "390 Steeles Ave W, Thornhill, CA",
    phone: "(416) 843-9911",
    hours: [
      "Monday: 10 a.m.–7 p.m.",
      "Tuesday: 10 a.m.–7 p.m.",
      "Wednesday: 10 a.m.–7 p.m.",
      "Thursday: 10 a.m.–7 p.m.",
      "Friday: 10 a.m.–7 p.m.",
      "Saturday: 10 a.m.–7 p.m.",
      "Sunday: Closed",
    ],
  };
  return (
    <Box bgColor="#323232" pt={{ base: "200px", md: "200px" }}>
      <About />
      <Slider {...settings}>
        {hairs.map((hair) => (
          <HairCard hair={hair} key={hair.id} />
        ))}
      </Slider>
      <Flex
        direction={{ base: "column", md: "row" }}
        backgroundColor="rgb(240, 234, 222)"
        m={{ base: "30px 10px 0px 10px", md: "60px 50px 0px 50px" }} // Responsive margin
        p={{ base: "0px", md: "30px" }} // Responsive padding
        align="center"
        justify="center"
      >
        <MapComponent />
        <InfoCard
          name={businessInfo.name}
          address={businessInfo.address}
          phone={businessInfo.phone}
          hours={businessInfo.hours}
        />
      </Flex>
    </Box>
  );
};

export default HomePage;
