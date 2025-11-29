import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSelectedSet } from './SelectedSetContext';
import { fetchCardDataFromSet } from '../api/fetchCardDataFromSet';
import type { MtgCard } from '../types/mtg'; // Your TS type for a card

interface SetCardsContextType {
  cards: MtgCard[];
  isLoading: boolean;
  error: string | null;
}

const SetCardsContext = createContext<SetCardsContextType | undefined>(undefined);

export const SetCardsProvider = ({ children }: { children: ReactNode }) => {
  const { selectedSet } = useSelectedSet();
  const [cards, setCards] = useState<MtgCard[]>([]);
  const [cache, setCache] = useState<Record<string, MtgCard[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSet) return;

    const loadCards = async () => {
      // Return cached cards if available
      if (cache[selectedSet]) {
        setCards(cache[selectedSet]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const fetchedCards = await fetchCardDataFromSet(
          selectedSet,
          '(type:instant OR oracle:flash) -oracle:flashback (game:paper)'
        );
        setCards(fetchedCards);
        console.log(`Fetched Cards:`, fetchedCards);
        setCache((prev) => ({ ...prev, [selectedSet]: fetchedCards }));
      } catch (err) {
        console.error(err);
        setError('Failed to fetch cards.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, [selectedSet, cache]);

  return (
    <SetCardsContext.Provider value={{ cards, isLoading, error }}>
      {children}
    </SetCardsContext.Provider>
  );
};

// Custom hook for easy consumption
// eslint-disable-next-line react-refresh/only-export-components
export const useSetCards = () => {
  const context = useContext(SetCardsContext);
  if (!context) {
    throw new Error('useSetCards must be used within a SetCardsProvider');
  }
  return context;
};
