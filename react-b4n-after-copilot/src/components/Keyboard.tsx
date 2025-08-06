import React from "react";
import "./Keyboard.css";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => (
  <div className="keyboard">
    {KEYS.map((row, rowIdx) => (
      <div className="keyboard-row" key={rowIdx}>
        {row.map((key) => (
          <button
            className="keyboard-key"
            key={key}
            onClick={() => onKeyPress(key)}
            type="button"
          >
            {key}
          </button>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;