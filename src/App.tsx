import { Box, Flex } from '@chakra-ui/react';
import SidebarMtgSets from './components/SidebarMtgSets';
import FlashCard from './components/Flashcard';

import { SetCardsProvider } from './context/SetCardsContext';
import { SelectedSetProvider } from './context/SelectedSetContext';
import GuessContentArea from './components/GuessContentArea';
import { CardGuessesProvider } from './context/CardGuessesContext';
import { InputManaValueProvider } from './context/InputManaValueContext';

function App() {
  return (
    <SelectedSetProvider>
      <CardGuessesProvider>
        <SetCardsProvider>
          <InputManaValueProvider>
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
                {/* Bottom row */}
                <GuessContentArea />
              </Box>
            </Flex>
          </InputManaValueProvider>
        </SetCardsProvider>
      </CardGuessesProvider>
    </SelectedSetProvider>
  );
}

export default App;
