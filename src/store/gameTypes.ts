export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  count: number;
  leavesPerSec: number;
  clickMultiplier: number;
}

export type BuffType = 'positive' | 'negative';

export interface ActiveBuff {
  type: BuffType;
  name: string;
  multiplier: number;
  expiresAt: number;
}

export interface GameState {
  leaves: number;
  totalLeavesEarned: number;
  clickPower: number;
  upgrades: Upgrade[];
  activeBuff: ActiveBuff | null;
  lastTickTime: number;
}

export type GameAction =
  | { type: 'CLICK_CLOVER' }
  | { type: 'BUY_UPGRADE'; upgradeId: string }
  | { type: 'APPLY_BUFF'; buff: ActiveBuff }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'LOAD_STATE'; state: GameState };
