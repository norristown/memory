import { useState, useEffect } from "react";

export default function App() {
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const [apiItems, setApiItems] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

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

    if (clickedItems.includes(selected)) {
      resetGame();
      handleBestScore();
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
  }

  return (
    <div className="app">
      <Header score={score} bestScore={bestScore} />
      <CardList apiItems={apiItems} onHandleClick={handleClick} />
    </div>
  );
}

function CardList({ apiItems, onHandleClick }) {
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
        <h4 className="bestScore">Best Score: {bestScore}</h4>
      </div>
    </div>
  );
}
