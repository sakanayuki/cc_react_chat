import type { GameState, Upgrade } from './gameTypes';

const UPGRADES: Upgrade[] = [
  {
    id: 'watering_can',
    name: 'じょうろ',
    description: 'ぽたぽた…',
    baseCost: 10,
    costMultiplier: 1.15,
    count: 0,
    leavesPerSec: 0.1,
    clickMultiplier: 1.0,
  },
  {
    id: 'sunbeam',
    name: 'ひざし',
    description: 'あたたかい光',
    baseCost: 75,
    costMultiplier: 1.15,
    count: 0,
    leavesPerSec: 0.5,
    clickMultiplier: 1.0,
  },
  {
    id: 'fertilizer',
    name: 'ひりょう',
    description: 'クリック2倍！',
    baseCost: 100,
    costMultiplier: 1.2,
    count: 0,
    leavesPerSec: 0,
    clickMultiplier: 2.0,
  },
  {
    id: 'bee_friend',
    name: 'ミツバチ',
    description: 'ブンブン',
    baseCost: 500,
    costMultiplier: 1.15,
    count: 0,
    leavesPerSec: 2.0,
    clickMultiplier: 1.0,
  },
  {
    id: 'greenhouse',
    name: 'おんしつ',
    description: 'ぬくぬく育つ',
    baseCost: 2000,
    costMultiplier: 1.2,
    count: 0,
    leavesPerSec: 5.0,
    clickMultiplier: 1.0,
  },
  {
    id: 'golden_clover',
    name: 'きんのクローバー',
    description: 'でんせつのはっぱ',
    baseCost: 10000,
    costMultiplier: 1.25,
    count: 0,
    leavesPerSec: 20.0,
    clickMultiplier: 1.0,
  },
];

export const initialState: GameState = {
  leaves: 0,
  totalLeavesEarned: 0,
  clickPower: 1,
  upgrades: UPGRADES,
  activeBuff: null,
  lastTickTime: Date.now(),
};

export function loadState(): GameState {
  try {
    const saved = localStorage.getItem('cloverGame');
    if (!saved) return { ...initialState, lastTickTime: Date.now() };
    const parsed = JSON.parse(saved) as GameState;
    // Merge saved upgrade counts into fresh upgrade definitions
    const upgrades = UPGRADES.map((u) => {
      const saved_u = parsed.upgrades?.find((s) => s.id === u.id);
      return saved_u ? { ...u, count: saved_u.count } : u;
    });
    return {
      ...initialState,
      leaves: parsed.leaves ?? 0,
      totalLeavesEarned: parsed.totalLeavesEarned ?? 0,
      upgrades,
      activeBuff: null, // don't restore buffs across sessions
      lastTickTime: Date.now(),
    };
  } catch {
    return { ...initialState, lastTickTime: Date.now() };
  }
}

export function getUpgradeCost(upgrade: { baseCost: number; costMultiplier: number; count: number }): number {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
}

export function getEffectiveLPS(state: GameState): number {
  const base = state.upgrades.reduce((sum, u) => sum + u.leavesPerSec * u.count, 0);
  return base * (state.activeBuff?.multiplier ?? 1);
}

export function getEffectiveClickPower(state: GameState): number {
  const multiplier = state.upgrades.reduce(
    (product, u) => product * Math.pow(u.clickMultiplier, u.count),
    1
  );
  return state.clickPower * multiplier * (state.activeBuff?.multiplier ?? 1);
}
