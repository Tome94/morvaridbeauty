import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";

export function Pricing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const bgStyle = {
    background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9))`, // Adjust the RGBA values for desired transparency
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="black" onClick={onOpen}>
        Pricing
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent style={bgStyle}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Pricing</Heading>
          </DrawerHeader>
          <DrawerBody>asd</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
