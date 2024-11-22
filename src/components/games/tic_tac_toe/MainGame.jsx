import { useState } from "react";
import GameBoard from "./GameBoard";
import Player from "./Player";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./helpers/winning_combinations";
import GameOver from "./GameOver";
import './MainGame.css';

const PLAYERS = {
  X: 'Daria',
  O: 'Tomek'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player == 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = '';

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

let isNotAllowedToSelectSquare = false;

function MainGame() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length > 8 && !winner;

  setTimeout(() => {
    isNotAllowedToSelectSquare = false;
  }, 500);

  function handleSelectSquare(rowIndex, colIndex) {
    if (isNotAllowedToSelectSquare) {
      return;
    }
    setGameTurns(prevTurns => {
      isNotAllowedToSelectSquare = true;
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function restartGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialPlayerName={players.X} symbol="X" isActive={currentPlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialPlayerName={players.O} symbol="O" isActive={currentPlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset={restartGame} />}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
    </main>
  );
}

export default MainGame
