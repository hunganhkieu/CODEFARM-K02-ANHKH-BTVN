import React, { useState } from "react";
import Players from "./Players";
import NotePlayer from "./NotePlayer";
import { getRandomColor } from "../utils";
import Board from "./Board";

const TOTAL_CELLS = 30;

const Game = () => {
  const [player, setPlayer] = useState([
    { player: 1, currentIndex: 1, color: getRandomColor() },
    { player: 2, currentIndex: 1, color: getRandomColor() },
  ]);

  const [game, setGame] = useState({
    dice: 6,
    currentPlayerIndex: 0,
    start: false,
    winner: null,
  });

  const rollDice = () => {
    if (game.winner) return;

    const diceValue = Math.floor(Math.random() * 6) + 1;
    setGame((pre) => ({ ...pre, dice: diceValue }));

    setPlayer((prev) => {
      const newPlayers = [...prev];
      const currentIndex = game.currentPlayerIndex;

      newPlayers[currentIndex].currentIndex += diceValue;

      if (newPlayers[currentIndex].currentIndex >= TOTAL_CELLS) {
        newPlayers[currentIndex].currentIndex = TOTAL_CELLS;
        setGame((pre) => ({ ...pre, winner: newPlayers[currentIndex].player }));
      }

      return newPlayers;
    });

    if (diceValue !== 6) {
      setGame((pre) => ({
        ...pre,
        currentPlayerIndex: (pre.currentPlayerIndex + 1) % player.length,
      }));
    }
  };

  const resetGame = () => {
    setPlayer((prev) => prev.map((p) => ({ ...p, currentIndex: 1 })));
    setGame({ dice: 0, currentPlayerIndex: 0, start: false, winner: null });
  };

  return (
    <div>
      {!game.start && (
        <Players player={player} setPlayer={setPlayer} setGame={setGame} />
      )}

      {game.start && (
        <div>
          <NotePlayer player={player} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "10px",
            }}
          >
            {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
              <Board player={player} index={index} key={index} />
            ))}
          </div>

          <div style={{ marginTop: "20px" }}>
            {game.winner ? (
              <h2>Người chơi {game.winner} chiến thắng!</h2>
            ) : (
              <h3>Lượt người chơi {player[game.currentPlayerIndex].player}</h3>
            )}

            {!game.winner && (
              <button
                onClick={rollDice}
                style={{ marginTop: "10px", padding: "8px 16px" }}
              >
                Tung Xúc Xắc
              </button>
            )}

            {game.winner && (
              <button
                onClick={resetGame}
                style={{ marginTop: "10px", padding: "8px 16px" }}
              >
                Chơi lại
              </button>
            )}

            <div
              style={{
                background: "red",
                height: "50px",
                width: "50px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "3px",
                padding: "5px",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              {Array.from({ length: game.dice }, (_, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    justifySelf: "center",
                    alignSelf: "center",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
