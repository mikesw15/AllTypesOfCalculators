import React, { createContext, useContext, useEffect, useState } from 'react';

type UnitSystem = 'metric' | 'imperial';

interface UnitContextType {
  unit: UnitSystem;
  setUnit: (unit: UnitSystem) => void;
  toggleUnit: () => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState<UnitSystem>(
    () => (localStorage.getItem('unitSystem') as UnitSystem) || 'metric'
  );

  useEffect(() => {
    localStorage.setItem('unitSystem', unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <UnitContext.Provider value={{ unit, setUnit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
};
