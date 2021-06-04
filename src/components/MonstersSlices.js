import React, { useContext, useState, useEffect } from 'react';
import { Heading, Box, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';

import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';

const MonstersSlices = () => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const sections = ['Eyes', 'Body', 'Mouth', 'Legs', 'Arms', 'Accessories'];

  const [canvas] = useContext(FabricContext);
  if (!canvas) {
    return null;
  }

  return (
    <Box w={500} p={4}>
      <Wrap spacing={4}>
        {sections.map((section) => {
          return (
            <WrapItem key={section}>
              <Box>
                <Heading fontSize="sm">{section}</Heading>
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
                          onClick={() => api.loadSvg(svg)}
                          style={{ width: 36, height: 36 }}
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
    </Box>
  );
};

export default MonstersSlices;
