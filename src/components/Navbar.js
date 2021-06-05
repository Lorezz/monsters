import { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useBreakpointValue,
  Kbd,
  Text,
  useDisclosure,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { MdSave, MdMoreVert, MdFileUpload, MdShare } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
// import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import ImportSection from './ImportSection';
import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';
import { openUrl } from '../lib/utils';

const shareUrl = 'https://monsters-factory.netlify.app';

const About = () => (
  <Box p={10}>
    <Heading color="gray.100">Hi,</Heading>
    <Text fontSize="lg" pt={5}>
      This is a place where you can play with svg. You can use the body parts
      inside this page, or you can also import external svg images.
    </Text>
    <Text fontSize="lg" pt={5}>
      {` The template of monster's parts in the site is priveded by `}
      <a href="https://it.freepik.com/home" target="_blank">
        freepik.com
      </a>
      .
    </Text>
    <Text fontSize="lg" pt={5}>
      {`This is an open-source project, you can find the code on `}
      <a href="https://github.com/Lorezz/monsters" target="_blank">
        github.com
      </a>
      .
    </Text>
    <Text fontSize="lg" pt={5}>
      Hope you like and have some fun.
    </Text>
    <Heading pt={5} color="teal.200">
      Lorezz.
    </Heading>
  </Box>
);
const Keys = () => (
  <Box mb={10}>
    <UnorderedList spacing={2}>
      <ListItem>
        <Kbd>Ctrl z</Kbd> Undo
      </ListItem>
      <ListItem>
        <Kbd>Ctrl y</Kbd> Redo
      </ListItem>
      <ListItem>
        <Kbd>Ctrl g</Kbd>Group
      </ListItem>
      <ListItem>
        <Kbd>Ctrl u</Kbd> Ungroup
      </ListItem>
      <ListItem>
        <Kbd>Ctrl a</Kbd> Select All
      </ListItem>
      <ListItem>
        <Kbd>Esc</Kbd> Deselect All
      </ListItem>
      <ListItem>
        <Kbd>Ctrl +</Kbd> Zoom In
      </ListItem>
      <ListItem>
        <Kbd>Ctrl -</Kbd> Zoom Out
      </ListItem>
      <ListItem>
        <Kbd>Ctrl v</Kbd> Duplicate
      </ListItem>
      <ListItem>
        <Kbd>Backspace</Kbd> Delete
      </ListItem>
      <ListItem>
        <Kbd>t</Kbd> Add Text
      </ListItem>
      <ListItem>
        <Kbd>CMD/WIN LeftArrow</Kbd> Send To Back
      </ListItem>
      <ListItem>
        <Kbd>LeftArrow</Kbd> Send Backwards
      </ListItem>
      <ListItem>
        <Kbd>CMD/WIN RightArrow</Kbd> Bring To Front
      </ListItem>
      <ListItem>
        <Kbd>RightArrow</Kbd> Bring Forward
      </ListItem>
    </UnorderedList>
  </Box>
);
const Share = () => (
  <Flex alignItems="center" justifyContent="space-around" my={10}>
    <TwitterShareButton url={shareUrl}>
      <Button colorScheme="twitter">Twitter</Button>
    </TwitterShareButton>

    <FacebookShareButton url={shareUrl}>
      <Button colorScheme="facebook">Facebook</Button>
    </FacebookShareButton>

    <WhatsappShareButton url={shareUrl}>
      <Button colorScheme="teal">Whatsapp</Button>
    </WhatsappShareButton>
  </Flex>
);

const Nav = () => {
  // const isSM = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canvas] = useContext(FabricContext);

  // const baseUrl = 'https://monsters-factory.netlify.app/';
  // const title = `Monster's Factory`;
  // const description = `Try to create the most funny and cute monster.`;
  // const image = `${baseUrl}/og.png`;
  // const twitterUSer = '@wisejerk';

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
    <>
      {/* <Helmet>
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="516" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={baseUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content={twitterUSer} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:domain" content={baseUrl} />
      </Helmet> */}

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
    </>
  );
};

export default Nav;
