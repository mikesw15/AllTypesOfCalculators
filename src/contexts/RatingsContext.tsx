import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface RatingsMap {
  [calculatorId: string]: {
    count: number;
    average: number;
  };
}

interface RatingsContextType {
  ratings: RatingsMap;
  loading: boolean;
}

const RatingsContext = createContext<RatingsContextType>({ ratings: {}, loading: true });

export function RatingsProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<RatingsMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For a production app at scale, you would use Cloud Functions to maintain 
    // an aggregate document. For this applet, we aggregate on the client.
    const unsubscribe = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const newRatings: RatingsMap = {};
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const calcId = data.calculatorId;
        const rating = data.rating;
        
        if (calcId && rating) {
          if (!newRatings[calcId]) {
            newRatings[calcId] = { count: 0, average: 0 };
          }
          newRatings[calcId].count += 1;
          newRatings[calcId].average += rating;
        }
      });

      // Calculate averages
      Object.keys(newRatings).forEach(calcId => {
        newRatings[calcId].average = newRatings[calcId].average / newRatings[calcId].count;
      });

      setRatings(newRatings);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching global ratings:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <RatingsContext.Provider value={{ ratings, loading }}>
      {children}
    </RatingsContext.Provider>
  );
}

export const useGlobalRatings = () => useContext(RatingsContext);
