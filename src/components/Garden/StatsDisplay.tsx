import { useGame } from '../../store/GameContext';
import { getEffectiveLPS } from '../../store/initialState';
import { formatNumber } from '../../utils/formatNumber';

export function StatsDisplay() {
  const { state } = useGame();
  const lps = getEffectiveLPS(state);
  const buff = state.activeBuff;
  const secondsLeft = buff ? Math.max(0, Math.ceil((buff.expiresAt - Date.now()) / 1000)) : 0;

  return (
    <div className="stats">
      <div className="stats-leaves">{formatNumber(state.leaves)} ha</div>
      <div className="stats-lps">{lps.toFixed(1)} ha/sec</div>
      {buff && (
        <div className={`buff-pill ${buff.type}`}>
          {buff.name} ({secondsLeft}s)
        </div>
      )}
    </div>
  );
}
