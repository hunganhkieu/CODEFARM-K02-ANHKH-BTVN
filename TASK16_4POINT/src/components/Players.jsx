import React from "react";
import { getRandomColor } from "../utils";

const Players = ({ player, setPlayer, setGame }) => {
  const handlePlay = () => {
    if (player.length <= 1 || player.length > 6) {
      alert("số người chơi phải lớn hơn hoặc bằng 1 và nhỏ hơn hoặc bằng 6");
      return;
    }
    setGame((pre) => ({ ...pre, start: true }));
  };

  const inputChange = (e) => {
    const value = Number(e.target.value);
    setPlayer((pre) => {
      if (pre.length > value) {
        return pre.slice(0, value);
      }

      if (pre.length < value) {
        const newPlayer = Array.from(
          { length: value - pre.length },
          (_, i) => ({
            player: pre.length + i + 1,
            currentIndex: 1,
            color: getRandomColor(),
          })
        );
        return [...pre, ...newPlayer];
      }
      return pre;
    });
  };
  return (
    <div>
      <input type="number" defaultValue={player} onChange={inputChange} />
      <button onClick={handlePlay}>Bắt đầu chơi</button>
    </div>
  );
};

export default Players;
