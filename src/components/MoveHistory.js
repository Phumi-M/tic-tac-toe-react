import { useGameHistory } from '../contexts/TicTacToeContext';
import './MoveHistory.css';

function getMoveDescription(step, xPlayerName, oPlayerName) {
  if (step === 0) return 'Game start';
  const player = step % 2 === 1 ? xPlayerName : oPlayerName;
  const marker = step % 2 === 1 ? 'X' : 'O';
  return `Move ${step}: ${player} (${marker})`;
}

function MoveHistory() {
  const { history, currentStep, jumpToStep, xPlayerName, oPlayerName } = useGameHistory();

  return (
    <div className="move-history">
      <h3 className="move-history-title">Move History</h3>
      <ol className="move-history-list">
        {history.map((_, step) => (
          <li key={step}>
            <button
              className={`move-history-btn ${step === currentStep ? 'move-history-btn--current' : ''}`}
              onClick={() => jumpToStep(step)}
              disabled={step === currentStep}
            >
              {getMoveDescription(step, xPlayerName, oPlayerName)}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MoveHistory;
