import React, { useState } from "react";
import Cal from "@calcom/embed-react";
import { Button, Flex, Heading, useDisclosure, Box } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Calender = (props) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function renderButtons() {
    const createButton = (label, event) => (
      <Button
        key={label}
        onClick={() => {
          setSelectedEvent(event);
          onOpen();
        }}
        size="lg"
        margin="50px"
        padding="30px"
        colorScheme="black"
        variant="outline"
      >
        {label}
      </Button>
    );

    return (
      <Box>
        {createButton("45 Min Haircut", "45-min-haircut")}
        {createButton("15 Min Haircut", "15min")}
      </Box>
    );
  }

  return (
    <>
      <Box
        backgroundColor="rgb(240, 234, 222)"
        paddingTop="100px"
        margin="100px 50px 0px 50px"
        textAlign="center"
      >
        <Heading>Choose your Appointment</Heading>
        {renderButtons()}
      </Box>

      {selectedEvent && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setSelectedEvent(null);
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent maxW="1200px">
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Cal
                namespace={selectedEvent}
                calLink={`morvaridbeauty/${selectedEvent}`}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view" }}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setSelectedEvent(null);
                  onClose();
                }}
              >
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Calender;
