import './Square.css';

function Square({ value, onSquareClick, isWinning, disabled }) {
  return (
    <button
      className={`square ${isWinning ? 'square--winning' : ''}`}
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default Square;
