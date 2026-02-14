import { useState } from 'react';
import { TicTacToeProvider } from './contexts/TicTacToeContext';
import LandingPage from './components/LandingPage';
import GameLayout from './components/GameLayout';
import './App.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="App">
      {hasStarted ? (
        <TicTacToeProvider>
          <GameLayout />
        </TicTacToeProvider>
      ) : (
        <LandingPage onPlay={() => setHasStarted(true)} />
      )}
    </div>
  );
}

export default App;
