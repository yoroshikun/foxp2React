import gql from 'graphql-tag';

export default gql`
  {
    allTrainers {
      edges {
        node {
          id
          name
          status
          trainerPokemonsByTrainerId {
            edges {
              node {
                pokemonByPokemonId {
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
        }
      }
    }
  }
`;
