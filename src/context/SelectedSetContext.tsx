import { createContext, useContext, useState, type ReactNode } from 'react';

interface SelectedSetContextType {
  selectedSet: string | null;
  setSelectedSet: (setCode: string) => void;
}

const SelectedSetContext = createContext<SelectedSetContextType | undefined>(undefined);

export const SelectedSetProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);

  return (
    <SelectedSetContext.Provider value={{ selectedSet, setSelectedSet }}>
      {children}
    </SelectedSetContext.Provider>
  );
};

// Custom hook for easy consumption
// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedSet = () => {
  const context = useContext(SelectedSetContext);
  if (!context) {
    throw new Error('useSelectedSet must be used within a SelectedSetProvider');
  }
  return context;
};
