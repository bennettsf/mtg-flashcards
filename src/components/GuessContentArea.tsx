import { Box, SimpleGrid } from '@chakra-ui/react';

import SelectedCards from './SelectedCards';
import CardSearch from './CardSearch';

export default function GuessContentArea() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} h="65%" placeItems="center">
      <Box
        p={4}
        border="1px solid gray"
        w="100%"
        h="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SelectedCards />
      </Box>
      <Box p={4} border="1px solid gray" w="100%" h="100%">
        <CardSearch />
      </Box>
    </SimpleGrid>
  );
}
