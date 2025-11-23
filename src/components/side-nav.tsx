import { 
    Box, 
    Button, 
    Flex,
    Heading,
    VStack,
} from '@chakra-ui/react';
import { useColorMode } from './ui/color-mode';
import { 
    useEffect, 
    useState,
} from 'react';

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const [mtgsets, setMtgSets] = useState([]);

    useEffect(() => {
        async function fetchSets() {
          try {
            const res = await fetch("https://api.scryfall.com/sets");
            const data = await res.json();
            const draftable = data.data.filter(
                set => set.set_type == "expansion");
            setMtgSets(draftable)
            console.log("Scryfall sets:", data.data); // logs the array of sets
          } catch (err) {
            console.error("Error fetching sets:", err);
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
    >
        <VStack my="4px">
          <Heading size="md" my="10px">MTG Flashcards</Heading>
          {mtgsets.map((set) => (
              <Button my="-3px" variant="ghost" w="103%" key={set.d} id={set.set_code}>{set.name}</Button>
          ))}
        </VStack>
    </Box>
  );
}
