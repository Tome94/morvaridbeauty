import React from "react";
import { Box, Center, Flex, Image, Text, Heading } from "@chakra-ui/react";
import Booking from "./Bookings";
import bgImage from "../assets/morvaridImage.png";

function About() {
  return (
    <Flex
      direction={["column", "column", "row-reverse"]}
      backgroundColor="rgb(240, 234, 222)"
      padding={["20px", "30px 50px", "30px 100px"]}
      margin={["0px", "0px 30px", "0px 50px"]}
      position="relative"
    >
      <Image
        height="40%"
        width="40%"
        marginRight={["0px", "0px", "-50px"]}
        mb={["20px", "20px", "0px"]}
        src={bgImage}
      />
      <Box flex="1" marginBottom="50px">
        <Heading
          fontFamily="Playfair Display SC"
          marginBottom="20px"
          fontSize={["xl", "2xl", "3xl"]}
        >
          "The beauty you see in me is a reflection of you." -Rumi
        </Heading>
        <Text fontSize={["md", "lg", "xl"]} color="gray.600">
          With two decades of passion and creativity in the world of
          hairstyling, Morvaid stands as a seasoned master hairstylist. Her
          journey began 20 years ago, and since then, she has been transforming
          the locks and lives of countless clients.
        </Text>
        <Text fontSize={["md", "lg", "xl"]} color="gray.600" mt="4">
          Morvaid's commitment to her craft goes beyond just cutting and styling
          hair. She believes in creating personalized experiences for each
          client, understanding their unique preferences, and bringing out the
          best in their natural beauty.
        </Text>
        <Text fontSize={["md", "lg", "xl"]} color="gray.600" mt="4">
          Whether you're looking for a fresh new look, a classic style, or
          expert advice on maintaining your hair's health, Morvaid's expertise
          and artistic touch will leave you feeling confident and beautiful.
        </Text>
        <Center
          position={["relative"]}
          left={["0%", "0%", "-5%"]}
          width="100%"
          marginTop="20px"
        >
          <Booking />
        </Center>
      </Box>
    </Flex>
  );
}

export default About;
