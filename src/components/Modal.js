import React from 'react';
import SnakeGame from './games/SnakeGame';
import './Modal.css';

function Modal({ closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <h2>🎮 Snake Game 🎮</h2>
        <SnakeGame />
        <p>Use arrow keys to control the snake!</p>
      </div>
    </div>
  );
}

export default Modal;