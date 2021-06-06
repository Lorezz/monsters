import { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import {
  MdSave,
  MdMoreVert,
  MdFileUpload,
  MdShare,
  MdKeyboard,
  MdFileDownload,
} from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';
import { openUrl } from '../lib/utils';
import ImportSection from './ImportSection';
import About from './About';
import Keys from './Keys';
import Share from './Share';

const Nav = () => {
  // const isSM = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canvas] = useContext(FabricContext);

  const [modalInfo, setModalInfo] = useState({ title: '', type: '' });
  const handleModal = (type) => {
    onClose();
    let info = { title: 'About', type };
    if (type === 'keys') {
      info = { title: 'Shortcuts', type };
    } else if (type === 'import') {
      info = { title: 'Upload SVG or JSON', type };
    } else if (type === 'share') {
      info = { title: 'Share this site adding your creation', type };
    }
    setModalInfo(info);
    onOpen();
  };

  return (
    <Flex
      justifyContent="space-between"
      boxShadow="base"
      p={1}
      zIndex={2}
      w="full"
    >
      <Box d="flex" alignItems="center">
        <Box
          as="img"
          loading="lazy"
          title="Monster's Factory by Lorezz"
          src="logo.svg"
          height={10}
          borderRadius="50%"
          mx={2}
          onClick={() => handleModal('about')}
        />
      </Box>
      <Box d="flex" alignItems="center">
        <Heading fontFamily="Sedgwick Ave" color="yellow.50">
          Monster's Factory
        </Heading>
      </Box>
      <Box d="flex" alignItems="center" mx={4}>
        <Menu>
          <MenuButton>
            <Button colorScheme="yellow" size="md" leftIcon={<MdMoreVert />}>
              {'HELP'}
            </Button>
          </MenuButton>
          <MenuList>
            {canvas && (
              <>
                <MenuItem
                  icon={<MdKeyboard size={24} />}
                  onClick={() => handleModal('keys')}
                >
                  Keyboard Shortcuts
                </MenuItem>
                <MenuItem
                  icon={<MdFileUpload size={24} />}
                  onClick={() => handleModal('import')}
                >
                  Import
                </MenuItem>
                <MenuItem
                  icon={<MdFileDownload size={24} />}
                  onClick={() => api.allToGroup()}
                >
                  Download SVG without BG
                </MenuItem>
                <MenuItem
                  icon={<MdFileDownload size={24} />}
                  onClick={() => api.saveToJson()}
                >
                  Download JSON
                </MenuItem>
              </>
            )}
            <MenuDivider />
            <MenuItem
              icon={<img src="logo.svg" width={24} height={24} />}
              onClick={() => handleModal('about')}
            >
              About
            </MenuItem>
            <MenuItem
              icon={<FaGithub size={24} />}
              onClick={() => openUrl('https://github.com/Lorezz/monsters')}
            >
              {`Star/Fork this project`}
            </MenuItem>
            <MenuItem
              icon={<MdShare size={24} />}
              onClick={() => handleModal('share')}
            >
              Share your Monster
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{modalInfo.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalInfo?.type === 'import' ? (
                <ImportSection />
              ) : modalInfo?.type === 'keys' ? (
                <Keys />
              ) : modalInfo?.type === 'share' ? (
                <Share />
              ) : (
                <About />
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Flex>
  );
};

export default Nav;
