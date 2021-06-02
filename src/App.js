import React from 'react';
import {
  Stack,
  HStack,
  ButtonGroup,
  Box,
  Heading,
  Kbd,
  Center,
} from '@chakra-ui/react';
import useDimensions from 'react-use-dimensions';

import { FabricContextProvider } from './lib/ctx';
import FabricCanvas from './components/FabricCanvas';
import Tools from './components/Tools';
import MonstersSlices from './components/MonstersSlices';
import ImportSection from './components/ImportSection';

function App() {
  const [ref, { width, height }] = useDimensions();
  return (
    <Box p={10}>
      <FabricContextProvider>
        <HStack
          spacing={2}
          w={'100vw'}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Tools size={{ width, height }} />

          <Box
            ref={ref}
            shadow="md"
            borderWidth="1px"
            overflow="hidden"
            w={'100%'}
            h={'80vh'}
          >
            <FabricCanvas />
          </Box>
          <MonstersSlices />
          {/* <ImportSection /> */}
        </HStack>
      </FabricContextProvider>
    </Box>
  );
}

export default App;
