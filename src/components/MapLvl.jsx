import React from "react";
import "./MapLvl.css";

function MapLvl({ levels, onSelectLevel }) {
  return (
    <div className="map-container">
      <h1 className="map-title">SELECT LEVEL</h1>

      <div className="levels-grid">
        {levels.map((lvl, index) => (
          <button
            key={index}
            className="level-btn"
            onClick={() => onSelectLevel(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MapLvl;