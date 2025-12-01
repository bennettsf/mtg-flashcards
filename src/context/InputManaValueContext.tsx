import { createContext, useContext, useState, type ReactNode } from 'react';

interface InputManaValueContextType {
  manaValue: number | null;
  setManaValue: (cost: number) => void;
  manaCost: string | null;
  setManaCost: (cost: string) => void;
}

const InputManaValueContext = createContext<InputManaValueContextType | undefined>(undefined);

export const InputManaValueProvider = ({ children }: { children: ReactNode }) => {
  const [manaValue, setManaValue] = useState<number | null>(null);
  const [manaCost, setManaCost] = useState<string | null>(null);
  return (
    <InputManaValueContext.Provider value={{ manaValue, setManaValue, manaCost, setManaCost }}>
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
