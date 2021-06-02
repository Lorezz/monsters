import React, { useContext, useState, useEffect } from 'react';
import { Heading, Box, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';

import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';

const MonstersSlices = () => {
  const [canvas] = useContext(FabricContext);
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const sections = ['Eyes', 'Body', 'Mouth', 'Legs', 'Arms', 'Accessories'];

  if (!canvas) {
    return null;
  }

  return (
    <Box w={800} p={10}>
      <Heading fontSize="sm">{'MONSTER SLICES'}</Heading>
      <Wrap spacing={10}>
        {sections.map((section) => {
          return (
            <WrapItem key={section}>
              <Box>
                <Heading fontSize="sm">{section}</Heading>
                <SimpleGrid columns={3} spacing={2}>
                  {numbers.map((n) => {
                    const svg = `/svg/${section.toLowerCase()}${n}.svg`;
                    return (
                      <Box d="flex" p={2} bg="gray.600" key={`${section}_${n}`}>
                        <img
                          alt={`${section}_${n}`}
                          key={`svg_${section}_${n}`}
                          src={svg}
                          onClick={() => api.loadSvg(svg)}
                          style={{ width: 40, height: 40 }}
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
