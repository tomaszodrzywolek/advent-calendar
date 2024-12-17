import React, {useState} from "react";
import "./Battleship.css";
import GameOver from "../../GameOver/GameOver";

const GRID_SIZE = 8; // 8x8 grid
const SHIP_COUNT = 5; // Number of ships

const Battleship = ({openingCode}) => {
  const [board, setBoard] = useState(generateEmptyBoard());
  const [ships, setShips] = useState(generateShips());
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [message, setMessage] = useState("Zacznij zgadywać!");

  // Generate an empty board
  function generateEmptyBoard() {
    return Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null));
  }

  // Generate random ships
  function generateShips() {
    const newShips = [];
    while (newShips.length < SHIP_COUNT) {
      const shipX = Math.floor(Math.random() * GRID_SIZE);
      const shipY = Math.floor(Math.random() * GRID_SIZE);
      const position = `${shipX}-${shipY}`;

      if (!newShips.includes(position)) {
        newShips.push(position);
      }
    }
    return newShips;
  }

  // Handle grid click
  const handleClick = (row, col) => {
    const position = `${row}-${col}`;
    const newBoard = [...board];

    if (newBoard[row][col] !== null || message.includes("Game Over")) return;

    if (ships.includes(position)) {
      newBoard[row][col] = "hit";
      setHits(hits + 1);
      setMessage("Trafiony!");
    } else {
      newBoard[row][col] = "miss";
      setMisses(misses + 1);
      setMessage("Pudło!");
    }

    setBoard(newBoard);

    if (hits + 1 === SHIP_COUNT) {
      setMessage("Game Over! You sunk all ships!");
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(generateEmptyBoard());
    setShips(generateShips());
    setHits(0);
    setMisses(0);
    setMessage("Zacznij zgadywać!");
  };

  return (
    <div className="battleship-container">
      <h1>Trafiony-Zatopiony</h1>
      <p>{message}</p>
      <div className="grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell === "hit" ? "💥" : cell === "miss" ? "🌊" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="stats">
        <p>Trafienia: {hits}</p>
        <p>Pudła: {misses}</p>
      </div>
      {message.includes("Game Over") && <GameOver hasWon={true} onReset={resetGame} openingCode={openingCode}/>}
    </div>
  );
};

export default Battleship;
