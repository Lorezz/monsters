import React, { useContext, useState, useEffect } from 'react';
import { Heading, Box } from '@chakra-ui/react';

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
    <Box>
      <Heading fontSize="sm">{'MONSTER SLICES'}</Heading>
      <Box className="sections_wrap">
        {sections.map((section) => {
          return (
            <section key={section} className="section">
              <h4>{section}</h4>
              <div className="grid">
                {numbers.map((n) => {
                  const svg = `/svg/${section.toLowerCase()}${n}.svg`;
                  return (
                    <Box d="flex" bg="gray.700" key={`${section}_${n}`}>
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
              </div>
            </section>
          );
        })}
      </Box>
    </Box>
  );
};

export default MonstersSlices;
