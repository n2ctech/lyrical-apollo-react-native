import gql from 'graphql-tag';

export default gql`
  query SongQuery($id: ID!) {
    Song(id: $id) {
      id
      title
  		lyrics {
        id
        content
        likes
      }
    }
  }
`;
