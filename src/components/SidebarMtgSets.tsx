import { Box, Heading, VStack, Button, HStack, Text, Spinner, Center } from '@chakra-ui/react';
import { useColorMode } from './ui/color-mode';
import { LazySvg } from './LazySvg';
import type { MtgSet } from '@/types/mtg';
import { useEffect, useState } from 'react';
import { fetchDraftableSets } from '@/api/fetchDraftableSets';
import { useSelectedSet } from '@/context/SelectedSetContext';

export default function SidebarMtgSets() {
  const { colorMode } = useColorMode();
  const { setSelectedSet } = useSelectedSet();
  const [mtgSets, setMtgSets] = useState<MtgSet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSets() {
      setIsLoading(true);
      setError(null);
      try {
        const draftable = await fetchDraftableSets();
        setMtgSets(draftable);
      } catch (err) {
        setError('Failed to fetch MTG sets');
        console.error('Error fetching sets:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSets();
  }, []);

  const handleClick = (setId: string) => {
    setSelectedSet(setId);
  };

  return (
    <Box
      as="aside"
      w={{ base: 'full', md: 'max-content' }}
      pos={{ base: 'fixed', md: 'static' }}
      h="100vh"
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      display="flex"
      scrollBehavior="smooth"
      overflow="auto"
      css={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // hide scrollbar
      minW={'353.3px'}
    >
      <VStack gap={0} align="stretch" width="100%">
        <Heading size="md" my="10px" textAlign="center">
          Draftable Sets
        </Heading>

        {isLoading ? (
          <Box w="100%" display="flex" justifyContent="center" mt={4}>
            <Spinner />
          </Box>
        ) : error ? (
          <Center h="full" py={4}>
            <Text color="red.500">Error: {error}</Text>
          </Center>
        ) : (
          mtgSets.map((set) => (
            <Button
              key={set.code}
              id={set.code}
              onClick={() => handleClick(set.code)}
              variant="ghost"
              borderRadius="0"
              color="gray.50"
              _focus={{ boxShadow: 'outline', borderRadius: 0 }} // keeps outline but no rounded corners
            >
              <HStack justify="space-between" minW="full">
                <Text pr={3}>{set.name}</Text>
                <LazySvg name={set.code} stroke="red" fill="white" />
              </HStack>
            </Button>
          ))
        )}
      </VStack>
    </Box>
  );
}
