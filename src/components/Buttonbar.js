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
import { MdFileUpload, MdFileDownload } from 'react-icons/md';

import ImportSection from './ImportSection';
import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';

const Buttonbar = ({ isSM }) => {
  const [canvas] = useContext(FabricContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!canvas) {
    return null;
  }

  return (
    <Flex justifyContent="space-between" w="full" flexDirection="column">
      <Button
        m={2}
        colorScheme="blue"
        leftIcon={<MdFileUpload />}
        onClick={onOpen}
        title="IMPORT"
      >
        {!isSM && 'IMPORT'}
      </Button>

      <Button
        m={2}
        MdFileUpload
        leftIcon={<MdFileDownload />}
        onClick={() => api.saveToJson()}
        title="DOWNLAOD JSON"
      >
        {!isSM && 'DOWNLAOD JSON'}
      </Button>

      <Button
        m={2}
        colorScheme="teal"
        leftIcon={<MdFileDownload />}
        onClick={() => api.saveToSvg()}
        title="DOWNLAOD SVG"
      >
        {!isSM && 'DOWNLAOD SVG'}
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
