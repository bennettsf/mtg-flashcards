import { useCardGuesses } from '@/context/CardGuessesContext';
import { Text, Image, HStack, VStack, IconButton, Button, Box } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';

function SelectedCards() {
  const { cardGuesses, clearCardGuesses, removeCardGuess } = useCardGuesses();

  return (
    <VStack w="100%" align="stretch" gap={3} h="100%">
      {/* Top Info Bar */}
      <HStack
        w="100%"
        justify="space-between"
        px={3}
        py={2}
        borderBottom="1px solid"
        borderColor="gray.600"
        bg="gray.800"
      >
        <Text fontSize="sm" color="gray.300">
          {cardGuesses.length} selected
        </Text>

        <Button
          size="xs"
          colorScheme="red"
          onClick={clearCardGuesses}
          disabled={cardGuesses.length === 0}
        >
          Clear All
        </Button>
      </HStack>

      {/* Scrollable Card List */}
      <Box
        flex="1" // fills the remaining vertical space
        overflowY="auto" // enables scrolling
        pr={1} // extra padding so scrollbar doesn’t overlap content
      >
        {cardGuesses.length === 0 ? (
          <Box py={4}>
            <Text textAlign="center" color="gray.400">
              No cards selected yet.
            </Text>
          </Box>
        ) : (
          <VStack w="100%" align="stretch" gap={3} p={3}>
            {cardGuesses.map((card) => (
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
                  <Image
                    src={card.image_uris?.small}
                    alt={card.name}
                    h="80px"
                    w="57px"
                    borderRadius="4px"
                    loading="eager"
                    objectFit="cover"
                  />
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
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}

export default SelectedCards;
