import { useEffect } from 'react';
import type { GameState } from '../store/gameTypes';

export function useAutoSave(state: GameState) {
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('cloverGame', JSON.stringify(state));
    }, 5000);

    return () => clearInterval(interval);
  }, [state]);
}
