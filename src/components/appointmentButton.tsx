// AppointmentButtonCard.tsx
import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface AppointmentButtonCardProps {
  onOpen: () => void; // Define the type of the `onOpen` prop as a function that returns void
}

const AppointmentButtonCard: React.FC<AppointmentButtonCardProps> = ({
  onOpen,
}) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderColor="grey"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      onClick={onOpen}
      p={5}
      textAlign="center"
    >
      <Text as="h2" fontSize="3xl" fontFamily="Playfair Display SC" mb={4}>
        Book an Appointment
      </Text>
    </Box>
  );
};

export default AppointmentButtonCard;
