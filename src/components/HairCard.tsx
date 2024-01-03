import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Text } from "@chakra-ui/react";

// Updated type to include optional image and URL
type ContentItemType = {
  image?: string;
  title: string;
  url?: string; // Optional URL for links
};

const MovieCard = ({ movie }: { movie: ContentItemType }) => {
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
      m="0px 0px 15px 30px"
      textAlign="center"
    >
      {movie.image && (
        <Image
          src={movie.image}
          alt={movie.title}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.6)"
          height="500px"
          width="100%"
          objectFit="cover"
          borderRadius="8px 8px 0 0"
        />
      )}
      <Text fontSize="md" fontWeight="bold" mt="2">
        {movie.title}
      </Text>
    </Box>
  );
};

// Updated propTypes
MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string, // No longer required
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
