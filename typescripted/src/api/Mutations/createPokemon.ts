import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import { PokemonObject } from '../../types';

// Graph Querys
const ADD_POKEMON = gql`
  mutation createPokemon($input: CreatePokemonInput!) {
    createPokemon(input: $input) {
      pokemon {
        id
        name
        weight
        height
        statsId
        types
        sprites
      }
    }
  }
`;

const ADD_STATS = gql`
  mutation createStat($input: CreateStatInput!) {
    createStat(input: $input) {
      stat {
        id
        hp
        attack
        defense
        specialAttack
        specialDefense
        speed
      }
    }
  }
`;

const createPokemon = (pokemon: PokemonObject, mutate: any) => {
  const { id, name, weight, height, stats, types, sprites } = pokemon;
  // Object to hold the varibales for the newly added pokemon
  const pokemonObject = {
    input: {
      pokemon: {
        id,
        name,
        weight,
        height,
        statsId: id,
        types,
        sprites,
      },
    },
  };
  // Object to hold the variables for the newly added pokemons stats
  const statObject = {
    input: {
      stat: {
        id: id,
        hp: stats.hp,
        attack: stats.attack,
        defense: stats.defense,
        specialAttack: stats.special_attack,
        specialDefense: stats.special_defense,
        speed: stats.speed,
      },
    },
  };
  // Create the stats first (it doesnt depend on the pokemon)
  mutate({ mutation: ADD_STATS, variables: statObject })
    .then((response: any) => {
      console.log(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
  // Create the pokemon
  mutate({ mutation: ADD_POKEMON, variables: pokemonObject })
    .then((response: any) => {
      console.log(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export default createPokemon;
