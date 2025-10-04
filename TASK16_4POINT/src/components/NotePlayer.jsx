import React from "react";

const NotePlayer = ({ player }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <h3>Chú thích người chơi:</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px 20px",
        }}
      >
        {player.map((item) => (
          <div
            key={item.player}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <div
              style={{
                background: item.color,
                width: "15px",
                height: "15px",
                borderRadius: "3px",
              }}
            ></div>
            <span>Người chơi {item.player}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotePlayer;
