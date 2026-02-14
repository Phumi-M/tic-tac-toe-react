import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const TicTacToeContext = createContext(null);
const TURN_TIME_SECONDS = 5;

const INITIAL_SQUARES = Array(9).fill(null);

export function TicTacToeProvider({ children }) {
  const [history, setHistory] = useState([INITIAL_SQUARES]);
  const [currentStep, setCurrentStep] = useState(0);
  const squares = history[currentStep];
  const xIsNext = currentStep % 2 === 0;
  const [timeRemaining, setTimeRemaining] = useState(TURN_TIME_SECONDS);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [draws, setDraws] = useState(0);
  const [player1Marker, setPlayer1Marker] = useState('X');
  const [roundWinner, setRoundWinner] = useState(null);
  const [roundDraw, setRoundDraw] = useState(false);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');

  const player2Marker = player1Marker === 'X' ? 'O' : 'X';
  const player1Score = player1Marker === 'X' ? scoreX : scoreO;
  const player2Score = player2Marker === 'X' ? scoreX : scoreO;
  const xPlayerName = player1Marker === 'X' ? player1Name : player2Name;
  const oPlayerName = player1Marker === 'X' ? player2Name : player1Name;
  const player1Active =
    (xIsNext && player1Marker === 'X') || (!xIsNext && player1Marker === 'O');
  const player2Active =
    (xIsNext && player2Marker === 'X') || (!xIsNext && player2Marker === 'O');
  const canUndo = currentStep > 0 && !roundWinner && !roundDraw;
  const showRestartBtn = !roundWinner && !roundDraw;
  const showRoundOverModal = !!roundWinner || roundDraw;
  const isGameActive = !roundWinner && !roundDraw;

  const jumpToStep = useCallback(
    (step) => {
      setCurrentStep(step);
      setTimeRemaining(TURN_TIME_SECONDS);
    },
    []
  );

  useEffect(() => {
    if (!isGameActive) return;
    if (timeRemaining <= 0) {
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push([...squares]);
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);
      setTimeRemaining(TURN_TIME_SECONDS);
      return;
    }
    const id = setInterval(() => setTimeRemaining((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [currentStep, history, isGameActive, squares, timeRemaining]);

  const jumpToStepWithReset = useCallback(
    (step) => {
      jumpToStep(step);
      if (step < history.length - 1) {
        setRoundWinner(null);
        setRoundDraw(false);
      }
    },
    [history.length, jumpToStep]
  );

  const actions = useMemo(
    () => ({
      handleSquareClick(nextSquares, gameEnded = false) {
        const newHistory = history.slice(0, currentStep + 1);
        newHistory.push(nextSquares);
        setHistory(newHistory);
        setCurrentStep(newHistory.length - 1);
        setTimeRemaining(TURN_TIME_SECONDS);
      },
      handleUndo() {
        if (currentStep > 0) jumpToStepWithReset(currentStep - 1);
      },
      jumpToStep: jumpToStepWithReset,
      handleWin(winner) {
        if (winner === 'X') setScoreX((s) => s + 1);
        else if (winner === 'O') setScoreO((s) => s + 1);
        setRoundWinner(winner);
      },
      handleDraw() {
        setDraws((d) => d + 1);
        setRoundDraw(true);
      },
      handleContinue() {
        setHistory([INITIAL_SQUARES]);
        setCurrentStep(0);
        setTimeRemaining(TURN_TIME_SECONDS);
        setPlayer1Marker((m) => (m === 'X' ? 'O' : 'X'));
        setRoundWinner(null);
        setRoundDraw(false);
      },
      handleRestart() {
        setHistory([INITIAL_SQUARES]);
        setCurrentStep(0);
        setTimeRemaining(TURN_TIME_SECONDS);
        setScoreX(0);
        setScoreO(0);
        setDraws(0);
        setPlayer1Marker('X');
        setRoundWinner(null);
        setRoundDraw(false);
      },
      setPlayer1Name,
      setPlayer2Name,
    }),
    [history, currentStep, jumpToStepWithReset]
  );

  const value = useMemo(
    () => ({
      squares,
      xIsNext,
      history,
      currentStep,
      timeRemaining,
      turnTimeSeconds: TURN_TIME_SECONDS,
      player1Marker,
      player2Marker,
      player1Name,
      player2Name,
      player1Score,
      player2Score,
      player1Active,
      player2Active,
      xPlayerName,
      oPlayerName,
      draws,
      roundWinner,
      roundDraw,
      canUndo,
      showRestartBtn,
      showRoundOverModal,
      ...actions,
    }),
    [
      squares,
      xIsNext,
      history,
      currentStep,
      timeRemaining,
      player1Marker,
      player2Marker,
      player1Name,
      player2Name,
      player1Score,
      player2Score,
      player1Active,
      player2Active,
      xPlayerName,
      oPlayerName,
      draws,
      roundWinner,
      roundDraw,
      canUndo,
      showRestartBtn,
      showRoundOverModal,
      actions,
    ]
  );

  return (
    <TicTacToeContext.Provider value={value}>{children}</TicTacToeContext.Provider>
  );
}

export function useTicTacToe() {
  const context = useContext(TicTacToeContext);
  if (!context) {
    throw new Error('useTicTacToe must be used within TicTacToeProvider');
  }
  return context;
}

export function useGameBoard() {
  const {
    squares,
    xIsNext,
    xPlayerName,
    oPlayerName,
    timeRemaining,
    turnTimeSeconds,
    canUndo,
    showRestartBtn,
    handleSquareClick,
    handleUndo,
    handleRestart,
    handleWin,
    handleDraw,
  } = useTicTacToe();
  return {
    squares,
    xIsNext,
    xPlayerName,
    oPlayerName,
    timeRemaining,
    turnTimeSeconds,
    canUndo,
    showRestartBtn,
    onSquareClick: handleSquareClick,
    onUndo: handleUndo,
    onRestart: showRestartBtn ? handleRestart : undefined,
    onWin: handleWin,
    onDraw: handleDraw,
  };
}

export function useGamePlayers() {
  const {
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    player1Marker,
    player2Marker,
    player1Active,
    player2Active,
    setPlayer1Name,
    setPlayer2Name,
  } = useTicTacToe();
  return {
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    player1Marker,
    player2Marker,
    player1Active,
    player2Active,
    setPlayer1Name,
    setPlayer2Name,
  };
}

export function useGameScoreboard() {
  const { player1Name, player2Name, player1Score, player2Score, draws } = useTicTacToe();
  return { player1Name, player2Name, player1Score, player2Score, draws };
}

export function useGameHistory() {
  const { history, currentStep, jumpToStep, xPlayerName, oPlayerName } = useTicTacToe();
  return { history, currentStep, jumpToStep, xPlayerName, oPlayerName };
}

export function useGameModal() {
  const {
    showRoundOverModal,
    roundDraw,
    roundWinner,
    player1Marker,
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    handleContinue,
    handleRestart,
  } = useTicTacToe();
  return {
    showRoundOverModal,
    isDraw: roundDraw,
    winner: roundWinner,
    player1Marker,
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    onContinue: handleContinue,
    onRestart: handleRestart,
  };
}
