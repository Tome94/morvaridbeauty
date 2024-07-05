import { Heading, useDisclosure, Box, Link, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import AppointmentButtonCard from "../components/appointmentButton";
function Booking() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AppointmentButtonCard onOpen={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent maxW="1200px">
          <ModalHeader position="absolute" zIndex="1">
            <Heading fontFamily="Playfair Display SC">
              Book With Morvarid/Mary
            </Heading>
          </ModalHeader>
          <ModalCloseButton
            zIndex="1"
            size="lg"
            marginRight="25px"
            backgroundColor="whitesmoke"
            sx={{
              "&:hover": {
                border: "2px solid black",
              },
            }}
          />
          <ModalBody zIndex="0">
            <Box
              as="iframe"
              bgColor="#323232"
              src="https://phorest.com/book/salons/saloncare#/staffs/qTL_0TSJlXX2mqTfJ0LylA"
              position="relative"
              left="0"
              width="100%"
              height="700px"
              title="Phorest @ Mary"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Booking;
