import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useColorMode } from './ui/color-mode';

export default function Header() {
  const { colorMode } = useColorMode();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      padding={4}
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
    >
      <Flex mx={4} justify="space-between" align="center">
        {/* Left side: Title */}
        <Heading size="md">MTG Flashcards</Heading>

        {/* Right side: Add nav items later */}
        <Flex gap={4}>
          <Button variant="ghost">Decks</Button>
          <Button variant="ghost">About</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
