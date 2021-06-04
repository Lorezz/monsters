import React, { useContext } from 'react';
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';

import ImportSection from './ImportSection';
import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';

const Buttonbar = () => {
  const [canvas] = useContext(FabricContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!canvas) {
    return null;
  }

  return (
    <Flex alignItems="center" justifyContent="center">
      <Button
        mx={2}
        colorScheme="teal"
        size="lg"
        leftIcon={<MdSave />}
        onClick={() => api.saveToSvg()}
      >
        SAVE
      </Button>

      <Button
        mx={2}
        colorScheme="blue"
        size="lg"
        leftIcon={<MdSave />}
        onClick={onOpen}
      >
        IMPORT
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Upload SVG or JSON</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{isOpen && <ImportSection />}</ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Flex>
  );
};

export default Buttonbar;
