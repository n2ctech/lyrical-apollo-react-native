import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { graphql } from 'react-apollo';

import LyricCreate from '../components/LyricCreate';
import LyricList from '../components/LyricList';

import fetchSong from '../queries/fetchSong';

const styles = {
  containerStyle: {
  },
};

class SongDetailScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { Song } = this.props.data;
    if (!Song) { return <View />; }
    if (Song.lyrics.length < 1) { return <LyricCreate songId={Song.id} />; }

    return (
      <ScrollView style={styles.containerStyle}>
        <LyricList lyrics={Song.lyrics} />
        <LyricCreate songId={Song.id} />
      </ScrollView>
    );
  }
}

export default graphql(fetchSong, {
  options: ({navigation}) => {
    return { variables: { id: navigation.state.params.id } };
  },
})(SongDetailScreen);
