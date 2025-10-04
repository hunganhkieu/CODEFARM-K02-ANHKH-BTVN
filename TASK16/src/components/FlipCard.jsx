import React, { useState } from "react";
import Card from "./Card";
import "../styles/card.css";

function generateCard() {
  const totalCard = 12;
  const luckyIndex = Math.floor(Math.random() * totalCard);
  console.log("lá vàng là thẻ thứ", luckyIndex + 1);

  return Array.from({ length: totalCard }, (_, index) => ({
    id: index,
    isFlipped: false,
    isLucky: index === luckyIndex,
  }));
}
const FlipCard = () => {
  const flipCard = (id) => {
    if (status != "Xin mời chọn") return;

    if (remainingTurn <= 0) return;

    const idCard = cards.find((card) => card.id === id);
    if (idCard.isFlipped) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    const newRemaining = remainingTurn - 1;

    if (idCard.isLucky) {
      setCards(newCards);
      setStatus("Bạn đã thắng");
    } else if (newRemaining === 0) {
      setCards(newCards);
      setRemainingTurn(newRemaining);
      setStatus("Bạn đã thua");
    } else {
      setCards(newCards);
      setRemainingTurn(newRemaining);
    }
  };

  const resetGame = () => {
    setCards(generateCard());
    setRemainingTurn(3);
    setStatus("Xin mời chọn");
  };
  const [cards, setCards] = useState(generateCard);

  const [remainingTurn, setRemainingTurn] = useState(3);

  const [status, setStatus] = useState("Xin mời chọn");
  return (
    <div>
      <h2>lượt còn lại: {remainingTurn}</h2>
      <h3>trạng thái: {status}</h3>

      <div className="card-list">
        {cards.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            isFlipped={item.isFlipped}
            isLucky={item.isLucky}
            onFlip={flipCard}
          />
        ))}
      </div>

      <button onClick={resetGame}>Chơi lại</button>
    </div>
  );
};

export default FlipCard;
