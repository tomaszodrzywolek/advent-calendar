import React from 'react';
import './Modal.css';
import MainGame from './games/tic_tac_toe/MainGame';
import SnakeGame from './games/snake/Snake';

function Modal({ closeModal, doorId, openingCode }) {



  const ticTacToe = (
    <MainGame openingCode={openingCode} />
  );

  const snakeGame = (<>
  <SnakeGame />
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