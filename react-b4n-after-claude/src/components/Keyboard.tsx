import React, { useRef, useEffect } from 'react';
import '../styles/keyboard.css';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const KEYS = [
  [ 'SKIP' ],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['↵', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  // Create a map to store references to all keyboard buttons
  const keyRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  
  // Handle physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      let key = e.key.toUpperCase();
      
      // Map Enter and Backspace keys
      if (key === 'ENTER' || key === '↵') {
        key = 'ENTER';
      } else if (key === 'BACKSPACE' || key === 'DELETE') {
        key = '⌫';
      } 
      
      // Get the button element for this key
      const button = keyRefs.current.get(key);
      
      if (button) {
        // Add visual feedback
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
        
        // Trigger the onKeyPress
        onKeyPress(key);
      }
    };
    
    // Add and remove event listener
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);
  
  return (
    <div className="keyboard">
      {KEYS.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={(key === 'SKIP' ? "skip" : "key")}
              onClick={() => {onKeyPress(key) }}
              ref={(el) => {
                if (el) keyRefs.current.set(key, el);
              }}
            >
              {key}
            </button>
        ))}
      </div>
      ))}
    </div>
  );
};

export default Keyboard;