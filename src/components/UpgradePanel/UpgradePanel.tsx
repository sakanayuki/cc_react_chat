import { useGame } from '../../store/GameContext';
import { UpgradeCard } from './UpgradeCard';
import './UpgradePanel.css';

export function UpgradePanel() {
  const { state } = useGame();

  return (
    <aside className="upgrade-panel">
      <div className="upgrade-panel-title">SHOP</div>
      {state.upgrades.map((u) => (
        <UpgradeCard key={u.id} upgrade={u} />
      ))}
    </aside>
  );
}
