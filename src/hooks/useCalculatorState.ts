import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useCalculatorState<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const getValue = (): T => {
    const param = searchParams.get(key);
    if (param !== null) {
      try {
        return JSON.parse(decodeURIComponent(param));
      } catch (e) {
        // Fallback or ignore
      }
    }
    return initialValue;
  };

  const [state, setState] = useState<T>(getValue);

  useEffect(() => {
    // We only want to sync FROM url on initial load or if the URL explicitly changes 
    // from outside. But if we do it here, our debounced write will trigger this again.
    // However, since we track local state instantly, it shouldn't be an issue unless the value differs.
    const urlValue = getValue();
    if (JSON.stringify(urlValue) !== JSON.stringify(state)) {
      setState(urlValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setParamState = (newValue: T) => {
    // 1. Update local state immediately for snappy UI
    setState(newValue);
    
    // 2. Debounce the URL update to avoid router navigation lag
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      // Use the latest searchParams so we don't accidentally overwrite other updates
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set(key, encodeURIComponent(JSON.stringify(newValue)));
      setSearchParams(currentParams, { replace: true });
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [state, setParamState];
}
