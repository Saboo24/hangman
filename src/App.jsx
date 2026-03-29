import React, { useState, useEffect } from "react";
import Hangman from "./components/Hangman";
import Keyboard from "./components/Keyboard";
import Intro from "./components/Intro";
import MapLvl from "./components/MapLvl";
import "./App.css";

function App() {
  const levels = [
    { name: "Level 1", words: ["amine", "codes"] },
    { name: "Level 2", words: ["sabo", "game","unity"] },
    { name: "Level 3", words: ["react", "vite", "grome"] },
    { name: "Level 4", words: ["javascript", "python", "ace","github"] },
    { name: "Level 5", words: ["developer", "hacker", "frontend" ,"backend"] },
    { name: "Level 6", words: ["naruto", "zoro", "one piece"] },
  ];

  const [showIntro, setShowIntro] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const [levelIndex, setLevelIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [word, setWord] = useState(levels[0].words[0]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const [showWinBox, setShowWinBox] = useState(false);

  const [time, setTime] = useState(10);
  const maxWrong = 6;

  function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;

    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      setTime(10);
    } else {
      setWrongLetters([...wrongLetters, letter]);
    }
  }

  const isWinner = word.split("").every(
    (l) => l === " " || guessedLetters.includes(l)
  );

  const isLoser = wrongLetters.length >= maxWrong;

  useEffect(() => {
    if (showIntro || showMap) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          setWrongLetters((old) => [...old, "time"]);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showIntro, showMap]);

  useEffect(() => {
    if (isWinner && !isLoser) {
      setShowWinBox(true);
    }
  }, [isWinner]);

  function nextStep() {
    const currentLevel = levels[levelIndex];

    if (wordIndex < currentLevel.words.length - 1) {
      const nextWordIndex = wordIndex + 1;
      setWordIndex(nextWordIndex);
      setWord(currentLevel.words[nextWordIndex]);
    } else if (levelIndex < levels.length - 1) {
      const nextLevel = levelIndex + 1;
      setLevelIndex(nextLevel);
      setWordIndex(0);
      setWord(levels[nextLevel].words[0]);
    }

    setGuessedLetters([]);
    setWrongLetters([]);
    setTime(10);
    setShowWinBox(false);
  }

  function restartGame() {
    setLevelIndex(0);
    setWordIndex(0);
    setWord(levels[0].words[0]);

    setGuessedLetters([]);
    setWrongLetters([]);
    setTime(10);

    setShowWinBox(false);
    setShowIntro(true);
    setShowMap(false);
  }

  if (showIntro) {
    return (
      <Intro
        onStart={() => {
          setShowIntro(false);
          setShowMap(true);
        }}
      />
    );
  }

  if (showMap) {
    return (
      <MapLvl
        levels={levels}
        onSelectLevel={(index) => {
          setLevelIndex(index);
          setWordIndex(0);
          setWord(levels[index].words[0]);
          setShowMap(false);
        }}
      />
    );
  }

  return (
    <div className="container">

      <div className={`timer ${time <= 3 ? "danger" : time <= 5 ? "warning" : ""}`}>
        {time}s
      </div>

      <Hangman wrongCount={wrongLetters.length} />

      <h3 className="level-title">{levels[levelIndex].name}</h3>

      <div className="word">
        {word.split("").map((letter, i) => (
          <span key={i} className="letter">
            {letter === " "
              ? " "
              : guessedLetters.includes(letter) || isLoser
              ? letter
              : "_"}
          </span>
        ))}
      </div>

      <Keyboard
        onGuess={handleGuess}
        disabledLetters={[...guessedLetters, ...wrongLetters]}
      />

      {/* WIN */}
      {showWinBox && (
        <div className="overlay win">
          <div className="result-box">
            <h1 className="result-title win-text">VICTORY</h1>
            <button onClick={nextStep}>CONTINUE</button>
          </div>
        </div>
      )}

      {/* LOSE */}
      {isLoser && (
        <div className="overlay lose">
          <div className="result-box">
            <h1 className="result-title lose-text">DEFEAT</h1>
            <p className="final-word">{word}</p>
            <button onClick={restartGame}>RETRY</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;