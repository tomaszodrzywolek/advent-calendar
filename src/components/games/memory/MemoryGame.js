import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
import GameOver from "../../GameOver/GameOver";

const cards = [
  { id: 1, name: "🎄" }, // Christmas Tree
  { id: 2, name: "🎁" }, // Gift
  { id: 3, name: "❄️" }, // Snowflake
  { id: 4, name: "⛄" }, // Snowman
  { id: 5, name: "🎅" }, // Santa
  { id: 6, name: "🦌" }, // Reindeer
  { id: 7, name: "🔔" }, // Bell
  { id: 8, name: "🍪" }, // Cookie
];

const shuffledCards = () => {
  const duplicateCards = [...cards, ...cards]; // Ensures every card has a pair
  return duplicateCards
    .map((card) => ({ ...card, uniqueId: Math.random() }))
    .sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cardDeck, setCardDeck] = useState(shuffledCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (uniqueId) => {
    if (flippedCards.length === 2 || flippedCards.includes(uniqueId)) return;

    setFlippedCards([...flippedCards, uniqueId]);
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const card1 = cardDeck.find((card) => card.uniqueId === firstCard);
      const card2 = cardDeck.find((card) => card.uniqueId === secondCard);

      if (card1.name === card2.name) {
        setMatchedCards((prevMatchedCards) => prevMatchedCards.includes(card1.name) ? prevMatchedCards : [...prevMatchedCards, card1.name]);
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cardDeck, matchedCards]);

  const resetGame = () => {
    setCardDeck(shuffledCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  return (
    <div className="memory-game-container">
      <h1>🎄 Świąteczne Memory 🎅</h1>
      <p>Znajdź wszystkie pary!</p>
      <div className="memory-grid">
        {cardDeck.map((card) => (
          <div
            key={card.uniqueId}
            className={`memory-card ${
              flippedCards.includes(card.uniqueId) || matchedCards.includes(card.name)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card.uniqueId)}
          >
            <div className="card-front">{card.name}</div>
            <div className="card-back">🎄</div>
          </div>
        ))}
      </div>
      {matchedCards.length >= cards.length && <GameOver hasWon={true} onReset={resetGame} openingCode={123} />}
    </div>
  );
};

export default MemoryGame;
