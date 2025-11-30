import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSelectedSet } from './SelectedSetContext';
import { fetchCardDataFromSet } from '../api/fetchCardDataFromSet';
import type { MtgCard } from '@/types/mtg';
import { db } from '@/db/db';

interface SetCardsContextType {
  cards: MtgCard[];
  isLoading: boolean;
  error: string | null;
}

const SetCardsContext = createContext<SetCardsContextType | undefined>(undefined);

export const SetCardsProvider = ({ children }: { children: ReactNode }) => {
  const { selectedSet } = useSelectedSet();
  const [cards, setCards] = useState<MtgCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSet) return;

    const loadCards = async () => {
      setIsLoading(true);
      setError(null);

      // Try to load from IndexedDB first using Dexie
      const cached = await db.cards.where('set').equals(selectedSet).toArray();

      if (cached.length > 0) {
        setCards(cached);

        setIsLoading(false);
        return;
      }

      try {
        const fetchedCards = await fetchCardDataFromSet(
          selectedSet,
          '(type:instant OR oracle:flash) -oracle:flashback (game:paper)'
        );
        setCards(fetchedCards);
        await db.cards.bulkPut(fetchedCards);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch cards.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, [selectedSet]);

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
