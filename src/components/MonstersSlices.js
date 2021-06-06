import React, { useContext } from 'react';
import {
  Heading,
  Box,
  SimpleGrid,
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react';

import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';

const MonstersSlices = () => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const dividers = [10, 2, 8, 6, 6, 8];
  const sections = ['Eyes', 'Body', 'Mouth', 'Legs', 'Arms', 'Accessories'];

  const [canvas] = useContext(FabricContext);
  if (!canvas) {
    return null;
  }

  return (
    <Box
      w={{ base: 200, md: 400, lg: 600 }}
      maxH={'90%'}
      overflowY="scroll"
      p={3}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mb={10}>
        {sections.map((section, sectionIndex) => {
          return (
            <Box key={section}>
              <Heading fontSize="md" mb={2}>
                {section}
              </Heading>
              <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={1}>
                {numbers.map((n) => {
                  const svg = `/svg/${section.toLowerCase()}${n}.svg`;
                  return (
                    <Box
                      d="flex"
                      p={2}
                      bg="gray.600"
                      key={`${section}_${n}`}
                      rounded="lg"
                    >
                      <Box
                        as="img"
                        alt={`${section}_${n}`}
                        key={`svg_${section}_${n}`}
                        src={svg}
                        onClick={() => api.loadSvg(svg, dividers[sectionIndex])}
                        w={{ base: 24, sm: 38 }}
                        h={{ base: 24, sm: 38 }}
                      />
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default MonstersSlices;
