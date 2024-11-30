import React, { useState } from "react";
import "./PuzzleGame.css";
import GameOver from "../../GameOver/GameOver";

const PuzzleGame = (props) => {
  const imageSrc = "https://thumbs.dreamstime.com/z/festive-boxer-dog-wearing-santa-hat-christmas-celebration-ai-generated-festive-boxer-dog-wearing-santa-hat-christmas-329125312.jpg?w=992";
  const gridSize = 5; // Define the puzzle grid size (e.g., 5x5)
  const totalPieces = gridSize * gridSize;

  const generateInitialBoard = () => {
    const pieces = Array.from({ length: totalPieces }, (_, index) => index);
    return shuffleArray(pieces);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [board, setBoard] = useState(generateInitialBoard());
  const [draggedPiece, setDraggedPiece] = useState(null);

  const handleDragStart = (index) => {
    setDraggedPiece(index);
  };

  const handleDrop = (index) => {
    const newBoard = [...board];
    const temp = newBoard[index];
    newBoard[index] = board[draggedPiece];
    newBoard[draggedPiece] = temp;

    setBoard(newBoard);
    setDraggedPiece(null);
  };

  const handleReset = () => {
    setBoard(generateInitialBoard());
  };

  const isSolved = board.every((value, index) => value === index);

  const getPieceStyle = (index) => {
    return {
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
      backgroundPosition: `${(board[index] % gridSize) * (100 / (gridSize - 1))}% ${
        Math.floor(board[index] / gridSize) * (100 / (gridSize - 1))
      }%`,
    };
  };

  return (
    <div className="puzzle-container">
      <h1>Puzzle Świąteczny Bokser</h1>
      <a href={imageSrc} target="blank"><img className="puzzle-source-image" src={imageSrc} alt="boxer-dog-in-santa-hat"/></a>
      <div className="puzzle-board">
        {board.map((_, index) => (
          <div
            key={index}
            className="puzzle-piece"
            style={getPieceStyle(index)}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          ></div>
        ))}
      </div>
      {isSolved && <GameOver hasWon={isSolved} onReset={handleReset} openingCode={props.openingCode} />}
    </div>
  );
};

export default PuzzleGame;
