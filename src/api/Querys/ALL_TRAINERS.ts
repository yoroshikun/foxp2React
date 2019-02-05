import gql from 'graphql-tag';

export default gql`
  {
    allTrainers {
      edges {
        node {
          id
          name
          status
        }
      }
    }
  }
`;
