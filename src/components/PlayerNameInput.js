import { useGamePlayers } from '../contexts/TicTacToeContext';
import './PlayerNameInput.css';

function PlayerNameInput() {
  const { player1Name, player2Name, setPlayer1Name, setPlayer2Name } = useGamePlayers();
  return (
    <div className="player-name-input">
      <div className="name-input-group">
        <label htmlFor="player1-name">Player 1</label>
        <input
          id="player1-name"
          type="text"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          placeholder="Player 1"
          maxLength={20}
        />
      </div>
      <div className="name-input-group">
        <label htmlFor="player2-name">Player 2</label>
        <input
          id="player2-name"
          type="text"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          placeholder="Player 2"
          maxLength={20}
        />
      </div>
    </div>
  );
}

export default PlayerNameInput;
