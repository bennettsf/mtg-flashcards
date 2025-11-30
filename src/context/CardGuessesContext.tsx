import type { MtgCard } from '@/types/mtg';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface CardGuessesContextType {
  cardGuesses: MtgCard[];
  addCardGuess: (card: MtgCard) => void;
  removeCardGuess: (cardId: string) => void;
  clearCardGuesses: () => void;
}

const CardGuessesContext = createContext<CardGuessesContextType | undefined>(undefined);

export const CardGuessesProvider = ({ children }: { children: ReactNode }) => {
  const [cardGuesses, setCardGuesses] = useState<MtgCard[]>([]);

  const addCardGuess = (card: MtgCard) => {
    setCardGuesses((prevGuesses) => {
      if (prevGuesses.find((c) => c.id === card.id)) {
        return prevGuesses; // Avoid duplicates
      }
      return [...prevGuesses, card];
    });
    console.log('Added card guess:', card);
    console.log('Current card guesses:', cardGuesses);
  };

  const removeCardGuess = (cardId: string) => {
    setCardGuesses((prevGuesses) => prevGuesses.filter((c) => c.id !== cardId));
  };

  const clearCardGuesses = () => {
    setCardGuesses([]);
  };
  return (
    <CardGuessesContext.Provider
      value={{ cardGuesses, addCardGuess, removeCardGuess, clearCardGuesses }}
    >
      {children}
    </CardGuessesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCardGuesses = () => {
  const context = useContext(CardGuessesContext);
  if (!context) {
    throw new Error('useCardGuesses must be used within a CardGuessesProvider');
  }
  return context;
};
