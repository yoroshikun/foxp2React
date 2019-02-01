import gql from 'graphql-tag';

export default gql`
  query pokemonById($id: Int!) {
    pokemonById(id: $id) {
      id
      name
      height
      statByStatsId {
        hp
        attack
        defense
        specialAttack
        specialDefense
        speed
      }
      types
      sprites
    }
  }
`;
