import { useState, type MouseEventHandler, type ReactNode } from 'react';
import './Flashcard.css';
import { Box, Button, IconButton, InputGroup, Input, Text } from '@chakra-ui/react';
import { FaExclamation, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Tooltip } from './ui/tooltip';
import { RiArrowRightLine } from 'react-icons/ri';
import { fetchAnswers } from '@/api/fetchAnswers';
import { useInputManaValue } from '@/context/InputManaValueContext';
import { useSelectedSet } from '@/context/SelectedSetContext'

const FlipButton = ({
  icon,
  onClick,
  label,
}: {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label: string;
}) => (
  <Tooltip content={label}>
    <IconButton
      aria-label="flip"
      variant="outline"
      borderRadius="5px"
      _focus={{ outline: 'none' }}
      _focusVisible={{ outline: 'none' }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

function FlashcardArea() {
  const [flipped, setFlipped] = useState(false);
  const { manaValue, setManaValue, manaCost, setManaCost } = useInputManaValue();
  const { selectedSet } = useSelectedSet();

  const handleChange = (e) => {
    setManaValue(e.target.value.length);
    setManaCost(e.target.value);
  };

  return (
    <Box className="flash-card">
      <Box className={`flash-card-inner ${flipped ? 'flipped' : ''}`}>
        <Box className="flash-card-front">
          <InputGroup flex="1">
            <Input placeholder="WUBRG" onChange={handleChange} bg="gray.900" />
          </InputGroup>
          <Box position="absolute" bottom="10px" right="55px" zIndex="10">
            <Button
              icon={<FaExclamation />}
              label="Begin Quiz"
              onClick={() => fetchAnswers("tla", manaValue, manaCost)}
            />
          </Box>
          <Box position="absolute" bottom="10px" right="10px" zIndex="10">
            <FlipButton
              icon={<FaRegEye />}
              label="Show Answer"
              onClick={() => setFlipped(!flipped)}
            />
          </Box>
        </Box>
        <Box className="flash-card-back">
          <Text fontSize={40}>Answer</Text>
          <Box position="absolute" bottom="10px" right="10px" zIndex="10" display="flex" gap={1}>
            <Button
              variant="outline"
              colorPalette="green"
              borderRadius="5px"
              _focus={{ outline: 'none' }}
              _focusVisible={{ outline: 'none' }}
            >
              Next <RiArrowRightLine />
            </Button>
            <FlipButton
              icon={<FaRegEyeSlash />}
              label="Show Mana"
              onClick={() => setFlipped(!flipped)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FlashcardArea;
