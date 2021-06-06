import React from 'react';
import { VStack, HStack, Box } from '@chakra-ui/react';

import useDimensions from 'react-use-dimensions';

import { FabricContextProvider } from './lib/ctx';
import FabricCanvas from './components/FabricCanvas';
import Tools from './components/Tools';
import Buttonbar from './components/Buttonbar';
import MonstersSlices from './components/MonstersSlices';

import Navbar from './components/Navbar';

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

          <Box
            ref={ref}
            overflow="hidden"
            w={'100%'}
            maxH={'90%'}
            height={'90%'}
          >
            <FabricCanvas />
          </Box>
          <MonstersSlices />
        </HStack>
      </VStack>
    </FabricContextProvider>
  );
}

export default App;
