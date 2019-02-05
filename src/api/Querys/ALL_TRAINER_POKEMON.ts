import gql from 'graphql-tag';

export default gql`
  {
    allTrainerPokemons {
      edges {
        node {
          pokemonId
          trainerId
        }
      }
    }
  }
`;
