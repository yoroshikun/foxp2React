import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PokeDex from './Components/PokeDex';
import PokeSearch from './Components/PokeSearch';
import PokeSelector from './Components/PokeSelector';

class App extends React.Component {
  state = {
    currentPokemon: {},
    nextPokemon: {},
    prevPokemon: {},
    cachePokemon: {},
    accentColor: 'white',
  };

  componentDidMount = () => {
    // Run initial download of pokemon needed to fill the data that we see
    // Check if has a state in the url
    const pokemonID = this.urlHelper();
    if (
      window.location.href.includes('pokemonID') &&
      pokemonID >= 1 &&
      pokemonID <= 802
    ) {
      this.updatePokemon(this.urlHelper());
    } else {
      // If not default
      this.updatePokemon(4);
    }
  };

  urlHelper = () => {
    const offset = window.location.href.search('pokemonID') + 10;
    return parseInt(window.location.href.substr(offset, offset + 1), 10);
  };

  fetchPokemon = id =>
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
        console.log(err.message || err);
      });

  updatePokemon = id => {
    const numID = parseInt(id, 10);
    // Validate
    if (numID <= 0) {
      // Raise issue lower
      console.error('Value should be greater than 0');
    } else if (numID >= 802) {
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
        if (pokemonID <= 0 || pokemonID >= 802) {
          this.setState({
            [place]: '',
          });
        } else {
          const { cachePokemon } = this.state;
          if (pokemonID in cachePokemon) {
            // Get from cache
            this.setState(
              {
                [place]: cachePokemon[pokemonID],
              },
              () => {
                if (
                  place === 'currentPokemon' &&
                  cachePokemon[pokemonID].types
                ) {
                  this.setState({
                    accentColor: this.typeToColor(
                      cachePokemon[pokemonID].types[0].type,
                    ),
                  });
                  window.history.pushState(
                    { ID: pokemonID },
                    'Pokedex',
                    `/?pokemonID=${pokemonID}`,
                  );
                }
              },
            );
          } else {
            this.fetchPokemon(pokemonID).then(response => {
              this.setState(
                prevState => ({
                  [place]: response,
                  cachePokemon: {
                    [pokemonID]: response,
                    ...prevState.cachePokemon,
                  },
                }),
                () => {
                  if (place === 'currentPokemon' && response.types) {
                    this.setState({
                      accentColor: this.typeToColor(response.types[0].type),
                    });
                    window.history.pushState(
                      { ID: pokemonID },
                      'Pokedex',
                      `/?pokemonID=${pokemonID}`,
                    );
                  }
                },
              );
            });
          }
        }
      });
    }
  };

  typeToColor = type => {
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

  render() {
    const {
      currentPokemon,
      prevPokemon,
      nextPokemon,
      accentColor,
    } = this.state;
    return (
      <Container fluid style={{ overflow: 'hidden' }}>
        <Row>
          <Col sm={2} style={{ background: '#010D27', height: '100vh' }}>
            <PokeSearch updatePokemon={this.updatePokemon} />
          </Col>
          <Col sm={10} style={{ padding: 0 }}>
            <PokeDex
              currentPokemon={currentPokemon}
              accentColor={accentColor}
              typeToColor={this.typeToColor}
            />
            <PokeSelector
              updatePokemon={this.updatePokemon}
              prevPokemon={prevPokemon}
              nextPokemon={nextPokemon}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
