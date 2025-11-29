import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import SidebarMtgSets from './components/SidebarMtgSets';
import FlashCard from './components/Flashcard';
import CardSearch from './components/CardSearch';
import SelectedCards from './components/SelectedCards';
import { SetCardsProvider } from './context/SetCardsContext';
import { SelectedSetProvider } from './context/SelectedSetContext';

function App() {
  return (
    <SelectedSetProvider>
      <SetCardsProvider>
        <Flex h="100vh" w="100vw" gap={1}>
          {/* Sidebar */}
          <SidebarMtgSets />

          {/* Main content */}
          <Box
            flex="1"
            p={4}
            m={4}
            display="flex"
            flexDirection="column"
            overflow="auto"
            border={'1px solid gray'}
          >
            {/* Top row */}
            <Box mb={4} display="flex" justifyContent="center" alignItems="center" h="35%">
              <FlashCard />
            </Box>

            {/* Bottom row: 2 columns */}
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
              <Box
                p={4}
                border="1px solid gray"
                w="100%"
                h="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CardSearch />
              </Box>
            </SimpleGrid>
          </Box>
        </Flex>
      </SetCardsProvider>
    </SelectedSetProvider>
  );
}

export default App;
