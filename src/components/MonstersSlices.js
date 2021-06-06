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
    <Box w={400} maxH={'90%'} overflowY="scroll" p={1}>
      <Center>
        <Wrap spacing={4}>
          {sections.map((section, sectionIndex) => {
            return (
              <WrapItem key={section}>
                <Box>
                  <Heading fontSize="md" mb={2}>
                    {section}
                  </Heading>
                  <SimpleGrid columns={3} spacing={1}>
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
                          <img
                            alt={`${section}_${n}`}
                            key={`svg_${section}_${n}`}
                            src={svg}
                            onClick={() =>
                              api.loadSvg(svg, dividers[sectionIndex])
                            }
                            style={{ width: 38, height: 38 }}
                          />
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              </WrapItem>
            );
          })}
        </Wrap>
      </Center>
    </Box>
  );
};

export default MonstersSlices;
