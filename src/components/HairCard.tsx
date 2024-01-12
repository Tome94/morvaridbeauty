import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Text, Link } from "@chakra-ui/react";

// Updated type to include optional image and URL
type ContentItemType = {
  image?: string;
  title: string;
  url?: string; // Optional URL for links
};

const HairCard = ({ hair }: { hair: ContentItemType }) => {
  return (
    <Link
      href={hair.url} // Use "#" if no URL is provided
      _hover={{ textDecoration: hair.url ? "underline" : "none" }}
      isExternal={!!hair.url} // Open link in a new tab if URL is provided
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
        {hair.image && (
          <Image
            src={hair.image}
            alt={hair.title}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.6)"
            height="500px"
            width="100%"
            objectFit="cover"
            borderRadius="8px 8px 0 0"
          />
        )}
        <Text fontSize="md" fontWeight="bold" color="gray.600" mt="25px">
          {hair.title}
        </Text>
      </Box>
    </Link>
  );
};

// Updated propTypes
HairCard.propTypes = {
  hair: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default HairCard;
