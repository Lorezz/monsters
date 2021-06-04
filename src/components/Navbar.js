import { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
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
import { MdSave, MdMoreVert, MdFileUpload, MdShare } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

import ImportSection from './ImportSection';
import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';
import { openUrl } from '../lib/utils';

const About = () => <div>ciao</div>;
const Keys = () => <div>keys</div>;

const Nav = () => {
  const isSM = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canvas] = useContext(FabricContext);

  const baseUrl = 'https://mosters-factory.surge.sh';
  const title = `Monster's Factory`;
  const description = `Try to create the most funny and cute monster.`;
  const image = `${baseUrl}/share.png`;
  const twitterUSer = '@wisejerk';

  const [modalInfo, setModalInfo] = useState({ title: '', type: '' });
  const handleModal = (type) => {
    onClose();
    let info = { title: 'About', type };
    if (type === 'keys') {
      info = { title: 'Shortcuts', type };
    } else if (type === 'import') {
      info = { title: 'Upload SVG or JSON', type };
    }
    setModalInfo(info);
    onOpen();
  };

  return (
    <>
      <Helmet>
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={baseUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content={twitterUSer} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:domain" content={baseUrl} />
      </Helmet>

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
                    icon={<MdFileUpload size={24} />}
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
                    icon={<MdSave size={24} />}
                    onClick={() => api.allToGroup()}
                  >
                    Save SVG without BG
                  </MenuItem>
                  <MenuItem
                    icon={<MdSave size={24} />}
                    onClick={() => api.saveToJson()}
                  >
                    Save JSON
                  </MenuItem>
                </>
              )}
              <MenuDivider />
              <MenuItem
                icon={<MdFileUpload size={24} />}
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
              <MenuItem icon={<MdShare size={24} />}>
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
                ) : (
                  <About />
                )}
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Flex>
    </>
  );
};

export default Nav;
