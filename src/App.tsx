import { useReducer } from 'react';
import { GameContext } from './store/GameContext';
import { gameReducer } from './store/gameReducer';
import { loadState } from './store/initialState';
import { useGameLoop } from './hooks/useGameLoop';
import { useAutoSave } from './hooks/useAutoSave';
import { Garden } from './components/Garden/Garden';
import { UpgradePanel } from './components/UpgradePanel/UpgradePanel';
import { ChatPanel } from './components/ChatPanel/ChatPanel';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState);

  useGameLoop(dispatch);
  useAutoSave(state);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <div className="app-layout">
        <header className="app-header">
          <span className="header-title">&#x1F340; CLOVER GARDEN</span>
          <span className="header-sub">クローバー放置ゲーム</span>
        </header>
        <main className="app-main">
          <UpgradePanel />
          <Garden />
          <ChatPanel />
        </main>
      </div>
    </GameContext.Provider>
  );
}

export default App;
