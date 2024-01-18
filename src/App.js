import React, { useState, useEffect } from 'react';
import CardsComponent from './Cards.js';
import './style.css';

export default function App() {
  const [deck, setDeck] = useState([]);
  const [cardDrawn, setCardDrawn] = useState([]);
  const [emptyDeckMessage, setEmptyDeckMessage] = useState('');
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [chance, setChance] = useState(10);

  const generateDeck = () => {
    const suits = ['❤️', '♦️', '♣️', '♠️'];
    const cardValues = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];
    let deck = [];
    suits.forEach((suit) => {
      cardValues.forEach((value) => {
        deck.push({ suit, value });
      });
    });
    setDeck(deck);
  };
  const cardFlipped = (cardData) => {
    if (chance > 0) {
      setChance((prevChance) => prevChance - 1);
      if (flippedCards.includes(cardData)) {
        setScore((prevScore) => prevScore + 1);
      }
      let flipppedCardsArray = [...flippedCards];
      flipppedCardsArray.push(cardData);
      setFlippedCards(flipppedCardsArray);
    } else {
      alert('Chance Over');
    }
  };
  useEffect(() => {
    generateDeck();
  }, []);
  const suffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  const drawFiveCard = () => {
    if (cardDrawn.length >= 52) {
      setEmptyDeckMessage('Deck is empty');
    } else {
      const drawn = [...cardDrawn];
      const ogDeck = [...deck];
      const suffledDeck = suffleDeck([...deck]);
      const fiveRandomCards = suffledDeck.slice(0, 5);
      let updatedDock = ogDeck.filter(
        (item) =>
          !fiveRandomCards.some(
            (card) => item.suit === card.suit && item.value === card.value
          )
      );
      drawn.push(...fiveRandomCards);
      setCardDrawn(drawn);
      setDeck(updatedDock);
    }
  };
  return (
    <div className="card-table">
      {chance === 0 && <div className="game-over">Game Over</div>}
      <p className="score">
        Score: {score}, Chance: {chance}
      </p>

      {emptyDeckMessage === '' ? (
        <div
          className="draw-card"
          onClick={() => {
            drawFiveCard();
          }}
        >
          Draw Card
        </div>
      ) : (
        <p>{emptyDeckMessage}</p>
      )}
      <div className="row">
        {cardDrawn.map((card) => {
          return (
            <div className="col">
              <CardsComponent cardData={card} cardFlipped={cardFlipped} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
