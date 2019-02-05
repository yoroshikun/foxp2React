import React, { useState, useEffect } from 'react';
import TestPokemon from './Components/TestPokemon';
import { Pokedex, Menu } from './Layouts';
import Trainer from './Layouts/Trainer';

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
      case 'trainers':
        setScreen(2);
        break;
      case 'test':
        setScreen(3);
        break;
      default:
        setScreen(0);
        break;
    }
  }, []);
  switch (screen) {
    case 0:
      return <Menu setScreen={setScreen} />;
    case 1:
      return <Pokedex setScreen={setScreen} />;
    case 2:
      return <Trainer setScreen={setScreen} />;
    case 3:
      return <TestPokemon />;
    default:
      return <Menu />;
  }
};

export default App;
