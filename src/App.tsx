import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import SidebarMtgSets from './components/SidebarMtgSets';
import FlashCard from './components/Flashcard';
import CardSearch from './components/CardSearch';
import SelectedCards from './components/SelectedCards';
import type { MtgSet } from './types/mtg';
import { useEffect, useState } from 'react';
import { fetchDraftableSets } from './api/fetchDraftableSets';

function App() {
  const [mtgsets, setMtgSets] = useState<MtgSet[]>([]);
  const [isLoadingSets, setIsLoadingSets] = useState(false);
  const [errorSets, setErrorSets] = useState<string | null>(null);
  const [ondeck, setOnDeck] = useState('');

  useEffect(() => {
    async function fetchSets() {
      setIsLoadingSets(true);
      setErrorSets(null);
      try {
        const draftable = await fetchDraftableSets();
        setMtgSets(draftable);
        console.log('Scryfall sets:', draftable); // logs the array of sets
      } catch (err) {
        setErrorSets('Failed to fetch MTG sets');
        console.error('Error fetching sets:', err);
      } finally {
        setIsLoadingSets(false);
      }
    }
    fetchSets();
  }, []);

  return (
    <Flex h="100vh" w="100vw" gap={1}>
      {/* Sidebar */}
      <SidebarMtgSets
        mtgsets={mtgsets}
        ondeck={ondeck}
        setOnDeck={setOnDeck}
        isLoading={isLoadingSets}
        error={errorSets}
      />

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
  );
}

export default App;
