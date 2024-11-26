import React, { useState } from "react";
import "./GuessNumber.css";
import GameOver from "../../GameOver/GameOver";

const GuessNumber = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Zgadniesz wylosowaną liczbę?");
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 10;

  const gameEnded = message.startsWith('Koniec Gry!') || message.startsWith('Gratulacje!');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    if (!guess) {
      setMessage("To musi być liczba!");
      return;
    }

    if (attempts >= maxAttempts) {
      setMessage("Koniec Gry! Wszystkie próby wykorzystane. 😢");
      return;
    }

    const playerGuess = parseInt(guess, 10);
    setAttempts(attempts + 1);

    if (playerGuess === randomNumber) {
      setMessage(`Gratulacje! Udało Ci się zgadnąć w ${attempts + 1} próbach.`);
    } else if (attempts + 1 === maxAttempts) {
      setMessage(`Koniec Gry! Liczba to ${randomNumber}. 😢`);
    } else if (playerGuess > randomNumber) {
      setMessage("📉 Za wysoko! Spróbuj jeszcze raz.");
    } else {
      setMessage("📈 Za nisko! Sprobuj jeszcze raz.");
    }
  };

  const resetGame = () => {
    setRandomNumber(generateRandomNumber());
    setGuess("");
    setMessage("Zgadniesz wylosowaną liczbę?");
    setAttempts(0);
  };

  return (
    <div className="guess-number-container">
      <h1>Guess the Number</h1>
      <p>Myślę o liczbie od 1 do 100. Czy uda Ci się ją zgadnąć?</p>
      <p>Zostało prób: {maxAttempts - attempts}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Wpisz liczbę"
        className="guess-input"
        disabled={attempts >= maxAttempts}ś
      />
      <button
        onClick={handleGuess}
        className="guess-button"
        disabled={attempts >= maxAttempts}
      >
        Zgadnij
      </button>
      <button onClick={resetGame} className="reset-button">
        Reset
      </button>
      <p className="message">{message}</p>
      {gameEnded && <GameOver hasWon={message.startsWith('Gratulacje!')} onReset={resetGame} openingCode={123} />}
    </div>
  );
};

export default GuessNumber;
