import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@chakra-ui/react";

export function DrawerComponent(props: {
  context?: string;
  content: string;
  bgImage?: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const bgStyle = {
    background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2)), url(${props.bgImage})`, // Adjust the RGBA values for desired transparency
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="black" onClick={onOpen}>
        {props.context}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent style={bgStyle}>
          <DrawerCloseButton />
          <DrawerBody>{props.content}</DrawerBody>

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
