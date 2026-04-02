import { useGame } from '../../store/GameContext';
import { getUpgradeCost } from '../../store/initialState';
import { formatNumber } from '../../utils/formatNumber';
import type { Upgrade } from '../../store/gameTypes';

interface Props {
  upgrade: Upgrade;
}

export function UpgradeCard({ upgrade }: Props) {
  const { state, dispatch } = useGame();
  const cost = getUpgradeCost(upgrade);
  const canAfford = state.leaves >= cost;

  const handleClick = () => {
    if (canAfford) {
      dispatch({ type: 'BUY_UPGRADE', upgradeId: upgrade.id });
    }
  };

  return (
    <div
      className={`upgrade-card${canAfford ? '' : ' upgrade-card--disabled'}`}
      onClick={handleClick}
      role="button"
      aria-disabled={!canAfford}
    >
      <div className="upgrade-card-header">
        <span className="upgrade-name">{upgrade.name}</span>
        <span className="upgrade-count">x{upgrade.count}</span>
      </div>
      <div className="upgrade-desc">{upgrade.description}</div>
      <div className="upgrade-cost">{formatNumber(cost)} ha</div>
    </div>
  );
}
