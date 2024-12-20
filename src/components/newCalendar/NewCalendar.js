import React, {useEffect, useState} from "react";
import {createCalendar} from "../../helpers/helpers";
import {fetchTimeFromLocal, fetchTimeFromTimeApi} from "../time-fetchers/fetchTimeHelpers";
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
import JunctionCross from "../games/junction-cross/JunctionCross";
import TankGame from "../games/tanks/TankGame";
import IcyTowerGame from "../games/platformer/IcyTowerGame";
import Simon from "../games/simon-says-music/SimonSaysMusical";
import Hangman from "../games/hangman/Hangman";
import Pong from "../games/pong/Pong";
import Breakout from "../games/breakout/Breakout";
import BubbleShooter from "../games/puzzle-bobble/BubbleShooter";
import MillionaireGame from "../games/millionaire-game/MillionaireGame";
import WordSearchGame from "../games/word-search/WordSearchGame";
import ConnectFour from "../games/connectFour/ConnectFour";
import Battleship from "../games/battleship/Battleship";

let selectedDoorId = undefined;
let code = undefined;

function mapDoorIdToDate(doorId) {
    const baseDate = new Date(2024, 11, 1, 0, 0, 0);
    const match = doorId.match(/^hatch-(\d+)$/);
    const number = parseInt(match[1], 10);

  const newDate = new Date(baseDate);
  newDate.setDate(baseDate.getDate() + (number - 1));

  return newDate;
}

export function NewCalendar() {
  const [doors, setDoors] = useState(createCalendar());
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(undefined);

  useEffect(() => {
    const requestCurrentDate = () => {
      fetchTimeFromTimeApi()
        .then(currentDayInPolishTimeZone => setCurrentDate(currentDayInPolishTimeZone))
        .catch(() => fetchTimeFromLocal());
    };
    requestCurrentDate();
  }, []);

  const openModal = (doorId, openingCode) => {
    selectedDoorId = doorId;
    code = openingCode;
    setShowModal((previousModalState) => !previousModalState);
  };
  const closeModal = () => setShowModal(false);

  const handleOpenDoor = (id) => {
    const isAllowedToOpen = currentDate >= mapDoorIdToDate(id);
    if (!isAllowedToOpen) {
      console.log('Not allowed to open');
      return;
    }
    const updatedDoors = doors.map(door =>
      door.id === id ? {...door, open: !door.open} : door
    );
    setDoors(updatedDoors);
  }

  function selectGame(doorId) {
    if (doorId === 'hatch-1') {
      return <SnakeGame openingCode={code}/>
    }
    if (doorId === 'hatch-2' || doorId === 'hatch-21') {
      return <MemoryGame openingCode={code}/>
    }
    if (doorId === 'hatch-3' || doorId === 'hatch-22') {
      return <GuessNumber openingCode={code}/>
    }
    if (doorId === 'hatch-4') {
      return <WhacAMole/>
    }
    if (doorId === 'hatch-5') {
      return <MainGame openingCode={code}/>
    }
    if (doorId === 'hatch-6') {
      return <PuzzleGame openingCode={code}/>
    }
    if (doorId === 'hatch-7') {
      return <SpaceInvaders openingCode={code}/>
    }
    if (doorId === 'hatch-8') {
      return <JunctionCross openingCode={code}/>
    }
    if (doorId === 'hatch-9') {
      return <TankGame openingCode={code}/>
    }
    if (doorId === 'hatch-10') {
      return <IcyTowerGame openingCode={code}/>
    }
    if (doorId === 'hatch-11') {
      return <Simon openingCode={code}/>
    }
    if (doorId === 'hatch-12' || doorId === 'hatch-23') {
      return <Hangman openingCode={code}/>
    }
    if (doorId === 'hatch-13') {
      return <Pong openingCode={code}/>
    }
    if (doorId === 'hatch-14') {
      return <Breakout openingCode={code}/>
    }
    if (doorId === 'hatch-15' || doorId === 'hatch-24') {
      return <BubbleShooter openingCode={code}/>
    }
    if (doorId === 'hatch-16') {
      return <MillionaireGame openingCode={code}/>
    }
    if (doorId === 'hatch-17') {
      return <WordSearchGame openingCode={code}/>
    }
    if (doorId === 'hatch-19') {
      return <ConnectFour openingCode={code}/>
    }
    if (doorId === 'hatch-20') {
      return <Battleship openingCode={code}/>
    } else {
      return <SnakeGame/>
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