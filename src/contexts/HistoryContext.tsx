import React, { createContext, useContext, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

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
      const path = `users/${user.uid}/history`;
      await addDoc(collection(db, path), {
        calculatorId,
        calculatorTitle,
        inputs,
        results,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/history`);
    }
  }, [user]);

  return (
    <HistoryContext.Provider value={{ saveToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
