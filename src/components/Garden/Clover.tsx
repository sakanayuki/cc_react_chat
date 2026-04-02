import { useState, useCallback } from 'react';
import { useGame } from '../../store/GameContext';

export function Clover() {
  const { state, dispatch } = useGame();
  const [bounceKey, setBounceKey] = useState(0);
  const buff = state.activeBuff;

  const handleClick = useCallback(() => {
    dispatch({ type: 'CLICK_CLOVER' });
    setBounceKey((k) => k + 1);
  }, [dispatch]);

  const animClass = buff?.type === 'positive'
    ? 'clover--shimmer'
    : buff?.type === 'negative'
    ? 'clover--wilt'
    : '';

  return (
    <div className="clover-wrapper" onClick={handleClick} role="button" aria-label="クローバーをクリック">
      <div key={bounceKey} className={`clover clover--bounce ${animClass}`}>
        <div className="petal petal-tl" />
        <div className="petal petal-tr" />
        <div className="petal petal-bl" />
        <div className="petal petal-br" />
        <div className="clover-center" />
        <div className="clover-stem" />
      </div>
    </div>
  );
}
