import gql from 'graphql-tag';

export default gql`
  query allTrainerPokemons($filter: TrainerPokemonFilter!) {
    allTrainerPokemons(filter: $filter) {
      edges {
        node {
          pokemonByPokemonId {
            id
            name
          }
        }
      }
    }
  }
`;

/*
{
  "filter": {
    "trainerId": {
      "in": [1]
    }
  }
}
*/
