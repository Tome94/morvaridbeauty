import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

// Define a type for the movie prop
type MovieType = {
  image: string;
  title: string;
};

const MovieCard = ({ movie }: { movie: MovieType }) => {
  return (
    <Box
      maxW="250px"
      position="relative"
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box position="relative">
        <Image
          src={movie.image}
          alt={movie.title}
          height="350px"
          width="100%"
          objectFit="cover"
        />
      </Box>

      <VStack spacing={2} align="stretch" p={4}>
        <Text fontSize="lg" fontWeight="bold">
          {movie.title}
        </Text>
      </VStack>
    </Box>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
