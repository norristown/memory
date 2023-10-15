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
  return (
    <div className="app">
      <Header />
      <CardList apiItems={apiItems} />
    </div>
  );
}

function CardList({ apiItems }) {
  return (
    <ul>
      {apiItems.map((item) => (
        <Card item={item} key={item.name} />
      ))}
    </ul>
  );
}

function Card({ item }) {
  return (
    <li className="card">
      <img src={item.image} alt={`${item.name} poster`} />
      <h3>{item.name}</h3>
      <div>
        <p>
          <span>Text</span>
        </p>
      </div>
    </li>
  );
}

function Header() {
  return <h1>Memory Card</h1>;
}
