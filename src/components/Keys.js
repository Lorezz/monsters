import { Box, Flex, Kbd, Text } from '@chakra-ui/react';

const Keys = () => {
  const list = [
    {
      keys: ['T'],
      text: 'Add Text ',
    },
    {
      keys: ['Ctrl', 'Z'],
      text: 'Undo',
    },
    {
      keys: ['Ctrl', 'Y'],
      text: 'Redo',
    },
    {
      keys: ['Ctrl', ' G'],
      text: 'Group',
    },
    {
      keys: ['Ctrl', ' U'],
      text: 'Ungroup',
    },

    {
      keys: ['Ctrl', ' V'],
      text: 'Duplicate',
    },
    {
      keys: ['Ctrl', ' A'],
      text: 'Select All',
    },
    {
      keys: ['Esc'],
      text: 'Deselect All',
    },
    {
      keys: ['Backspace'],
      text: 'Delete ',
    },

    {
      keys: ['Ctrl', '+'],
      text: 'Zoom In',
    },
    {
      keys: ['Ctrl', '-'],
      text: 'Zoom Out',
    },
    {
      keys: ['Cmd/Win', 'Arrow Up'],
      text: 'Send To Back',
    },
    {
      keys: ['Arrow Up'],
      text: 'Send Backwards',
    },
    {
      keys: ['Cmd/Win', 'Arrow Down'],
      text: 'Bring To Front',
    },
    {
      keys: ['Arrow Down'],
      text: 'Bring Forward',
    },
  ];

  return (
    <Box mb={10}>
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        p={4}
      >
        {list.map((s, i) => {
          const { keys, text } = s;
          return (
            <Flex my={3} key={i} alignItems="space-between" w="full">
              <Box mr={2}>
                {keys.map((k) => (
                  <Kbd key={k} mr={2} fontSize="lg">
                    {k}
                  </Kbd>
                ))}
              </Box>
              <Text as="span" fontSize="lg">
                {text}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Keys;
