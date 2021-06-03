import { Box, Text, Flex } from '@chakra-ui/react';
// import { MdSave, MdMoreVert, MdFileUpload, MdShare } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={10}
      zIndex={2}
      w="full"
      mt={10}
      bg="gray.900"
    >
      <Box d="flex" alignItems="center">
        <Text>Monster Factory</Text>
      </Box>
    </Flex>
  );
};

export default Footer;
