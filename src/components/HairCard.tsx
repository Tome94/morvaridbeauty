import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Text } from "@chakra-ui/react";

type MovieType = {
  image: string;
  title: string;
};

const MovieCard = ({ movie }: { movie: MovieType }) => {
  return (
    <Box
      maxW="350px"
      bgColor="white"
      position="relative"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.9)"
      borderRadius="15px"
      overflow="hidden"
      p="20px"
      pt="20px"
      pb="40px"
      m="0 30px"
      textAlign="center"
    >
      <Image
        src={movie.image}
        alt={movie.title}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.6)"
        height="500px"
        width="100%"
        objectFit="cover"
        borderRadius="8px 8px 0 0"
      />
      <Text fontSize="md" fontWeight="bold" mt="2">
        {movie.title}
      </Text>
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
