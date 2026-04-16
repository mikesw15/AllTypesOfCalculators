import React, { createContext, useContext, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface HistoryItem {
  calculatorId: string;
  calculatorTitle: string;
  inputs: any;
  results: any;
  timestamp: any;
}

interface HistoryContextType {
  saveToHistory: (calculatorId: string, calculatorTitle: string, inputs: any, results: any) => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType>({
  saveToHistory: async () => {},
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const saveToHistory = useCallback(async (calculatorId: string, calculatorTitle: string, inputs: any, results: any) => {
    if (!user) return;

    try {
      await addDoc(collection(db, `users/${user.uid}/history`), {
        calculatorId,
        calculatorTitle,
        inputs,
        results,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  }, [user]);

  return (
    <HistoryContext.Provider value={{ saveToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
