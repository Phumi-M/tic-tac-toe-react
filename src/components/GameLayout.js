import Header from './Header';
import PlayerPanel from './PlayerPanel';
import Board from './Board';
import MoveHistory from './MoveHistory';
import RoundOverModal from './RoundOverModal';
import Scoreboard from './Scoreboard';
import PlayerNameInput from './PlayerNameInput';
import './GameLayout.css';

function GameLayout() {
  return (
    <div className="game-layout">
      <Header />
      <PlayerNameInput />
      <Scoreboard />
      <main className="game-main">
        <PlayerPanel avatarVariant="player1" />
        <div className="game-center">
          <Board />
          <MoveHistory />
        </div>
        <PlayerPanel avatarVariant="player2" />
      </main>
      <RoundOverModal />
    </div>
  );
}

export default GameLayout;
