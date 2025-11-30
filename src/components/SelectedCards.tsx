import { useCardGuesses } from '@/context/CardGuessesContext';
import { Text, Image, HStack, VStack, IconButton, Button } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';

function SelectedCards() {
  const { cardGuesses, clearCardGuesses, removeCardGuess } = useCardGuesses();

  return (
    <VStack w="100%" align="stretch" gap={3}>
      {cardGuesses.length > 0 && (
        <Button
          size="sm"
          colorScheme="red"
          color="white"
          onClick={clearCardGuesses}
          alignSelf="flex-end"
        >
          Clear All
        </Button>
      )}

      {cardGuesses.length === 0 ? (
        <Text textAlign="center" color="gray.400">
          No cards selected yet.
        </Text>
      ) : (
        cardGuesses.map((card) => (
          <HStack
            key={card.id}
            p={2}
            border="1px solid gray"
            borderRadius="md"
            gap={3}
            _hover={{ bg: 'gray.700' }}
            justify="space-between"
          >
            <HStack gap={3}>
              <Image src={card.image_uris?.small} alt={card.name} maxH="80px" borderRadius="4px" />
              <Text fontWeight="bold">{card.name}</Text>
            </HStack>

            <IconButton
              aria-label="Remove card"
              size="sm"
              colorPalette="red"
              onClick={() => removeCardGuess(card.id)}
            >
              <LuX />
            </IconButton>
          </HStack>
        ))
      )}
    </VStack>
  );
}

export default SelectedCards;
