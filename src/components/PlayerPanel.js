import { useGamePlayers } from '../contexts/TicTacToeContext';
import './PlayerPanel.css';

const AVATAR_CONFIG = {
  player1: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Player1&top=shortWaved&hairColor=22c55e&clothing=shirtCrewNeck&clothesColor=ffafb9&mouth=smile&eyes=happy',
  player2: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Player2&top=winterHat1&hatColor=ffffff&clothing=shirtCrewNeck&clothesColor=929598&mouth=smile&eyes=happy',
};

function PlayerPanel({ avatarVariant }) {
  const {
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    player1Marker,
    player2Marker,
    player1Active,
    player2Active,
  } = useGamePlayers();

  const label = avatarVariant === 'player1' ? player1Name : player2Name;
  const score = avatarVariant === 'player1' ? player1Score : player2Score;
  const marker = avatarVariant === 'player1' ? player1Marker : player2Marker;
  const isActive = avatarVariant === 'player1' ? player1Active : player2Active;
  const avatarUrl = AVATAR_CONFIG[avatarVariant] || AVATAR_CONFIG.player1;

  return (
    <div className={`player-panel ${isActive ? 'player-panel--active' : ''} ${avatarVariant === 'player2' ? 'player-panel--grayscale' : ''}`}>
      <div className="player-avatar">
        <img src={avatarUrl} alt={label} />
      </div>
      <span className="player-label">{label} ({marker})</span>
      <span className="player-score">{score}</span>
    </div>
  );
}

export default PlayerPanel;
