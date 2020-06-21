import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';

function App() {

  const [count, setCount] = useState(0);
  const handleHeroClick = () => {}

  return (
    <div className="app">
      <h1>React-memo</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Hero name="HungTM" />
    </div>
  );
}

export default App;
