import { Box, Button, Flex, IconButton, Heading, VStack } from '@chakra-ui/react';
import { useColorMode } from './ui/color-mode';
import { useEffect, useState } from 'react';
import { LazySvg } from './lazy-svg';

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const [mtgsets, setMtgSets] = useState([]);
  const [ondeck, setOnDeck] = useState('');
  const handleClick = (setId) => {
    setOnDeck(setId);
    console.log(ondeck);
  };

  useEffect(() => {
    async function fetchSets() {
      try {
        const res = await fetch('https://api.scryfall.com/sets');
        const data = await res.json();
        const draftable = data.data.filter(
          (set) => set.set_type == 'expansion' && set.card_count > 120
        );
        setMtgSets(draftable);
        console.log('Scryfall sets:', data.data); // logs the array of sets
      } catch (err) {
        console.error('Error fetching sets:', err);
      }
    }
    fetchSets();
  }, []);

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100%"
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      scrollBehavior="smooth"
      overflow="scroll"
      scrollbar="hidden"
    >
      <VStack my="4px">
        <Heading size="md" my="10px">
          MTG Flashcards
        </Heading>
        {mtgsets.map((set) => (
          <IconButton
            onClick={() => handleClick(set.code)}
            my="-3px"
            variant="ghost"
            w="103%"
            key={set.code}
            id={set.code}
          >
            {set.name}
            <LazySvg name={set.code} id={set.code} />
          </IconButton>
        ))}
      </VStack>
    </Box>
  );
}
