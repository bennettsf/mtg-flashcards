import type { MtgCard } from '@/types/mtg';
import { createContext, useEffect, useState, type ReactNode } from 'react';
import { useSelectedSet } from './SelectedSetContext';
import { db } from '@/db/db';
import { useInputManaValue } from './InputManaValueContext';

interface CardAnswersContextType {
  cardAnswers: MtgCard[];
  isLoading: boolean;
  error: string | null;
}

const CardAnswersContext = createContext<CardAnswersContextType | undefined>(undefined);

export const CardAnswersProvider = ({ children }: { children: ReactNode }) => {
  const { manaValue, manaOpen } = useInputManaValue();
  const [cardAnswers, setCardAnswers] = useState<MtgCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedSet } = useSelectedSet();

  useEffect(() => {
    if (!selectedSet || !manaValue || !manaOpen) return;

    // load possible answers with same or lower mana value
    const loadPossibleAnswers = async () => {
      setIsLoading(true);
      setError(null);

      const cards = await db.cards
        .where('set')
        .equals(selectedSet)
        .and((card) => card.cmc !== undefined && card.cmc <= manaValue)
        .filter((card) => {
          const typeLine = card.type_line?.toLowerCase() ?? '';
          const oracle = card.oracle_text?.toLowerCase() ?? '';

          const isInstant = typeLine.includes('instant');
          const hasFlash = oracle.includes('flash');
          const hasFlashback = oracle.includes('flashback');

          return isInstant || (hasFlash && !hasFlashback);
        })
        .toArray();
      return cards;
    };

    const cards = loadPossibleAnswers();
  }, [manaValue, manaOpen, selectedSet]);

  return (
    <CardAnswersContext.Provider value={{ cardAnswers, isLoading, error }}>
      {children}
    </CardAnswersContext.Provider>
  );
};
