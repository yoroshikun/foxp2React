import { useEffect, useState } from 'react';
import createPokemon from '../api/Mutations/createPokemon';
import pokeAPIFetch from '../api/pokeAPIFetch';
import { useApolloClient } from 'react-apollo-hooks';
import { POKEMON_EXISTS_BY_ID, POKEMON_BY_ID } from '../api/Querys';
import { PokemonObject } from '../types';

const initialPokemonObject: PokemonObject = {
  id: 0,
  name: 'Null',
  weight: 0,
  height: 0,
  types: ['ground'],
  sprites: [''],
  stats: {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  },
};

const usePokemon = (pokemonID: number): PokemonObject => {
  console.log(pokemonID);
  // Apollo client
  const client = useApolloClient();
  // Pokemonstate
  const [currentPokemon, setCurrentPokemon] = useState(initialPokemonObject);
  // Helper Function for pokemon exists query
  const pokemonExists = async () => {
    const query: any = await client.query({
      query: POKEMON_EXISTS_BY_ID,
      variables: { id: pokemonID },
    });
    console.log(query.data);
    return query.data.pokemonById === null ? false : true;
  };

  // Hook into pokemon stuff.
  // Handles getting pokemon information (get new if not present)
  // Only runs if the pokemonID has changed
  useEffect(() => {
    // Check if the pokemon exists from cache
    pokemonExists().then(exists => {
      if (!exists) {
        // if pokemon doesnt exist for some reason
        // Get Pokemon from the api
        pokeAPIFetch(pokemonID).then(pokemon => {
          // Push that pokemon to the server to keep for good
          // Question: Should i pre emptivly set the pokemon or set after the data syncs
          createPokemon(pokemon, client.mutate).then(() => {
            setCurrentPokemon(pokemon);
          });
        });
      } else {
        // return the pokemon from postgres
        client
          .query({ query: POKEMON_BY_ID, variables: { id: pokemonID } })
          .then((result: any) => {
            const pokemonById = result.data.pokemonById;
            // Remove that odd thing we dont want
            delete pokemonById.statByStatsId.__typename;
            // Put into state and return it
            const PokemonObject: PokemonObject = {
              id: pokemonById.id,
              name: pokemonById.name,
              weight: pokemonById.weight,
              height: pokemonById.height,
              types: pokemonById.types,
              sprites: pokemonById.sprites,
              stats: pokemonById.statByStatsId,
            };
            setCurrentPokemon(PokemonObject);
            console.log(result);
          })
          .catch(err => {
            console.log('how did this errors', err);
          });
      }
    });
  }, [pokemonID]);
  // returns current pokemon
  return currentPokemon;
};

export default usePokemon;
