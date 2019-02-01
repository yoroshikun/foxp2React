import gql from 'graphql-tag';

export default gql`
  query allPokemons($filter: PokemonFilter!) {
    allPokemons(filter: $filter) {
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

// Reference on how to write the filter property
/* {
  "filter": {
    "id": {
      "in": [1,2,3]
    }
  }
} */
//
