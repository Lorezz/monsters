import React from 'react';
import {
  Stack,
  VStack,
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
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [ref, { width, height }] = useDimensions();
  return (
    <FabricContextProvider>
      <VStack
        w="full"
        h={'100vh'}
        justifyContent="space-between"
        overflowY={'scroll'}
      >
        <Navbar />
        <HStack
          w={'full'}
          h={'100vh'}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Tools size={{ width, height }} />

          <Box ref={ref} overflow="hidden" w={'100%'} maxH={'70vh'}>
            <FabricCanvas />
          </Box>
          <MonstersSlices />
          {/* <ImportSection /> */}
        </HStack>
        <Footer alignSelf="flex-end" />
      </VStack>
    </FabricContextProvider>
  );
}

export default App;
