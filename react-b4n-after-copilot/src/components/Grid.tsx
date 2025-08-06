import React from "react";
import LetterBox from "./LetterBox";

const ROWS = 6;
const COLS = 10;

type GridProps = {
  letters: string[][]; // 2D array: [row][col]
};

const Grid: React.FC<GridProps> = ({ letters }) => (
  <div className="grid">
    {Array.from({ length: ROWS }).map((_, rowIdx) => (
      <div className="grid-row" key={rowIdx}>
        {Array.from({ length: COLS }).map((_, colIdx) => (
          <LetterBox
            key={colIdx}
            letter={letters?.[rowIdx]?.[colIdx] || ""}
            row={rowIdx}
            col={colIdx}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Grid;