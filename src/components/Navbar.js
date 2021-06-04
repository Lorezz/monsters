import { useContext } from 'react';
import {
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
  useDisclosure,
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

const Nav = () => {
  const isSM = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canvas] = useContext(FabricContext);

  const baseUrl = 'https://mosters-factory.surge.sh';
  const title = `Created with Monster's Factory`;
  const description = `Try to create the most funny and cute monster.`;
  const image = `${baseUrl}/logo.png`;
  const twitterUSer = '@wisejerk';

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
        mb={10}
      >
        <Box d="flex" alignItems="center">
          <Box
            as="img"
            loading="lazy"
            title="Monsters Factory by Lorezz"
            src="logo.png"
            height={[10, 50]}
            borderRadius="50%"
            mx={2}
            style={{ border: '2px solid skyblue' }}
          />
        </Box>
        <Box d="flex" alignItems="center">
          <Text>Monster's Factory</Text>
        </Box>
        <Box d="flex" alignItems="center" mx={4}>
          <Menu>
            <MenuButton>
              <MdMoreVert size={24} />
            </MenuButton>
            <MenuList>
              {canvas && (
                <>
                  <MenuItem icon={<MdFileUpload size={24} />} onClick={onOpen}>
                    Import
                  </MenuItem>
                  <MenuItem
                    icon={<MdSave size={24} />}
                    onClick={() => api.saveToSvg()}
                  >
                    Save SVG
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
                icon={<FaGithub size={24} />}
                onClick={() => openUrl('https://github.com/Lorezz/monsters')}
              >
                Star
              </MenuItem>
              <MenuItem icon={<MdShare size={24} />}>Share</MenuItem>
            </MenuList>
          </Menu>
        </Box>
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
    </>
  );
};

export default Nav;
