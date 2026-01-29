import Rand from 'rand-seed';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import LandingPage from './components/LandingPage';
import Toast from './components/Toast';
import { clues_3_words } from './constants/Clues';
import './App.css';

interface Puzzle {
  first: string;
  middle: string;
  last: string;
}

let initialTime = 30;

const App: React.FC = () => {
  const today = new Date().toDateString();
  const [puzzles, setPuzzles] = useState<Puzzle[]>(() => {
    const rand = new Rand(today);
    const lines = clues_3_words.split('\n').filter(line => line.trim());

    // Get 5 unique random indices
    const randSet = new Set();
    while (randSet.size < Math.min(5, lines.length)) {
      randSet.add(Math.min(Math.floor(rand.next() * lines.length), lines.length - 1));
    }

    const randIdx = Array.from(randSet);
    const todaysPuzzles = lines
      .filter((_, idx) => randIdx.includes(idx))
      .map((line) => {
        const [first, middle, last] = line.substring(0, line.indexOf('\t')).split(' ', 3);
        return { first, middle, last };
      })
      .sort(() => rand.next());
    // console.log(todaysPuzzles);
    return todaysPuzzles;
  });
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [input, setInput] = useState('');
  const [stars, setStars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [manualGameOver, setManualGameOver] = useState(false);
  const gameOver = manualGameOver || timeLeft === 0;
  const [isShaking, setIsShaking] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, gameOver]);

  const skipPuzzle = () => {
    if (gameOver) {
      setCurrentPuzzleIndex(i => ((i + 1) % 5));
      return;
    }

    setPuzzles((prev) => {
      if (prev.length === 0 || currentPuzzleIndex < 0 || currentPuzzleIndex >= prev.length) {
        return prev;
      }
      const next = prev.slice();
      const [removed] = next.splice(currentPuzzleIndex, 1);
      next.push(removed);
      return next;
    });

    setInput('');
  };

  const checkAnswer = (key: string = '') => {
    const currentPuzzle = puzzles[currentPuzzleIndex];
    if ((input.toLowerCase() === currentPuzzle.middle.toLowerCase() && key === '')
      || (input.toLowerCase() + key.toLocaleLowerCase() === currentPuzzle.middle.toLowerCase())) {
      setStars(s => s + 1);
      if (currentPuzzleIndex === 4) {
        setManualGameOver(true);
      }
      else {
        setCurrentPuzzleIndex(i => i + 1);
      }
      setInput('');
    }
    else {
      setInput('');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeyPress = (key: string) => {
    if (gameOver) {
      if (key === 'SKIP') {
        skipPuzzle();
      }
      return;
    }

    if (key === 'ENTER' || key === '↵') {
      checkAnswer();
    }
    else if (key === 'SKIP') {
      skipPuzzle();
    }
    else if (key === '⌫') {
      setInput(prev => prev.slice(0, -1));
    }
    else {
      setInput(prev => prev + key);
      const currentPuzzle = puzzles[currentPuzzleIndex];
      if (input.length + 1 === currentPuzzle.middle.length) {
        checkAnswer(key);
      }
    }
  };

  const closeDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('game-over') || target.classList.contains('stars')) {
      document.getElementsByClassName('game-over')[0].setAttribute('style', 'display: none;');
    }
  };

  const getDisplayGrid = () => {
  // Create a new array for each row to avoid reference issues
    const grid = Array.from({ length: 5 }).fill(null).map(() => Array.from({ length: 10 }).fill('')) as string[][];

    if (puzzles.length > 0) {
      const current = puzzles[currentPuzzleIndex];
      const firstWord = current.first.toUpperCase();
      const secondWord = current.middle.toUpperCase();
      const lastWord = current.last.toUpperCase();
      const userInput = input.toUpperCase();
      // console.log(firstWord, lastWord, userInput, current.middle);
      // Calculate total display length including spaces
      // const totalLength = firstWord.length + 1 + userInput.length + 1 + lastWord.length;

      // Calculate starting position to center everything
      const firstPos = Math.max(0, Math.floor((10 - firstWord.length) / 2));

      // Fill in first word
      firstWord.split('').forEach((char, i) => {
        if (firstPos + i < 10) {
          grid[1][firstPos + i] = char;
        }
      });
      const currentPos = Math.max(0, Math.floor((10 - current.middle.length) / 2));

      secondWord.split('').forEach((_char, i) => {
        if (currentPos + i < 10) {
          grid[2][currentPos + i] = ' ';
        }
      });

      // Fill in user input (if any)
      if (!gameOver && userInput) {
        userInput.split('').forEach((char, i) => {
          if (currentPos + i < 10) {
            grid[2][currentPos + i] = char;
          }
        });
      }
      else if (gameOver) {
      // If game is over, fill in the correct answer
        current.middle.split('').forEach((char, i) => {
          if (currentPos + i < 10) {
            grid[2][currentPos + i] = char.toUpperCase();
          }
        });
      }

      const lastPos = Math.max(0, Math.floor((10 - lastWord.length) / 2));

      // Fill in last word
      lastWord.split('').forEach((char, i) => {
        if (lastPos + i < 10) {
          grid[3][lastPos + i] = char;
        }
      });
    }

    return grid;
  };

  const shareScore = async () => {
    const date = today;
    const title = `I just scored ${'⭐'.repeat(stars)} stars in ${initialTime - timeLeft}s!`;
    const prompt = 'Can you beat my score?';
    const url = window.location.href;
    const text = `${title}\n${prompt}\n${url}\n${date}`;
    const shareData = { date, title, text, url };

    if (typeof navigator.share === 'function') {
      try {
        await (navigator as any).share(shareData);
        return;
      }
      catch {
      // share failed or was cancelled — fall back to clipboard
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        showToastMessage('Copied to clipboard!');
        return;
      }
      catch {
      // clipboard API failed
      }
    }

    // Absolute worst case fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    }
    catch {
    // ignore
    }
    document.body.removeChild(textarea);

    // Let user know sharing is unavailable
    showToastMessage('Sharing unavailable on this browser.');
  };

  // Only show landing page if showLanding is true
  if (showLanding) {
    return (
      <LandingPage
        onSelect={(seconds) => {
          initialTime = seconds;
          setTimeLeft(initialTime);
          setShowLanding(false);
        }}
      />
    );
  }
  else {
    return (

      <div className={`app ${isShaking ? 'shake' : ''}`}>
        <div className="timer">
          {timeLeft}
          s
        </div>
        <Grid letters={getDisplayGrid()} />
        <Keyboard onKeyPress={handleKeyPress} />
        {gameOver && (
          <div
            className="game-over"

          >
            <h2>{ stars !== 5 ? 'Game Over!' : 'You won!' }</h2>
            <div className="stars" onClick={closeDiv}>{'⭐'.repeat(stars)}</div>
            <p>
              Time:
              {initialTime - timeLeft}
              s
            </p>
            <button className="restart-hint" onClick={shareScore}>Share</button>
          </div>
        )}
        <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>

    );
  }
};

export default App;
