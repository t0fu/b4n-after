import React from 'react';
import '../styles/keyboard.css';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => (
  <div className="keyboard">
    {KEYS.map((row, i) => (
      <div key={i} className="keyboard-row">
        {row.map((key) => (
          <button
            key={key}
            className="key"
              onClick={() => onKeyPress(key) }
            >
            {key}
          </button>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;