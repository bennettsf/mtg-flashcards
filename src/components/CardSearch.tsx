import { useCardGuesses } from '@/context/CardGuessesContext';
import { useSetCards } from '@/context/SetCardsContext';
import type { MtgCard } from '@/types/mtg';
import { Box, Input, InputGroup, VStack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { LuSearch } from 'react-icons/lu';

function CardSearch() {
  const { cards } = useSetCards();
  const { addCardGuess } = useCardGuesses();

  const [selectedCard, setSelectedCard] = useState<MtgCard | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    if (!searchQuery) return [];
    return cards.filter((card) => card.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, cards]);

  return (
    <Box>
      <Box position="relative">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="gray.900"
          />
        </InputGroup>
        {filteredCards.length > 0 && (
          <VStack
            position="absolute"
            top="100%"
            left={0}
            right={0}
            bg="black"
            fillOpacity={'20%'}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            zIndex={10}
            gap={0}
            maxH="250px"
            overflowY="auto"
          >
            {filteredCards.map((card) => (
              <Box
                key={card.id}
                w="100%"
                px={2}
                py={1}
                display="flex"
                alignItems="center"
                _hover={{ bg: 'gray.800', cursor: 'pointer' }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCard(card);
                  addCardGuess(card);
                }}
              >
                <img
                  src={card.image_uris?.small}
                  alt={card.name}
                  style={{
                    width: '50px',
                    height: 'auto',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                />
                <Text fontSize={'sm'} ml={3}>
                  {card.name}
                </Text>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
      <Box mt={4}>
        <img src={selectedCard ? selectedCard.image_uris?.small : undefined} alt="" />
        <Text>{selectedCard ? selectedCard.name : ''}</Text>
      </Box>
    </Box>
  );
}

export default CardSearch;
