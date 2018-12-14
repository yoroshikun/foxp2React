import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PokeDex from './Components/PokeDex';
import PokeSearch from './Components/PokeSearch';
import PokeSelector from './Components/PokeSelector';

const App = () => {
  // State Hooks
  const [currentPokemon, setCurrentPokemon] = useState();
  const [nextPokemon, setNextPokemon] = useState();
  const [prevPokemon, setPrevPokemon] = useState();
  const [cachePokemon, setCachePokemon] = useState({});
  const [accentColor, setAccentColor] = useState('white');

  const urlHelper = () => {
    const offset = window.location.href.search('pokemonID') + 10;
    return parseInt(window.location.href.substr(offset, offset + 1), 10);
  };

  const fetchPokemon = id =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw Error(
            `Looks like there was a problem. Status Code: ${response.status}`,
          );
        }

        return response.json();
      })
      .then(({ name, weight, height, stats, types, sprites }) => ({
        // Deal with the data
        id,
        name,
        weight: (weight / 10).toFixed(1),
        height: (height / 10).toFixed(1),
        stats: stats
          .map(({ base_stat: baseStat, stat: { name: statName } }) => ({
            baseStat,
            name: statName,
          }))
          .reverse(),
        types: types
          .map(({ slot, type: { name: type } }) => ({
            slot,
            type,
          }))
          .sort((a, b) => a.slot - b.slot),
        sprites: {
          frontDefault: sprites.front_default,
          backDefault: sprites.back_default,
          frontShiny: sprites.front_shiny,
          backShiny: sprites.back_shiny,
        },
      }))
      .catch(err => {
        console.error(err.message || err);
      });

  const updatePokemon = id => {
    const numID = parseInt(id, 10);
    // Validate
    if (numID <= 0) {
      // Raise issue lower
      console.error('Value should be greater than 0');
    } else if (numID >= 803) {
      console.error('Value should be below 802');
    } else {
      // Expand pokemon Id's and name
      const pokemonIds = Object.entries({
        prevPokemon: numID - 1,
        currentPokemon: numID,
        nextPokemon: numID + 1,
      });
      // Loop fetch
      pokemonIds.forEach(([place, pokemonID]) => {
        if (pokemonID >= 0 || pokemonID <= 802) {
          if (pokemonID in cachePokemon) {
            // Get from cache
            switch (place) {
              case 'prevPokemon':
                setPrevPokemon(cachePokemon[pokemonID]);
                break;
              case 'currentPokemon':
                setCurrentPokemon(cachePokemon[pokemonID]);
                break;
              case 'nextPokemon':
                setNextPokemon(cachePokemon[pokemonID]);
                break;
              default:
                console.log('Dont be here');
                break;
            }
          } else {
            fetchPokemon(pokemonID).then(response => {
              switch (place) {
                case 'prevPokemon':
                  setPrevPokemon(response);
                  setCachePokemon({
                    ...cachePokemon,
                    ...{ [pokemonID]: response },
                  });
                  break;
                case 'currentPokemon':
                  setCurrentPokemon(response);
                  setCachePokemon({
                    ...cachePokemon,
                    ...{ [pokemonID]: response },
                  });
                  break;
                case 'nextPokemon':
                  setNextPokemon(response);
                  setCachePokemon({
                    ...cachePokemon,
                    ...{ [pokemonID]: response },
                  });
                  break;
                default:
                  console.log('Dont be here');
                  break;
              }
            });
          }
        } else {
          switch ([place]) {
            case 'prevPokemon':
              setPrevPokemon({});
              break;
            case 'currentPokemon':
              setCurrentPokemon({});
              break;
            case 'nextPokemon':
              setNextPokemon({});
              break;
            default:
              console.log('Dont be here');
              break;
          }
        }
      });
    }
  };

  const typeToColor = type => {
    let color = 'green';
    switch (type) {
      case 'fire':
        color = '#F08030';
        break;
      case 'normal':
        color = '#A8A878';
        break;
      case 'fighting':
        color = '#C03028';
        break;
      case 'water':
        color = '#6890F0';
        break;
      case 'flying':
        color = '#A890F0';
        break;
      case 'grass':
        color = '#78C850';
        break;
      case 'poison':
        color = '#A040A0';
        break;
      case 'electric':
        color = '#F8D030';
        break;
      case 'ground':
        color = '#E0C068';
        break;
      case 'psychic':
        color = '#F85888';
        break;
      case 'rock':
        color = '#B8A038';
        break;
      case 'ice':
        color = '#98D8D8';
        break;
      case 'bug':
        color = '#A8B820';
        break;
      case 'dragon':
        color = '#7038F8';
        break;
      case 'ghost':
        color = '#705898';
        break;
      case 'dark':
        color = '#705848';
        break;
      case 'steel':
        color = '#B8B8D0';
        break;
      case 'fairy':
        color = '#EE99AC';
        break;
      default:
        color = '#F08030';
    }
    return color;
  };

  useEffect(() => {
    const pokemonID = urlHelper();
    if (
      window.location.href.includes('pokemonID') &&
      pokemonID >= 0 &&
      pokemonID <= 802
    ) {
      updatePokemon(pokemonID);
    } else {
      // If not default
      updatePokemon(4);
    }
  }, []);

  useEffect(
    () => {
      if (currentPokemon) {
        const { types, id } = currentPokemon;
        if (id) {
          setAccentColor(typeToColor(types[0].type));
          window.history.pushState({ ID: id }, 'Pokedex', `/?pokemonID=${id}`);
        }
      }
    },
    [currentPokemon],
  );

  return (
    <Container fluid style={{ overflow: 'hidden' }}>
      <Row>
        <Col sm={2} style={{ background: '#010D27', height: '100vh' }}>
          <PokeSearch updatePokemon={updatePokemon} />
        </Col>
        <Col sm={10} style={{ padding: 0 }}>
          {currentPokemon && (
            <PokeDex
              currentPokemon={currentPokemon}
              accentColor={accentColor}
              typeToColor={typeToColor}
            />
          )}
          {nextPokemon && prevPokemon && (
            <PokeSelector
              updatePokemon={updatePokemon}
              prevPokemon={prevPokemon}
              nextPokemon={nextPokemon}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
