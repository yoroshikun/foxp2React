import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { POKEMON_BY_TRAINER_ID } from '../api/Querys';

const TrainerSelector = (props: any) => {
  const filter = {
    filter: {
      trainerId: {
        in: props.trainerID ? props.trainerID : 1,
      },
    },
  };
  const { data, error } = useQuery(POKEMON_BY_TRAINER_ID, {
    variables: filter,
  });

  if (error) {
    return <div>{error}</div>;
  }

  console.log(data);

  /*const trainerList = data.allTrainerPokemon.edges.map((pokemon: any) => (
    <li key={pokemon.node.id}>{pokemon.node.name}</li>
  ));*/

  /* const testList = data.allTrainerPokemons.edges.map((test: any) => (
    <li key={test.node.pokemonId}>
      PokemonID: {test.node.pokemonId}, TrainerID: {test.node.trainerId}{' '}
    </li>
  )); */

  const pokemonList = data.allTrainerPokemons.edges.map((pokemon: any) => (
    <li key={pokemon.node.pokemonByPokemonId.id}>
      {pokemon.node.pokemonByPokemonId.name}
    </li>
  ));

  return <ul>{pokemonList}</ul>;
};

export default TrainerSelector;
