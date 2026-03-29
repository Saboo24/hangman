import React, { useState, useEffect } from "react";
import "./Intro.css";

function Intro({ onStart }) {
  const [showAbout, setShowAbout] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  function handleStart() {
    setLeaving(true);
    setTimeout(() => {
      onStart();
    }, 600);
  }

  return (
    <div className={`intro ${loaded ? "show" : ""} ${leaving ? "fade-out" : ""}`}>
      
      <div className="bg"></div>
      <div className="noise"></div>

      <div className="center-box">
        <h1 className="logo glitch" data-text="HANGMAN">
          HANGMAN
        </h1>

        <div className="buttons">
          <button className="btn main" onClick={handleStart}>
            START
          </button>

          <button
            className="btn ghost"
            onClick={() => setShowAbout(true)}
          >
            ABOUT
          </button>
        </div>
      </div>

      <div className="footer">SABO</div>

      {showAbout && (
        <div className="about-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-box" onClick={(e) => e.stopPropagation()}>
            <h2>About</h2>

            <p>
              Guess the hidden word before time runs out.
              Every mistake brings you closer to defeat.
            </p>

            <p className="signature">Created by SABO</p>

            <button onClick={() => setShowAbout(false)}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Intro;