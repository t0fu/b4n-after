import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import Rand, { PRNG } from 'rand-seed';
import LandingPage from './components/LandingPage';
import './App.css';


interface Puzzle {
  first: string;
  middle: string;
  last: string;
}

var initialTime = 30;

const App: React.FC = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [stars, setStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showLanding, setShowLanding] = useState(true);  


  useEffect(() => {
    const wordlines = 
      "Abraham Lincoln Nebraska	3	22	7\n" +
      "Acid Test Tube	3	12	4\n" +
      "Act Natural Beauty	3	16	3\n" +
      "Active Duty Calls	3	15	6\n" +
      "Active Military Museum	3	20	6\n" +
      "Agatha Christie Brinkley	3	22	6\n" +
      "Ageless Beauty Mark	3	17	7\n" +
      "Aiming High Cheekbones	3	20	6\n" +
      "Air Space Station	3	15	3\n" +
      "Airport Runway Model	3	18	7\n" +
      "Al Green Bay	3	10	2\n" +
      "Alter Ego Trip	3	12	5\n" +
      "Amazon Jungle Gym	3	15	6\n" +
      "American Buffalo Wings	3	20	8\n" +
      "American Pie Plate	3	16	8\n" +
      "Ancient Times Square	3	18	7\n" +
      "April Shower Cap	3	14	5\n" +
      "Artichoke Heart Surgeon	3	21	9\n" +
      "Assumed Identity Crisis	3	21	7\n" +
      "Atomic Mass Audience	3	18	6\n" +
      "Audio Clip Art	3	12	5\n" +
      "Authorized Signature Song	3	23	10\n" +
      "Baby Blue River	3	13	4\n" +
      "Baking Powder Puff	3	16	6\n" +
      "Baking Soda Pop	3	13	6\n" +
      "Bald Eagle Scout	3	14	4\n" +
      "Banana Split Decision	3	19	6\n" +
      "Banana Split Second	3	17	6\n" +
      "Bank Holiday Party	3	16	4\n" +
      "Baseball Diamond Ring	3	19	8\n" +
      "Basketball Hoop Skirt	3	19	10\n" +
      "Basketball Player Piano	3	21	10\n" +
      "Batting Cage Match	3	16	7\n" +
      "Beautiful Maiden Voyage	3	21	9\n" +
      "Beauty Shop Online	3	16	6\n" +
      "Beef Stock Market	3	15	4\n" +
      "Beer Tap Dancing	3	14	4\n" +
      "Bengal Tiger Woods	3	16	6\n" +
      "Beyond Belief System	3	18	6\n" +
      "Big Ben Affleck	3	13	3\n" +
      "Big Ben Stiller	3	13	3\n" +
      "Bill Thomas Cheetah	3	17	4\n" +
      "Billy Crystal Ball	3	16	5\n" +
      "Billy Crystal Vase	3	16	5\n" +
      "Bite Mark Ruffalo	3	15	4\n" +
      "Black Cape Cod	3	12	5\n" +
      "Blank Check Mark	3	14	5\n" +
      "Blessed Event Planner	3	19	7\n" +
      "Blood Pressure Points	3	19	5\n" +
      "Blue Jay Leno	3	11	4\n" +
      "Board Game Changer	3	16	5\n" +
      "Bone Dry Dock	3	11	4\n" +
      "Bottled Water Polo	3	16	7\n" +
      "Bow Tie Score	3	11	3\n" +
      "Bowling Alley Cat	3	15	7\n" +
      "Boxing Match Point	3	16	6\n" +
      "Boxing Ring Toss	3	14	6\n" +
      "Break Even Steven	3	15	5\n" +
      "Brick Red Square	3	14	5\n" +
      "Brick Wall Art	3	12	5\n" +
      "Broadway Musical Chairs	3	21	8\n" +
      "Brokerage Firm Grip	3	17	9\n" +
      "Bruce Wayne Brady	3	15	5\n" +
      "Bubble Bath Bombs	3	15	6\n" +
      "Bulletin Board Game	3	17	8\n" +
      "Burn Rubber Stamp	3	15	4\n" +
      "Burrito Supreme Court	3	19	7\n" +
      "Burt Reynolds Wrap	3	16	4\n" +
      "Butcher Block Party	3	17	7\n" +
      "Cabin Pressure Cooker	3	19	5\n" +
      "Cabin Pressure Gauge	3	18	5\n" +
      "Cabin Pressure Point	3	18	5\n" +
      "Cadbury Eggs Benedict	3	19	7\n" +
      "Camera Flash Cards	3	16	6\n" +
      "Camera Flash Flood	3	16	6\n" +
      "Candy Cane Sugar	3	14	5\n" +
      "Caramel Apple Juice	3	17	7\n" +
      "Cardiac Arrest Warrant	3	20	7\n" +
      "Cartoon Character Trait	3	21	7\n" +
      "Casual Dress Shop	3	15	6\n" +
      "Cattle Drive Safely	3	17	6\n" +
      "Ceiling Fan Club	3	14	7\n" +
      "Center Stage Door	3	15	6\n" +
      "Champagne Glass Menagerie	3	23	9\n" +
      "Channel Surfing Lesson	3	20	7\n" +
      "Charleston Chew Toy	3	17	10\n" +
      "Cherry Red Square	3	15	6\n" +
      "Chicken Little Dipper	3	19	7\n" +
      "Chicken Little Richard	3	20	7\n" +
      "Chicken Stock Exchange	3	20	7\n" +
      "Chicken Stock Futures	3	19	7\n" +
      "Chris Brown Sugar	3	15	5\n" +
      "Chris Rock Climbers	3	17	5\n" +
      "Christmas Carol Burnett	3	21	9\n" +
      "Cinnamon Roll Call	3	16	8\n" +
      "Circular Motion Picture	3	21	8\n" +
      "Circus Clown Fish	3	15	6\n" +
      "Civic Duty Calls	3	14	5\n" +
      "Class Act Accordingly	3	19	5\n" +
      "Class Act Normal	3	14	5\n" +
      "Class Clown Nose	3	14	5\n" +
      "Clint Black Stallion	3	18	5\n" +
      "Closet Space Invaders	3	19	6\n" +
      "Closet Space Travel	3	17	6\n" +
      "Coaxial Cable Stitch	3	18	7\n" +
      "Coconut Water Fountain	3	20	7\n" +
      "Coffee Bean Sprouts	3	17	6\n" +
      "Coffee Press Release	3	18	6\n" +
      "Coffee Table Tennis	3	17	6\n" +
      "Coleslaw Dressing Room	3	20	8\n" +
      "Color Blind Date	3	14	5\n" +
      "Comedy Film Industry	3	18	6\n" +
      "Comedy Team Player	3	16	6\n" +
      "Computer Mouse Trap	3	17	8\n" +
      "Conference Call Forward	3	21	10\n" +
      "Conveyor Belt Buckle	3	18	8\n" +
      "Corner Pocket Protector	3	21	6\n" +
      "Cosmic Dust Bunnies	3	17	6\n" +
      "Couch Potato Chips	3	16	5\n" +
      "Couch Potato Pancake	3	18	5\n" +
      "Couch Potato Peeler	3	17	5\n" +
      "Couch Potato Salad	3	16	5\n" +
      "Cowboy Boot Camp	3	14	6\n" +
      "Crawl Space Station	3	17	5\n" +
      "Creamed Corn Tortillas	3	20	7\n" +
      "Critical Mass Audience	3	20	8\n" +
      "Cruise Line Judge	3	15	6\n" +
      "Cry Foul Ball	3	11	3\n" +
      "Curling Iron Man	3	14	7\n" +
      "Customer Service Charge	3	21	8\n" +
      "Daffy Duck Pond	3	13	5\n" +
      "Dairy Queen Victoria	3	18	5\n" +
      "Dancing Queen Latifah	3	19	7\n" +
      "David Letterman Jacket	3	20	5\n" +
      "David Price Tag	3	13	5\n" +
      "Dead Wrong Way	3	12	4\n" +
      "Death Valley Girl	3	15	5\n" +
      "Debbie Reynolds Wrap	3	18	6\n" +
      "Deep Space Heater	3	15	4\n" +
      "Defensive Team Effort	3	19	9\n" +
      "Demanding Job Offer	3	17	9\n" +
      "Den Mother Nature	3	15	3\n" +
      "Deveined Shrimp Cocktail	3	22	8\n" +
      "Dialog Box Seats	3	14	6\n" +
      "Diana Ross Geller	3	15	5\n" +
      "Dining Table Tennis	3	17	6\n" +
      "Dinner Table Saw	3	14	6\n" +
      "Dirt Poor Excuse	3	14	4\n" +
      "Dirt Road Map	3	11	4\n" +
      "Dirty Harry Potter	3	16	5\n" +
      "Disc Jockey Shorts	3	16	4\n" +
      "Diving Bell Curve	3	15	6\n" +
      "Diving Bell Pepper	3	16	6\n" +
      "Diving Bell Tower	3	15	6\n" +
      "Division Sign Language	3	20	8\n" +
      "Doctor Strange Story	3	18	6\n" +
      "Dog Pound Cake	3	12	3\n" +
      "Dollar Bill Gates	3	15	6\n" +
      "Donald Duck Pond	3	14	6\n" +
      "Doris Day School	3	14	5\n" +
      "Downward Spiral Pasta	3	19	8\n" +
      "Dream Job Interview	3	17	5\n" +
      "Drinking Water Polo	3	17	8\n" +
      "Driving Test Kitchen	3	18	7\n" +
      "Dry Sherry Darling	3	16	3\n" +
      "Dude Ranch Dressing	3	17	4\n" +
      "Dutch Treat Yourself	3	18	5\n";
    //TODO: seeded random generation

    const rand  = new Rand(new Date().toDateString());

    const lines = wordlines.split('\n').filter(line => line.trim());
    const randIdx = Array.from({length: 5}, () => Math.min(rand.next() * lines.length, lines.length - 1)|0);

    const todaysPuzzles = lines
      .filter((_, idx) => randIdx.includes(idx))
      .map(line => {
        const [first, middle, last] = line.substring(0, line.indexOf('\t')).split(' ', 3);
        return { first, middle, last };
      })
      .sort(() => rand.next());

    console.log(todaysPuzzles);
    setPuzzles(todaysPuzzles);
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
    } else if (key === 'SKIP') {
      skipPuzzle();    
    } else if (key === '⌫') {
      setInput(prev => prev.slice(0, -1));
    } else {
      setInput(prev => prev + key);
      const currentPuzzle = puzzles[currentPuzzleIndex];
      if (input.length + 1 === currentPuzzle.middle.length) {
        console.log(input);
        checkAnswer(key);
      }
    }
  };

  const closeDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('game-over') || target.classList.contains('stars')) {
      document.getElementsByClassName('game-over')[0].setAttribute('style', 'display: none;');
    }
  }

  const skipPuzzle = () => {
    const currentPuzzle = puzzles[currentPuzzleIndex];
    puzzles.push(currentPuzzle);
    puzzles.splice(currentPuzzleIndex,1);
    setInput('')
  }

  const checkAnswer = (key: string = '') => {
    const currentPuzzle = puzzles[currentPuzzleIndex];
    if ( (input.toLowerCase() === currentPuzzle.middle.toLowerCase() && key === '') ||
      (input.toLowerCase() + key.toLocaleLowerCase() === currentPuzzle.middle.toLowerCase()) )  {
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
  } else {

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
            <p>Time: {initialTime - timeLeft}s</p>
            <button className="restart-hint" onClick={() => {
              const shareData = {
                title: 'I just scored ' + stars + ' stars in ' + (initialTime - timeLeft) +'s!',
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
  }
};

export default App;