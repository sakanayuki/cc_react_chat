import { createContext, useContext, type Dispatch } from 'react';
import type { GameState, GameAction } from './gameTypes';
import { initialState } from './initialState';

interface GameContextValue {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextValue>({
  state: initialState,
  dispatch: () => {},
});

export function useGame() {
  return useContext(GameContext);
}
