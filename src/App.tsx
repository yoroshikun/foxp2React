import React, { useState, useEffect } from 'react';
import TestPokemon from './Components/TestPokemon';
import { Pokedex, Menu } from './Layouts';

const App = () => {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const firstLevelPath = window.location.pathname.split('/')[1];
    switch (firstLevelPath) {
      case '':
        setScreen(0);
        break;
      case 'pokedex':
        setScreen(1);
        break;
      case 'test':
        setScreen(2);
        break;
      default:
        setScreen(0);
        break;
    }
  }, [window.location.pathname]);
  switch (screen) {
    case 0:
      return <Menu />;
    case 1:
      return <Pokedex />;
    case 2:
      return <TestPokemon />;
    default:
      return <Menu />;
  }
};

export default App;
