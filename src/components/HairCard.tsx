import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Text, Link } from "@chakra-ui/react";

// Updated type to include optional image and URL
type ContentItemType = {
  image?: string;
  title: string;
  url?: string; // Optional URL for links
};

const MovieCard = ({ movie }: { movie: ContentItemType }) => {
  return (
    <Link
      href={movie.url} // Use "#" if no URL is provided
      _hover={{ textDecoration: movie.url ? "underline" : "none" }}
      isExternal={!!movie.url} // Open link in a new tab if URL is provided
      display="block"
    >
      <Box
        maxW="400px"
        bgColor="white"
        position="relative"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.9)"
        borderRadius="15px"
        overflow="hidden"
        p="20px"
        pt="20px"
        pb="40px"
        m="50px 0px 15px 30px"
        textAlign="center"
      >
        {movie.image && (
          <Image
            src={movie.image}
            alt={movie.title}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.6)"
            height="500px"
            width="100%"
            objectFit="contain"
            borderRadius="8px 8px 0 0"
          />
        )}
        <Text fontSize="md" fontWeight="bold" mt="2">
          {movie.title}
        </Text>
      </Box>
    </Link>
  );
};

// Updated propTypes
MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
