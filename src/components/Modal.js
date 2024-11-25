import React from 'react';
import './Modal.css';
import MainGame from './games/tic_tac_toe/MainGame';
import SnakeGame from './games/snake/Snake';
import SpaceInvaders from "./games/space-invaders/SpaceInvaders";

function Modal({closeModal, doorId, ...props}) {

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className={doorId + '-modal-content modal-content'} onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;