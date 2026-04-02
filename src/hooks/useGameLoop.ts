import { useEffect, useRef } from 'react';
import type { Dispatch } from 'react';
import type { GameAction } from '../store/gameTypes';

export function useGameLoop(dispatch: Dispatch<GameAction>) {
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaMs = now - lastTickRef.current;
      lastTickRef.current = now;
      dispatch({ type: 'TICK', deltaMs });
    }, 100);

    return () => clearInterval(interval);
  }, [dispatch]);
}
