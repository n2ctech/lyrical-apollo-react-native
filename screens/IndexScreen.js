import React, { Component } from 'react';
import { View, Text, ScrollView, ListView } from 'react-native';
import { Icon, List } from 'react-native-elements';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import SongListItem from '../components/SongListItem';
import query from '../queries/fetchSongs';

const mutation = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const styles = {
  containerStyle: {
    flex: 1,
  },
  buttonPosition: {
    position: "absolute",
    bottom: 3,
    right: 3,
  },
};

class IndexScreen extends Component {
  static navigationOptions = {
    title: 'Song List',
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = this.state;
    this.setState({
      dataSource: dataSource.cloneWithRows(nextProps.data.songs),
    });
  }

  renderRow = (rowData) => {
    return (
      <SongListItem
        song={rowData}
        onSongPress={this.navigateToSongDetailScreen}
        onSongDelete={this.onSongDelete}
      />
    );
  }

  navigateToNewSongScreen = () => {
    this.props.navigation.navigate('newSong');
  }

  navigateToSongDetailScreen = (id, title) => {
    this.props.navigation.navigate('songDetail', { id, title });
  }

  onSongDelete = (id) => {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderButton = () => {
    return (
      <View style={styles.buttonPosition}>
        <Icon
          reverse
          name="playlist-add"
          color="#517fa4"
          onPress={this.navigateToNewSongScreen}
        />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) { return <Text>Loading...</Text>; }
    if (this.props.data.songs.length < 1) {
      return (
        <View style={styles.containerStyle}>
          <Text>No Song in List... Add one by clicking the button bellow!</Text>
          {this.renderButton()}
        </View>
      );
    }

    return (
      <View style={styles.containerStyle}>
        <ScrollView>
          <List>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
          </List>
        </ScrollView>
        {this.renderButton()}
      </View>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(IndexScreen)
);
