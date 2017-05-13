import React, { Component } from 'react';
import { View } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button } from 'react-native-elements';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const mutation = gql`
  mutation AddLyricToSong($songId: ID!, $content: String) {
    createLyric(songId: $songId, content: $content) {
      song {
        id
        lyrics {
          id
          content
          likes
        }
      }
    }
  }
`;

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', error: '' };
  }

  onChangeText = (content) => {
    this.setState({ content });
  }

  onButtonPress = () => {
    this.props.mutate({
      variables: {
        songId: this.props.songId,
        content: this.state.content,
      },
    })
      .then(() => { this.setState({ content: '', error: '' }); })
      .catch((err) => { this.setState({ error: err }); });
  }

  render() {
    return (
      <View>
        <FormLabel>Add a Lyric</FormLabel>
        <FormInput
          value={this.state.content}
          onChangeText={this.onChangeText}
        />
        <FormValidationMessage>{this.state.error}</FormValidationMessage>
        <Button
          title="Submit"
          onPress={this.onButtonPress}
          backgroundColor="grey"
          icon={{ name: 'done' }}
          disabled={this.state.content === ''}
        />
      </View>
    );
  }
}

export default graphql(mutation)(LyricCreate);
