import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';

import './App.css';


interface Puzzle {
  first: string;
  middle: string;
  last: string;
}

const App: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [stars, setStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const wordlines = 
      "Active Duty Calls	3	15	6\n" +
      "Big Ben Stiller	3	13	3\n" +
      "Big Mac Truck	3	9	4\n" +
      "Candy Cane Sugar	3	14	5\n" +
      "Couch Potato Chips	3	16	5\n" +
      "Dinner Table Saw	3	14	6\n" +
      "Doughnut Hole Punch	3	16	6\n" +
      "Electric Blanket Fort	3	18	7\n" +
      "Fire Truck Driver	3	14	4\n" +
      "French Fry Cook	3	12	5\n" +
      "Green Bean Casserole	3	18	5\n";

    const lines = wordlines.split('\n').filter(line => line.trim());
    const randomPuzzles = lines
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(line => {
        const [first, middle, last] = line.substring(0, line.indexOf('\t')).split(' ', 3);
        return { first, middle, last };
      });
    setPuzzles(randomPuzzles);
  }, []);


  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === 'ENTER' || key === '↵') {
      checkAnswer();
    } else if (key === '⌫') {
      setInput(prev => prev.slice(0, -1));
    } else {
      setInput(prev => prev + key);
      // const currentPuzzle = puzzles[currentPuzzleIndex];
      // if (input.length === currentPuzzle.middle.length) {
      //   console.log(input);
      //   checkAnswer();
      // }
    }
  };

  const closeDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('game-over') || target.classList.contains('stars')) {
      document.getElementsByClassName('game-over')[0].setAttribute('style', 'display: none;');
    }
  }

  const checkAnswer = () => {
    const currentPuzzle = puzzles[currentPuzzleIndex];
    if (input.toLowerCase() === currentPuzzle.middle.toLowerCase()) {
      setStars(s => s + 1);
      if (currentPuzzleIndex === 4) {
        setGameOver(true);
      } else {
        setCurrentPuzzleIndex(i => i + 1);
      }
      setInput('');
    } else {
      setInput('')
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

const getDisplayGrid = () => {
  // Create a new array for each row to avoid reference issues
  const grid = Array(5).fill(null).map(() => Array(10).fill(''));
  
  if (puzzles.length > 0) {
    const current = puzzles[currentPuzzleIndex];
    const firstWord = current.first.toUpperCase();
    const secondWord = current.middle.toUpperCase();
    const lastWord = current.last.toUpperCase();
    const userInput = input.toUpperCase();
    //console.log(firstWord, lastWord, userInput, current.middle);
    // Calculate total display length including spaces
    // const totalLength = firstWord.length + 1 + userInput.length + 1 + lastWord.length;
    
    // Calculate starting position to center everything
    let firstPos = Math.max(0, Math.floor((10 - firstWord.length) / 2));        
     
    // Fill in first word
    firstWord.split('').forEach((char, i) => {
      if (firstPos + i < 10) {
        grid[1][firstPos + i] = char;
      }
    });
    let currentPos = Math.max(0, Math.floor((10 - current.middle.length) / 2));        
    
    secondWord.split('').forEach((char, i) => {
      if (currentPos + i < 10) {
        grid[2][currentPos + i] = ' ';
      }
    });

    // Fill in user input (if any)
    if(!gameOver && userInput) {
      userInput.split('').forEach((char, i) => {
        if (currentPos + i < 10) {
          grid[2][currentPos + i] = char;
        }
      });
    } else if (gameOver) {
      // If game is over, fill in the correct answer
      current.middle.split('').forEach((char, i) => {
        if (currentPos + i < 10) {
          grid[2][currentPos + i] = char.toUpperCase();
        }
      });
    }

    let lastPos = Math.max(0, Math.floor((10 - lastWord.length) / 2));        
    
    // Fill in last word
    lastWord.split('').forEach((char, i) => {
      if (lastPos + i < 10) {
        grid[3][lastPos + i] = char;
      }
    });
  }
  
  return grid;
};

  return (

    <div className={`app ${isShaking ? 'shake' : ''}`}>
      <div className="timer">{timeLeft}s</div>
      <Grid letters={getDisplayGrid()} />
      <Keyboard onKeyPress={handleKeyPress} />
      {gameOver && (
        <div 
          className="game-over" 
          onClick={() => {
            ;
          }}
        >
          <h2>{ stars !== 5 ? 'Game Over!' : 'You won!' }</h2>
          <div className="stars" onClick={closeDiv}>{'⭐'.repeat(stars)}</div>
          <p>Time: {30 - timeLeft}s</p>
          <button className="restart-hint" onClick={() => {
            const shareData = {
              title: 'I just scored ' + stars + ' stars!',
              text: 'Can you beat my score?',
              url: window.location.href
            };

            // Fallback for browsers that don't support the Web Share API
            const textArea = document.createElement('textarea');
            textArea.value = shareData.title + '\n' + shareData.text + '\n' + shareData.url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Shareable link copied to clipboard!');                        
          }}>Share</button>
        </div>
      )}
    </div>

  );
};

export default App;