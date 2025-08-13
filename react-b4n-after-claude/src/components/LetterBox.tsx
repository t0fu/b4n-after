import React from 'react';
import '../styles/letter-box.css';

interface LetterBoxProps {
  letter: string;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter }) => (
  <div className={`letter-box ${letter === ' ' ? 'highlight' : ''}`}>
    {letter}
  </div>
);

export default LetterBox;