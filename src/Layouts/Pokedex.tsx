import React, { useState } from 'react';
import { Container, Col, Row } from 'react-grid-system';
import { PokeViewer, PokeSearch } from '../Components';
import usePokemon from '../Hooks/usePokemon';

const Pokedex = () => {
  const [currentPokemonID, setCurrentPokemonID] = useState(4);
  const currentPokemon = usePokemon(currentPokemonID);

  // TODO intergrate this logic with the hook
  const urlHelper = () => {
    const offset = window.location.href.search('pokemonID') + 10;
    return parseInt(window.location.href.substr(offset, offset + 1), 10);
  };
  //Pokedex Layout
  return (
    <Container fluid style={{ overflow: 'hidden' }}>
      <Row>
        <Col sm={2} style={{ background: '#010D27', height: '100vh' }}>
          <PokeSearch setCurrentPokemonID={setCurrentPokemonID} />
        </Col>
        <Col sm={10} style={{ padding: 0 }}>
          {currentPokemon ? (
            <PokeViewer curr={currentPokemon} />
          ) : (
            <div>Loading...</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Pokedex;
