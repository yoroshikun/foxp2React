import gql from 'graphql-tag';

export default gql`
  {
    allPokemons {
      edges {
        node {
          id
          name
          sprites
        }
      }
    }
  }
`;
