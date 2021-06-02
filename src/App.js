import React from 'react';
import { VStack, ButtonGroup, Box, Heading, Kbd } from '@chakra-ui/react';
import { FabricContextProvider } from './lib/ctx';
import FabricCanvas from './components/FabricCanvas';
import Tools from './components/Tools';
import MonstersSlices from './components/MonstersSlices';
import ImportSection from './components/ImportSection';

function App() {
  return (
    <FabricContextProvider>
      <VStack>
        <Tools />
        <Box p={5} shadow="md" borderWidth="1px" overflow="hidden">
          <FabricCanvas />
        </Box>
        <MonstersSlices />
        <ImportSection />
      </VStack>
    </FabricContextProvider>
  );
}

export default App;
