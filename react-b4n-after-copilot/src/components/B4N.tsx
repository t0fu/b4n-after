import React, { useState } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";

const ROWS = 6;
const COLS = 10;

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(""));

const B4N: React.FC = () => {
  const [letters, setLetters] = useState<string[][]>(createEmptyGrid());

  // Example handler: fills the first empty cell with the pressed key
  const handleKeyPress = (key: string) => {
    setLetters((prev) => {
      const newGrid = prev.map((row) => [...row]);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (newGrid[r][c] === "") {
            newGrid[r][c] = key;
            return newGrid;
          }
        }
      }
      return newGrid;
    });
  };

  return (
    <div>
      <Grid letters={letters} />
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default