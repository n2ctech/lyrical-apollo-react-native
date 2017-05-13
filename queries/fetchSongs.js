import gql from 'graphql-tag';

export default gql`
  {
    songs: allSongs {
      id
      title
    }
  }
`;
