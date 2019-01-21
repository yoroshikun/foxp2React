import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import typeToColor from './constants/typeToColor';
import PokeDex from './Components/PokeDex';
import PokeSearch from './Components/PokeSearch';
import PokeSelector from './Components/PokeSelector';
import usePokedex from './Hooks/usePokedex';

const App = () => {
  // State Hooks
  const [currentPokemonID, setCurrentPokemonID] = useState();
  const [accentColor, setAccentColor] = useState('white');
  const [prev, curr, next] = usePokedex(currentPokemonID);

  const urlHelper = () => {
    const offset = window.location.href.search('pokemonID') + 10;
    return parseInt(window.location.href.substr(offset, offset + 1), 10);
  };

  useEffect(() => {
    const pokemonID = urlHelper();
    if (
      window.location.href.includes('pokemonID') &&
      pokemonID >= 1 &&
      pokemonID <= 802
    ) {
      setCurrentPokemonID(pokemonID);
    } else {
      // If not default
      setCurrentPokemonID(4);
    }
  }, []);

  useEffect(
    () => {
      if (curr) {
        const { types, id } = curr;
        if (id) {
          setAccentColor(typeToColor(types[0].type));
          window.history.pushState({ ID: id }, 'Pokedex', `/?pokemonID=${id}`);
        }
      }
    },
    [curr],
  );

  return (
    <Container fluid style={{ overflow: 'hidden' }}>
      <Row>
        <Col sm={2} style={{ background: '#010D27', height: '100vh' }}>
          <PokeSearch setCurrentPokemonID={setCurrentPokemonID} />
        </Col>
        <Col sm={10} style={{ padding: 0 }}>
          {curr && <PokeDex curr={curr} accentColor={accentColor} />}
          {next && prev && (
            <PokeSelector
              setCurrentPokemonID={setCurrentPokemonID}
              prev={prev}
              next={next}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
