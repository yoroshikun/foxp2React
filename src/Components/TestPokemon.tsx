import React, { Suspense } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import createPokemon from '../api/Mutations/createPokemon';
import fetchPokemon from '../api/pokeAPIFetch';
import KnownPokemon from './KnownPokemon';

const GET_POKEMON = gql`
  {
    allPokemons {
      edges {
        node {
          id
          name
          weight
          height
          types
          sprites
          statByStatsId {
            hp
            attack
            defense
            specialAttack
            specialDefense
            speed
          }
        }
      }
    }
  }
`;

const PokemonList = () => {
  const { data, error } = useQuery(GET_POKEMON);
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return <ul>{JSON.stringify(data)}</ul>;
};

const AddPokemonButton = () => {
  const client = useApolloClient();
  return (
    <>
      <button
        onClick={() => {
          console.log(fetchPokemon(1));
        }}
      >
        Test Fetch
      </button>
      <button
        onClick={() => {
          fetchPokemon(1).then(pokemon => {
            createPokemon(pokemon, client.mutate);
          });
        }}
      >
        Add Bulbasaur
      </button>
    </>
  );
};

const PokemonCache = () => {
  const client = useApolloClient();
  return <div>{JSON.stringify(client.extract())}</div>;
};

const TestPokemon = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PokemonList />
    <PokemonCache />
    <AddPokemonButton />
    <KnownPokemon />
    <button onClick={() => ''}>Get Pokemon Again</button>
  </Suspense>
);

export default TestPokemon;
