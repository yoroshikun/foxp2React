import { useEffect, useState } from 'react';
import createPokemon from '../api/Mutations/createPokemon';
import pokeAPIFetch from '../api/pokeAPIFetch';
import { useApolloClient } from 'react-apollo-hooks';
import { POKEMON_EXISTS_BY_ID, POKEMON_BY_ID } from '../api/Querys';

const usePokemon = (pokemonID: number) => {
  // Apollo client
  const client = useApolloClient();
  // Pokemonstate
  const [currentPokemon, setCurrentPokemon] = useState({});
  // Helper Function for pokemon exists query
  const pokemonExists = async () => {
    const query: any = await client.query({
      query: POKEMON_EXISTS_BY_ID,
      variables: { id: pokemonID },
    });
    return query.data.pokemonExistsById === null ? false : true;
  };

  // Hook into pokemon stuff.
  // Handles getting pokemon information (get new if not present)
  // Only runs if the pokemonID has changed
  useEffect(
    () => {
      // Check if the pokemon exists from cache
      pokemonExists().then(exists => {
        if (!exists) {
          // if pokemon doesnt exist for some reason
          // Get Pokemon from the api
          pokeAPIFetch(pokemonID).then(pokemon => {
            // Push that pokemon to the server to keep for good
            createPokemon(pokemon, client.mutate);
          });
        } else {
          // return the pokemon from postgres
          client
            .query({ query: POKEMON_BY_ID, variables: { id: pokemonID } })
            .then((result: any) => {
              // Put into state and return it
              setCurrentPokemon(result.data.pokemonById);
              console.log(result);
            })
            .catch(err => {
              console.log('how did this errors', err);
            });
        }
      });
    },
    [pokemonID],
  );
  // returns current pokemon
  return currentPokemon;
};

export default usePokemon;
