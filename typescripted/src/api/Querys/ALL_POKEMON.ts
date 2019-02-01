import gql from 'graphql-tag';

export default gql`
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
