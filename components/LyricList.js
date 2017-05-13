import React, { Component } from 'react';
import { ListView } from 'react-native';
import { List } from 'react-native-elements';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import LyricListItem from './LyricListItem';

const mutation = gql`
  mutation LikeLyric($id: ID!, $likes: Int) {
    updateLyric(id: $id, likes: $likes) {
  		id
      likes
    }
  }
`;

class LyricList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.lyrics),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = this.state;
    this.setState({
      dataSource: dataSource.cloneWithRows(nextProps.lyrics),
    });
  }

  onLyricLike = (id, likes) => {
    this.props.mutate({
      variables: {
        id,
        likes: likes + 1,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }

  renderRow = (rowData) => {
    return <LyricListItem lyric={rowData} onLike={this.onLyricLike} />;
  }

  render() {
    return (
      <List>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </List>
    );
  }
}

export default graphql(mutation)(LyricList);
