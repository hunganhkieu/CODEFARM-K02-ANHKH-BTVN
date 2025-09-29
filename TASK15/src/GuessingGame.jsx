import React, { useState } from "react";

const GuessingGame = () => {
  const [secretNumber, setSecretNumber] = useState(null); // số bí mật
  const [guessedNumber, setGuessedNumber] = useState(""); // số đoán
  const [gameStatus, setGameStatus] = useState(""); // trạng thái game
  const [message, setMessage] = useState(""); // thông báo
  const [remainingTurn, setRemainingTurn] = useState(10); // lượt còn lại
  const [difficultyMax, setDifficultyMax] = useState(null); // độ khó

  function handleGuess() {
    if (!secretNumber || !difficultyMax) {
      setMessage("Bạn chưa chọn độ khó!");
      return;
    }

    const guess = parseInt(guessedNumber);
    if (isNaN(guess) || guess < 1) {
      setMessage("Số đoán phải là số nguyên >= 1!");
      return;
    }

    if (guess === secretNumber) {
      setGameStatus("win");
      setMessage(" Chúc mừng! Bạn đã đoán đúng số bí mật!");
    } else {
      const newTurn = remainingTurn - 1;
      setRemainingTurn(newTurn);

      if (newTurn <= 0) {
        setGameStatus("lose");
        setMessage(` Hết lượt! Số bí mật là ${secretNumber}.`);
      } else {
        setMessage(" Sai rồi, hãy thử lại!");
      }
    }
    setGuessedNumber("");
  }

  function handleSetDifficultyMax(e) {
    const value = e.target.value;

    if (!value) {
      setDifficultyMax(null);
      setSecretNumber(null);
      setGameStatus("");
      setMessage("Bạn chưa chọn độ khó!");
      setRemainingTurn(10);
      setGuessedNumber("");
      return;
    }
    const max = parseInt(value);
    setDifficultyMax(max);

    const random = Math.floor(Math.random() * max) + 1;
    setSecretNumber(random);

    setRemainingTurn(10);
    setGameStatus("playing");
    setMessage(`Game bắt đầu! Hãy nhập số từ 1 đến ${max}.`);
    setGuessedNumber("");
    console.log("Số bí mật:", random);
  }

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <p>Lượt còn lại: {remainingTurn}</p>
        {message && (
          <p
            style={{
              color:
                gameStatus === "win"
                  ? "green"
                  : gameStatus === "lose"
                  ? "red"
                  : "blue",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>

      <input
        type="number"
        value={guessedNumber}
        onChange={(e) => setGuessedNumber(e.target.value)}
        placeholder="Nhập số muốn đoán"
        disabled={gameStatus === "win" || gameStatus === "lose"}
      />
      <button
        onClick={handleGuess}
        disabled={gameStatus === "win" || gameStatus === "lose"}
      >
        Đoán
      </button>

      <select
        name="difficulty"
        id="difficulty"
        onChange={handleSetDifficultyMax}
      >
        <option value="">-- Chọn độ khó --</option>
        <option value="50">Dễ (1 - 50)</option>
        <option value="100">Trung bình (1 - 100)</option>
        <option value="200">Khó (1 - 200)</option>
      </select>
    </>
  );
};

export default GuessingGame;
