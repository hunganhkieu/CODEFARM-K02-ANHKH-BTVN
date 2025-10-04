import React from "react";

const Card = ({ id, isFlipped, isLucky, onFlip }) => {
  const handleClick = () => {
    onFlip(id);
  };

  return (
    <div
      className={`card ${isFlipped && isLucky ? "lucky" : ""}`}
      onClick={handleClick}
      // data-aos="flip-up"
      // data-aos-once="true"
    >
      {isFlipped ? (
        <div className="card-front">{isLucky ? "đúng" : "sai"}</div>
      ) : (
        <div className="card-back">lật thẻ</div>
      )}
    </div>
  );
};

export default Card;
