import { useState, useEffect } from "react";

export default function App() {
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const [apiItems, setApiItems] = useState([]);

  useEffect(function () {
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
    console.log(e.target.closest(".card"));
  }

  return (
    <div className="app">
      <Header />
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
        <h3>{item.name}</h3>
      </li>
    </div>
  );
}

function Header() {
  return <h1>Memory Card</h1>;
}
