import React from "react";
import "./Keyboard.css";

function Keyboard({ onGuess, disabledLetters }) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="keyboard">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={disabledLetters.includes(letter)}
          className="key"
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;