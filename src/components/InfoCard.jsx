import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Input,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";

const InfoCard = ({ name, address, phone, hours }) => {
  return (
    <Box
      p={70}
      shadow="md"
      borderWidth="3px"
      borderRadius="md"
      backgroundColor="rgb(240, 234, 222)"
      color="#323232"
    >
      <Text fontSize="xl" fontWeight="bold">
        {name}
      </Text>
      <Text mt={2}>{address}</Text>
      <Text mt={2}>Phone: {phone}</Text>
      <VStack align="start" mt={4}>
        <Text fontWeight="bold">Hours:</Text>
        <List spacing={2}>
          {hours.map((hour, index) => (
            <ListItem key={index}>{hour}</ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default InfoCard;
