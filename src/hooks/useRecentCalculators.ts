import { useState, useEffect } from 'react';

export function useRecentCalculators() {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem('recent_calculators') || '[]');
      if (Array.isArray(ids)) {
        setRecentIds(ids);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const addRecent = (id: string) => {
    try {
      const ids = JSON.parse(localStorage.getItem('recent_calculators') || '[]');
      const newIds = [id, ...ids.filter((i: string) => i !== id)].slice(0, 5);
      localStorage.setItem('recent_calculators', JSON.stringify(newIds));
      setRecentIds(newIds);
    } catch (e) {
      // Ignore
    }
  };

  return { recentIds, addRecent };
}
