import { Box, HStack, Kbd } from '@chakra-ui/react';

const Keys = () => (
  <Box mb={10}>
    <HStack spacing={4}>
      <Box>
        <Kbd>Ctrl</Kbd>
        <Kbd>z</Kbd> Undo
      </Box>
      <Box>
        <Kbd>Ctrl</Kbd>
        <Kbd> y</Kbd> Redo
      </Box>
      <Box>
        <Kbd>Ctrl </Kbd>
        <Kbd>g</Kbd>Group
      </Box>
      <Box>
        <Kbd>Ctrl</Kbd>
        <Kbd> u</Kbd> Ungroup
      </Box>
      <Box>
        <Kbd>Ctrl</Kbd>
        <Kbd> a</Kbd> Select All
      </Box>
      <Box>
        <Kbd>Esc</Kbd> Deselect All
      </Box>
      <Box>
        <Kbd>Ctrl</Kbd>
        <Kbd> +</Kbd> Zoom In
      </Box>
      <Box>
        <Kbd>Ctrl</Kbd>
        <Kbd> -</Kbd> Zoom Out
      </Box>
      <Box>
        <Kbd>Ctrl</Kbd>
        <Kbd> v</Kbd> Duplicate
      </Box>
      <Box>
        <Kbd>Backspace</Kbd> Delete
      </Box>
      <Box>
        <Kbd>t</Kbd> Add Text
      </Box>
      <Box>
        <Kbd>CMD/WIN </Kbd>
        <Kbd>LeftArrow</Kbd> Send To Back
      </Box>
      <Box>
        <Kbd>LeftArrow</Kbd> Send Backwards
      </Box>
      <Box>
        <Kbd>CMD/WIN </Kbd>
        <Kbd>RightArrow</Kbd> Bring To Front
      </Box>
      <Box>
        <Kbd>RightArrow</Kbd> Bring Forward
      </Box>
    </HStack>
  </Box>
);

export default Keys;
