import React from "react";
import { Link, Text } from "@chakra-ui/react";

function Booking() {
  return (
    <Link
      href="#your-booking-link"
      textDecoration="none"
      _hover={{ textDecoration: "underline" }}
    >
      <Text as="h2" fontSize="3xl" fontFamily="Playfair Display SC">
        Book an Appointment
      </Text>
    </Link>
  );
}

export default Booking;
