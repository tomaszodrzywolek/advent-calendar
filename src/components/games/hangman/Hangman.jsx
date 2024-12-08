import React, {useState, useEffect} from 'react';
import './Hangman.css';
import image0 from "../../../img/hangman/s0.jpg";
import image1 from "../../../img/hangman/s1.jpg";
import image2 from "../../../img/hangman/s2.jpg";
import image3 from "../../../img/hangman/s3.jpg";
import image4 from "../../../img/hangman/s4.jpg";
import image5 from "../../../img/hangman/s5.jpg";
import image6 from "../../../img/hangman/s6.jpg";
import image7 from "../../../img/hangman/s7.jpg";
import image8 from "../../../img/hangman/s8.jpg";
import image9 from "../../../img/hangman/s9.jpg";

const letterArray = [
    "A", "Ą", "B", "C", "Ć", "D", "E",
    "Ę", "F", "G", "H", "I", "J", "K",
    "L", "Ł", "M", "N", "Ń", "O", "Ó",
    "P", "Q", "R", "S", "Ś", "T", "U",
    "V", "W", "X", "Y", "Z", "Ż", "Ź"
];

const clues = [
    "PREZENTY",
    "GWIAZDKA",
    "PASTERKA",
    "OPŁATEK",
    "CHOINKA"
];

const mistakeImages = [
    image0,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9
];

const Hangman = ({openingCode}) => {
    const [clue, setClue] = useState(clues[Math.floor(Math.random() * clues.length)].toUpperCase());
    const [clueBlank, setClueBlank] = useState("");
    const [mistakeCounter, setMistakeCounter] = useState(0);
    const [usedLetters, setUsedLetters] = useState([]);
    const [gameStatus, setGameStatus] = useState("playing");
    // gameStatus: "playing", "win", or "lose"

    useEffect(() => {
        // Initialize clueBlank
        let blank = "";
        for (let i = 0; i < clue.length; i++) {
            blank += (clue.charAt(i) === " ") ? " " : "-";
        }
        setClueBlank(blank);
    }, [clue]);

    function replaceChar(str, index, character) {
        return str.substring(0, index) + character + str.substring(index + 1);
    }

    const checkLetter = (index) => {
        if (gameStatus !== "playing") return; // If game over, no action
        const letter = letterArray[index];
        let guessed = false;
        let updatedClueBlank = clueBlank;

        for (let i = 0; i < clue.length; i++) {
            if (clue.charAt(i) === letter) {
                updatedClueBlank = replaceChar(updatedClueBlank, i, letter);
                guessed = true;
            }
        }

        setUsedLetters([...usedLetters, index]);

        if (guessed) {
            setClueBlank(updatedClueBlank);
            if (updatedClueBlank === clue) {
                setGameStatus("win");
            }
        } else {
            const newMistakeCount = mistakeCounter + 1;
            setMistakeCounter(newMistakeCount);
            if (newMistakeCount >= 9) {
                setGameStatus("lose");
            }
        }
    };

    const resetGame = () => {
        let blank = "";
        for (let i = 0; i < clue.length; i++) {
            blank += (clue.charAt(i) === " ") ? " " : "-";
        }
        setClueBlank(blank);
        setMistakeCounter(0);
        setUsedLetters([]);
        setGameStatus("playing");
        setClue(clues[Math.floor(Math.random() * clues.length)].toUpperCase());
    };

    const renderAlphabet = () => {
        if (gameStatus === "win") {
            return (
                <div id="hangman-alphabet">
                    Tak jest! Podano prawidłowe hasło: {clue}
                    <p>Twój kod do skrzyni: <b>{openingCode}</b></p>
                    <span className="hangman-reset" onClick={resetGame}>JESZCZE RAZ?</span>
                </div>
            );
        } else if (gameStatus === "lose") {
            return (
                <div id="hangman-alphabet">
                    Przegrana! Prawidłowe hasło: {clue}
                    <br/><br/>
                    <span className="hangman-reset" onClick={resetGame}>JESZCZE RAZ?</span>
                </div>
            );
        } else {
            // Game in progress
            return (
                <div id="hangman-alphabet">
                    {letterArray.map((letter, i) => {
                        const used = usedLetters.includes(i);
                        return (
                            <div
                                key={i}
                                className="hangman-letter"
                                style={{
                                    background: used ? (clue.includes(letter) ? "#003300" : "#330000") : "",
                                    color: used ? (clue.includes(letter) ? "#00C000" : "#C00000") : "",
                                    border: used ? (clue.includes(letter) ? "3px solid #00C000" : "3px solid #C00000") : "3px solid gray",
                                    cursor: used ? "default" : "pointer"
                                }}
                                onClick={() => {
                                    if (!used) checkLetter(i)
                                }}
                            >
                                {letter}
                            </div>
                        )
                    })}
                    <div style={{clear: "both"}}></div>
                </div>
            );
        }
    };

    const imageSrc = mistakeImages[mistakeCounter];

    return (
        <div id="hangman-container">
            <div id="hangman-board">
                {clueBlank}
            </div>
            <div id="hangman-gallows">
                <img src={imageSrc} alt=""/>
            </div>
            {renderAlphabet()}
            <div style={{clear: "both"}}></div>
        </div>
    );
};

export default Hangman;
