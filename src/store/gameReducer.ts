import type { GameState, GameAction } from './gameTypes';
import { getEffectiveLPS, getEffectiveClickPower, getUpgradeCost } from './initialState';

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CLICK_CLOVER': {
      const earned = getEffectiveClickPower(state);
      return {
        ...state,
        leaves: state.leaves + earned,
        totalLeavesEarned: state.totalLeavesEarned + earned,
      };
    }

    case 'BUY_UPGRADE': {
      const upgrade = state.upgrades.find((u) => u.id === action.upgradeId);
      if (!upgrade) return state;
      const cost = getUpgradeCost(upgrade);
      if (state.leaves < cost) return state;
      return {
        ...state,
        leaves: state.leaves - cost,
        upgrades: state.upgrades.map((u) =>
          u.id === action.upgradeId ? { ...u, count: u.count + 1 } : u
        ),
      };
    }

    case 'APPLY_BUFF': {
      return { ...state, activeBuff: action.buff };
    }

    case 'TICK': {
      const now = Date.now();
      const activeBuff =
        state.activeBuff && now >= state.activeBuff.expiresAt ? null : state.activeBuff;
      const stateWithBuff = { ...state, activeBuff };
      const lps = getEffectiveLPS(stateWithBuff);
      const earned = lps * (action.deltaMs / 1000);
      return {
        ...stateWithBuff,
        leaves: stateWithBuff.leaves + earned,
        totalLeavesEarned: stateWithBuff.totalLeavesEarned + earned,
        lastTickTime: now,
      };
    }

    case 'LOAD_STATE': {
      return action.state;
    }

    default:
      return state;
  }
}
