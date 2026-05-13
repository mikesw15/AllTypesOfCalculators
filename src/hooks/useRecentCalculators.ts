import { useState, useEffect } from 'react';

export interface RecentItem {
  id: string;
  timestamp: number;
}

export function useRecentCalculators() {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('calculator_history') || '[]');
      if (Array.isArray(data)) {
        setRecentItems(data);
      } else {
        // Migration from old format
        const ids = JSON.parse(localStorage.getItem('recent_calculators') || '[]');
        if (Array.isArray(ids)) {
          const items = ids.map(id => ({ id, timestamp: Date.now() }));
          setRecentItems(items);
          localStorage.setItem('calculator_history', JSON.stringify(items));
        }
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const addRecent = (id: string) => {
    try {
      const data = JSON.parse(localStorage.getItem('calculator_history') || '[]');
      const items: RecentItem[] = Array.isArray(data) ? data : [];
      
      const newItems = [
        { id, timestamp: Date.now() },
        ...items.filter((item: RecentItem) => item.id !== id)
      ].slice(0, 20); // Keep last 20
      
      localStorage.setItem('calculator_history', JSON.stringify(newItems));
      setRecentItems(newItems);
    } catch (e) {
      // Ignore
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('calculator_history');
    setRecentItems([]);
  };

  return { recentItems, recentIds: recentItems.map(i => i.id), addRecent, clearHistory };
}
