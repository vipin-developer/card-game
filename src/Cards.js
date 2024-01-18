import React, { useState } from 'react';
const CardsComponent = ({ cardData, cardFlipped }) => {
  const [cardHidden, setCardHidden] = useState(true);
  return (
    <>
      {cardHidden ? (
        <div
          className="cards cards-hidden"
          onClick={() => {
            cardFlipped(cardData.value),
              setCardHidden((prevState) => !prevState);
          }}
        >
          🥷🏻
        </div>
      ) : (
        <div className="cards">
          <p
            className="card-value"
            style={
              cardData.suit === '❤️' || cardData.suit === '♦️'
                ? { color: 'red' }
                : { color: 'black' }
            }
          >
            {cardData.value}
          </p>
          {cardData.suit}
        </div>
      )}
    </>
  );
};
export default CardsComponent;
