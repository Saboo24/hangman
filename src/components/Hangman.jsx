import React from "react";
import "./Hangman.css"
function Hangman({ wrongCount }) {
  return (
    <div className="hangman">
      <div className="pole" />
      <div className="beam" />
      <div className="rope" />

      {wrongCount > 0 && <div className="head" />}
      {wrongCount > 1 && <div className="body" />}
      {wrongCount > 2 && <div className="arm left" />}
      {wrongCount > 3 && <div className="arm right" />}
      {wrongCount > 4 && <div className="leg left" />}
      {wrongCount > 5 && <div className="leg right" />}
    </div>
  );
}

export default Hangman;