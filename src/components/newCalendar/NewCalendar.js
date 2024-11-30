import React, { useState } from "react";
import { createCalendar } from "../../helpers/helpers";
import Door from "./Door";
import './NewCalendar.css';
import Modal from "../Modal";
import MainGame from "../games/tic_tac_toe/MainGame";
import SpaceInvaders from "../games/space-invaders/SpaceInvaders";
import SnakeGame from "../games/snake/Snake";
import WhacAMole from "../games/whack-a-mole/WhacAMole";
import GuessNumber from "../games/guess-number/GuessNumber";
import MemoryGame from "../games/memory/MemoryGame";
import PuzzleGame from "../games/puzzle-game/PuzzleGame";

let selectedDoorId = undefined;
let code = undefined;

function mapDoorIdtoDate(doorId) {
  const baseDate = new Date('2024-12-01');
  const match = doorId.match(/^hatch-(\d+)$/);
  const number = parseInt(match[1], 10);

  const newDate = new Date(baseDate);
  newDate.setDate(baseDate.getDate() + (number - 1));

  return newDate;
}

function checkIfCorrectDate(doorId) {
  const now = new Date();
  const polishOffset = new Date().getTimezoneOffset() + 60; // Offset from UTC+1 (CET)
  const currentDayInPolishTimeZone = new Date(now.getTime() + polishOffset * 60 * 1000);

  const doorDate = mapDoorIdtoDate(doorId);

  return currentDayInPolishTimeZone >= doorDate;
}

export function NewCalendar() {
  const [doors, setDoors] = useState(createCalendar());

  const [showModal, setShowModal] = useState(false);

  const openModal = (doorId, openingCode) => {
    selectedDoorId = doorId;
    code = openingCode;
    setShowModal((previousModalState) => !previousModalState);
  };
  const closeModal = () => setShowModal(false);

  const handleOpenDoor = id => {
    const isAllowedToOpen = checkIfCorrectDate(id);
    if (!isAllowedToOpen) {
      console.log('Not allowed to open');
      return;
    }
    const updatedDoors = doors.map(door =>
      door.id === id ? { ...door, open: !door.open } : door
    );
    setDoors(updatedDoors);
  }

  function selectGame(doorId) {
    if (doorId === 'hatch-1') {
      return <SnakeGame openingCode={code} />
    }
    if (doorId === 'hatch-2') {
      return <MemoryGame openingCode={code} />
    }
    if (doorId === 'hatch-3') {
      return <GuessNumber openingCode={code} />
    }
    if (doorId === 'hatch-4') {
      return <WhacAMole />
    }
    if (doorId === 'hatch-5') {
      return <MainGame openingCode={code} />
    }
    if (doorId === 'hatch-6') {
      return <PuzzleGame openingCode={code} />
    }
    if (doorId === 'hatch-7') {
      return <SpaceInvaders openingCode={code} />
    }
    else {
      return <SnakeGame />
    }
  }

  const selectedGame = selectGame(selectedDoorId);

  return (
    <div className="calendar">
      {doors.map(door => <Door
        key={door.id}
        doorData={door}
        handleClick={handleOpenDoor}
        openModal={openModal}
      />)}
      {showModal && <Modal closeModal={closeModal} doorId={selectedDoorId}>
        {selectedGame}
      </Modal>}
    </div>
  );

}