import { createContext, useContext, useState, type ReactNode } from 'react';

interface InputManaValueContextType {
  manaValue: number | null;
  setManaValue: (cost: number) => void;
  manaOpen: string | null;
  setManaOpen: (cost: string) => void;
}

const InputManaValueContext = createContext<InputManaValueContextType | undefined>(undefined);

export const InputManaValueProvider = ({ children }: { children: ReactNode }) => {
  const [manaValue, setManaValue] = useState<number | null>(null);
  const [manaOpen, setManaOpen] = useState<string | null>(null);
  return (
    <InputManaValueContext.Provider value={{ manaValue, setManaValue, manaOpen, setManaOpen }}>
      {children}
    </InputManaValueContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInputManaValue = () => {
  const context = useContext(InputManaValueContext);
  if (!context) {
    throw new Error('useSelectedSet must be used within a SelectedSetProvider');
  }
  return context;
};
