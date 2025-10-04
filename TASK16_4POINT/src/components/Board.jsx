import React from "react";

const Board = ({ player, index }) => {
  return (
    <div
      key={index}
      style={{
        width: "70px",
        height: "70px",
        position: "relative",
        border: "2px solid black",
      }}
    >
      <span
        style={{
          color: "black",
          position: "absolute",
          top: "2px",
          left: "5px",
        }}
      >
        {index + 1}
      </span>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3px",
          position: "absolute",
          bottom: "5px",
          left: "5px",
          maxWidth: "60px",
        }}
      >
        {player.map((item) =>
          index === item.currentIndex - 1 ? (
            <div
              key={item.player}
              style={{
                background: item.color,
                width: "15px",
                height: "15px",
                color: "white",
                fontSize: "12px",
                textAlign: "center",
                lineHeight: "15px",
                borderRadius: "3px",
              }}
            >
              {item.player}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Board;
