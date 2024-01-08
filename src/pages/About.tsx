import React from "react";
import { Box, Center, Flex, Image, Text, Heading } from "@chakra-ui/react";
import Booking from "./Bookings";
import bgImage from "../assets/morvaridImage.png";

function About() {
  return (
    <Flex
      direction={["column", "row-reverse"]}
      backgroundColor="rgb(240, 234, 222)"
      padding="30px 100px"
      margin="0px 50px"
      position="relative"
    >
      <Image
        maxHeight="500px"
        maxWidth="100%"
        marginRight="-100px"
        src={bgImage}
      />
      <Box flex="1">
        <Heading fontFamily="Playfair Display SC" marginBottom="40px">
          "The beauty you see in me is a reflection of you." -Rumi
        </Heading>
        <Text fontSize="lg" color="gray.600">
          With two decades of passion and creativity in the world of
          hairstyling, Morvaid stands as a seasoned master hairstylist. Her
          journey began 20 years ago, and since then, she has been transforming
          the locks and lives of countless clients.
        </Text>
        <Text fontSize="lg" color="gray.600" mt="4">
          Morvaid's commitment to her craft goes beyond just cutting and styling
          hair. She believes in creating personalized experiences for each
          client, understanding their unique preferences, and bringing out the
          best in their natural beauty.
        </Text>
        <Text fontSize="lg" color="gray.600" mt="4">
          Whether you're looking for a fresh new look, a classic style, or
          expert advice on maintaining your hair's health, Morvaid's expertise
          and artistic touch will leave you feeling confident and beautiful.
        </Text>
        <Center position="absolute" bottom="90px" left="-5%" width="100%">
          <Booking />
        </Center>
      </Box>
    </Flex>
  );
}

export default About;
