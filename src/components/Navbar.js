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
} from '@chakra-ui/react';
import { MdSave, MdMoreVert, MdFileUpload, MdShare } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

const Nav = () => {
  const isSM = useBreakpointValue({ base: true, md: false });

  return (
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
        <Text>Monster Factory</Text>
      </Box>
      <Box d="flex" alignItems="center" mx={4}>
        <Menu>
          <MenuButton>
            <MdMoreVert size={24} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<MdFileUpload size={24} />}>Import</MenuItem>
            <MenuItem icon={<MdSave size={24} />}>Save SVG</MenuItem>
            <MenuItem icon={<MdSave size={24} />}>Save JSON</MenuItem>
            <MenuItem icon={<MdShare size={24} />}>Share</MenuItem>
            <MenuDivider />
            <MenuItem icon={<FaGithub size={24} />}>Star</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Nav;
