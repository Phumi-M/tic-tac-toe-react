import { useGameModal } from '../contexts/TicTacToeContext';
import './RoundOverModal.css';

function RoundOverModal() {
  const {
    showRoundOverModal,
    isDraw,
    winner,
    player1Marker,
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    onContinue,
    onRestart,
  } = useGameModal();

  if (!showRoundOverModal) return null;
  const winnerLabel = winner === player1Marker ? player1Name : player2Name;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{isDraw ? "Draw!" : `${winnerLabel} Wins Round`}</h2>
        <p className="modal-subtext">{isDraw ? "No winner this round. Continue or Restart?" : "Choices will be switched now."}</p>
        <div className="modal-scores">
          <p>{player1Name} : {player1Score}</p>
          <p>{player2Name} : {player2Score}</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-btn modal-btn--continue" onClick={onContinue}>
            Continue
          </button>
          <button className="modal-btn modal-btn--restart" onClick={onRestart}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoundOverModal;
