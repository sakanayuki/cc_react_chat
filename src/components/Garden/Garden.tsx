import { StatsDisplay } from './StatsDisplay';
import { Clover } from './Clover';
import './Garden.css';

export function Garden() {
  return (
    <section className="garden">
      <StatsDisplay />
      <Clover />
      <p className="clover-hint">click!</p>
    </section>
  );
}
