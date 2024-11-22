import React from 'react';
import SnakeGame from './games/SnakeGame';
import './Modal.css';
import MainGame from './games/tic_tac_toe/MainGame';

function Modal({ closeModal, doorId }) {



  const ticTacToe = (
    <MainGame />
  );

  const snakeGame = (<>
    <h2>🎮 Snake Game 🎮</h2>
          <SnakeGame />
          <p>Use arrow keys to control the snake!</p>
    </>);

  console.log(doorId);


  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {doorId === 'hatch-1' ? ticTacToe : snakeGame }
      </div>
    </div>
  );
}

export default Modal;