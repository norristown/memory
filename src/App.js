import { useState, useEffect } from "react";

export default function App() {
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const [apiItems, setApiItems] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timer, setTimer] = useState("");
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      const arr = [];
      for (let i = 1; i < 20; i++) {
        const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await url.json();
        const name = data.name;
        const image = data.sprites.front_default;
        const obj = { name, image };
        arr.push(obj);
      }
      setApiItems(shuffleArray(arr));
    }
    fetchAPI();
  }, []);

  function handleClick(e) {
    const selected = e.target.closest(".card").getAttribute("value");
    setGameStart(true);
    setTimer(3);
    if (clickedItems.includes(selected)) {
      resetGame();
    } else {
      handleScore(selected);
    }
  }

  function handleScore(selected) {
    setScore((x) => x + 1);
    clickedItems.push(selected);
    setApiItems(shuffleArray(apiItems));
  }

  function handleBestScore() {
    if (score > bestScore) {
      setBestScore(score);
    } else {
      setBestScore(bestScore);
    }
  }

  function resetGame() {
    setApiItems(shuffleArray(apiItems));
    setScore(0);
    setClickedItems([]);
    handleBestScore();
    setGameStart(false);
  }

  return (
    <div className="app">
      <Header score={score} bestScore={bestScore} />
      <Timer timer={timer} onSetTimer={setTimer} gameStart={gameStart} />
      <CardList
        apiItems={apiItems}
        onHandleClick={handleClick}
        onSetTimer={setTimer}
        timer={timer}
        gameStart={gameStart}
        onResetGame={resetGame}
      />
    </div>
  );
}

function Timer({ timer, gameStart, onSetTimer }) {
  return (
    <>
      {gameStart ? (
        <h2>{timer}</h2>
      ) : (
        // <SelectDifficulty onSetTimer={onSetTimer} timer={timer} />
        <h2>Click a card to start</h2>
      )}
    </>
  );
}

function CardList({
  apiItems,
  onHandleClick,
  onSetTimer,
  timer,
  gameStart,
  onResetGame,
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        onSetTimer((x) => x - 1);
      } else if (gameStart) {
        onResetGame();
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <ul>
      {apiItems.map((item) => (
        <Card item={item} key={item.name} onHandleClick={onHandleClick} />
      ))}
    </ul>
  );
}

function Card({ item, onHandleClick }) {
  return (
    <div className="card" value={item.name} onClick={onHandleClick}>
      <li>
        <img src={item.image} alt={`${item.name} card`} />
        <h3 className="name">{item.name}</h3>
      </li>
    </div>
  );
}

function Header({ score, bestScore }) {
  return (
    <div className="header">
      <div className="header-container">
        <h1>Memory Card</h1>
        <h4>Don't Pick The Same Card Twice!</h4>
      </div>

      <div className="scoreBoard">
        <h4 className="currentScore">Current Score: {score}</h4>
        <h4 className="bestScore">Top Score: {bestScore}</h4>
      </div>
    </div>
  );
}

// function SelectDifficulty({ onSetTimer, timer }) {
//   return (
//     <div>
//       <h2>Select your difficulty</h2>
//       <div className="btn-container">
//         <button onClick={() => onSetTimer(5)}>Easy</button>
//         <button onClick={() => onSetTimer(3)}>Normal</button>
//         <button onClick={() => onSetTimer(1)}>Hard</button>
//       </div>
//     </div>
//   );
// }
