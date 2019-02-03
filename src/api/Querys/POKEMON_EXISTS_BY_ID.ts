import gql from 'graphql-tag';

export default gql`
  query pokemonById($id: Int!) {
    pokemonById(id: $id) {
      id
    }
  }
`;
