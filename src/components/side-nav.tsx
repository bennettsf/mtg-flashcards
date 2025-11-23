import { Box, Heading, VStack, Button, HStack, Text } from '@chakra-ui/react';
import { useColorMode } from './ui/color-mode';
import { useEffect, useState } from 'react';
import { LazySvg } from './lazy-svg';
import type { MtgSet } from '@/types/mtg';

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const [mtgsets, setMtgSets] = useState<MtgSet[]>([]);
  const [ondeck, setOnDeck] = useState('');
  const handleClick = (setId: string) => {
    setOnDeck(setId);
    console.log(ondeck);
  };

  useEffect(() => {
    async function fetchSets() {
      try {
        const res = await fetch('https://api.scryfall.com/sets');
        const data = await res.json();
        const draftable = data.data.filter(
          (set: MtgSet) =>
            (set.set_type == 'expansion' || set.set_type == 'core') && set.card_count > 120
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
      scrollbar="hidden"
      overflow="scroll"
    >
      <VStack gap={0} align="stretch">
        <Heading size="md" my="10px" textAlign="center">
          MTG Flashcards
        </Heading>

        {mtgsets.map((set) => (
          <Button
            key={set.code}
            id={set.code}
            onClick={() => handleClick(set.code)}

            variant="ghost"
            w="100%"
            display="inline-flex"
            borderRadius="0"
            color="gray.50"
          >
            <HStack justify="space-between" w="100%">
              <Text pr={3}>{set.name}</Text>
              <LazySvg name={set.code} stroke="black" fill="white" />
            </HStack>
          </Button>

        ))}
      </VStack>
    </Box>
  );
}
