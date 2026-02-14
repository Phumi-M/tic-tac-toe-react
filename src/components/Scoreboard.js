import { useGameScoreboard } from '../contexts/TicTacToeContext';
import './Scoreboard.css';

function Scoreboard() {
  const { player1Name, player2Name, player1Score, player2Score, draws } = useGameScoreboard();
  return (
    <div className="scoreboard">
      <span className="scoreboard-item">{player1Name}: {player1Score}</span>
      <span className="scoreboard-item">{player2Name}: {player2Score}</span>
      <span className="scoreboard-item">Draws: {draws}</span>
    </div>
  );
}

export default Scoreboard;
