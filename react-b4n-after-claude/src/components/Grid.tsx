import * as React from 'react';
import LetterBox from './LetterBox';
import '../styles/grid.css';

interface GridProps {
  letters: string[][];
}

const Grid: React.FC<GridProps> = ({ letters }) => (
  <div className="grid">
    {letters.map((row, i) => {
      const rowKey = `${row.join('')}-${i}`;
      return (
        <div key={rowKey} className="grid-row">
          {row.map((letter, j) => {
            const letterKey = `${rowKey}-${letter}-${j}`;
            return <LetterBox key={letterKey} letter={letter} />;
          })}
        </div>
      );
    })}
  </div>
);

export default Grid;
