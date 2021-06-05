import { Box, Text, Heading } from '@chakra-ui/react';

const About = () => (
  <Box p={10}>
    <Heading color="gray.100">Hi, Monster's Factory is ...</Heading>
    <Text fontSize="lg" pt={5}>
      ... a place where you can play with svg. You can use the body parts inside
      this page, or you can also import external svg images.
    </Text>
    <Text fontSize="lg" pt={5}>
      {` The template of monster's parts in the site is priveded by `}
      <a href="https://it.freepik.com/home" target="_blank">
        freepik.com
      </a>
      .
    </Text>
    <Text fontSize="lg" pt={5}>
      {`This is an open-source project, you can find the code on `}
      <a href="https://github.com/Lorezz/monsters" target="_blank">
        github.com
      </a>
      .
    </Text>
    <Text fontSize="lg" pt={5}>
      Hope you like and have some fun.
    </Text>
    <Heading pt={5} color="teal.200">
      Lorezz.
    </Heading>
  </Box>
);
export default About;
