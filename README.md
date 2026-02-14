# Tic-Tac-Toe

A full-featured two-player Tic-Tac-Toe game built with React.

## Features

- **3×3 Game Board** – Classic grid layout with 3D-styled squares
- **Alternating Turns** – X and O players take turns
- **Turn Timer** – 5 seconds per turn; auto-switches if time runs out
- **Win Detection** – Rows, columns, and diagonals; winning line highlighted in yellow
- **Draw Detection** – Board full with no winner; modal prompts Continue or Restart
- **Round Over Modal** – Winner/draw screen with scores, Continue (next round) and Restart
- **Move History + Time Travel** – Browse moves and jump back to any board state
- **Undo Move** – Revert the last move during play
- **Scoreboard** – Player wins and draws tracked
- **Player Names** – Custom names for both players
- **Dark/Light Mode** – Theme toggle with preference saved in `localStorage`
- **Landing Page** – Start screen with Play Now

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in the browser.

### Build

```bash
npm run build
```

### Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/
│   ├── Board.js          # Game grid and logic
│   ├── Square.js         # Individual cell
│   ├── Header.js         # Logo and theme toggle
│   ├── PlayerPanel.js    # Player avatar, name, score
│   ├── Scoreboard.js     # Win/draw totals
│   ├── PlayerNameInput.js
│   ├── MoveHistory.js    # Move list with time travel
│   ├── RoundOverModal.js
│   └── LandingPage.js
├── contexts/
│   ├── TicTacToeContext.js   # Game state
│   └── ThemeContext.js       # Dark/light mode
└── themes.css                # Theme variables
```

## Tech Stack

- React 19
- Create React App
