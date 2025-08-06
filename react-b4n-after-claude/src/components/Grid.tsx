import React from 'react';
import LetterBox from './LetterBox';
import '../styles/grid.css';

interface GridProps {
  letters: string[][];
}

const Grid: React.FC<GridProps> = ({ letters }) => (
  <div className="grid">
    {letters.map((row, i) => (
      <div key={i} className="grid-row">
        {row.map((letter, j) => (
          <LetterBox key={`${i}-${j}`} letter={letter} />
        ))}
      </div>
    ))}
  </div>
);

export default Grid;