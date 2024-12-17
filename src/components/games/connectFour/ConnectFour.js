import React, {useState} from 'react';
import './ConnectFour.css';
import GameOver from "../../GameOver/GameOver"; // Add simple styling

const ROWS = 6;
const COLS = 7;

// Connect Four Component
const ConnectFour = ({openingCode}) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);

  // Function to create an empty board
  function createEmptyBoard() {
    return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
  }

  // Handle disc drop
  const handleDrop = (col) => {
    if (winner) return; // If game is over, do nothing

    const newBoard = [...board];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) { // Find first empty cell in the column
        newBoard[row][col] = currentPlayer; // Place current player's disc
        setBoard(newBoard);

        if (checkWinner(newBoard, row, col)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red'); // Switch player
        }
        return;
      }
    }
  };

  // Check for a winner
  const checkWinner = (board, row, col) => {
    const directions = [
      [0, 1],   // Horizontal
      [1, 0],   // Vertical
      [1, 1],   // Diagonal down-right
      [1, -1],  // Diagonal down-left
    ];

    for (let [dr, dc] of directions) {
      let count = 1; // Include the current disc
      count += countInDirection(board, row, col, dr, dc);
      count += countInDirection(board, row, col, -dr, -dc);
      if (count >= 4) return true;
    }
    return false;
  };

  // Count consecutive discs in one direction
  const countInDirection = (board, row, col, dr, dc) => {
    let r = row + dr;
    let c = col + dc;
    let count = 0;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
      count++;
      r += dr;
      c += dc;
    }
    return count;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('red');
    setWinner(null);
  };

  return (
    <div className="connect-four">
      <h1>Connect Four</h1>
      {winner && <h2 className="winner">Player {winner.toUpperCase()} Wins!</h2>}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell ? cell : ''}`}
                onClick={() => handleDrop(colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {winner && <GameOver hasWon={currentPlayer === 'red'} onReset={resetGame} openingCode={openingCode}/>}
      {/*<button onClick={resetGame} className="reset-button">Reset Game</button>*/}
    </div>
  );
};

export default ConnectFour;
