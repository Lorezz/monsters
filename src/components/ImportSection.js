import { Center, Box, Text, Flex, Heading } from '@chakra-ui/react';

import DropArea from './DropArea';
import * as api from '../lib/api';

const ImportSection = () => (
  <Box>
    <Text textAlign="center" mb={2}>
      Click here or drop a file to upload!
    </Text>
    <Center>
      <Flex alignItems="center">
        <Box mx={1}>
          <Heading fontSize="sm">{'JSON'}</Heading>
          <DropArea
            accept="application/json"
            onDone={(f) => api.onDropFile(f, 'json')}
          />
        </Box>
        <Box mx={1}>
          <Heading fontSize="sm">{'SVG'}</Heading>
          <DropArea
            accept="image/svg+xml"
            onDone={(f) => api.onDropFile(f, 'svg')}
          />
        </Box>
      </Flex>
    </Center>
  </Box>
);

export default ImportSection;
