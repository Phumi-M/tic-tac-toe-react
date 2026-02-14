import { useGameBoard } from '../contexts/TicTacToeContext';
import Square from './Square';
import './Board.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function Board() {
  const {
    squares,
    xIsNext,
    xPlayerName,
    oPlayerName,
    timeRemaining,
    turnTimeSeconds,
    canUndo,
    showRestartBtn,
    onSquareClick,
    onUndo,
    onRestart,
    onWin,
    onDraw,
  } = useGameBoard();

  const { winner, line } = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    const { winner: nextWinner } = calculateWinner(nextSquares);
    const isDraw = !nextWinner && nextSquares.every((s) => s !== null);
    if (nextWinner) onWin?.(nextWinner);
    else if (isDraw) onDraw?.();
    onSquareClick(nextSquares, !!nextWinner || isDraw);
  }

  let status;
  const nextPlayerName = xIsNext ? xPlayerName : oPlayerName;
  const winnerName = winner === 'X' ? xPlayerName : oPlayerName;
  if (winner) {
    status = `Winner: ${winnerName}`;
  } else if (squares.every((s) => s !== null)) {
    status = "Draw!";
  } else {
    status = `Next Player: ${nextPlayerName}`;
  }

  return (
    <div className="board-container">
      <div className="status-row">
        <span className="status">{status}</span>
        {!winner && !squares.every((s) => s !== null) && (
          <span className="turn-timer" title={`${turnTimeSeconds} seconds per turn`}>
            ⏱ {timeRemaining}s
          </span>
        )}
      </div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const i = row * 3 + col;
              return (
                <Square
                  key={i}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                  isWinning={line && line.includes(i)}
                  disabled={!!squares[i] || !!winner}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="board-actions">
        {canUndo && onUndo && (
          <button className="undo-btn" onClick={onUndo} title="Undo last move">
            Undo Move
          </button>
        )}
        {showRestartBtn && onRestart && (
          <button className="restart-btn" onClick={onRestart}>
            Restart
          </button>
        )}
      </div>
    </div>
  );
}

export default Board;
