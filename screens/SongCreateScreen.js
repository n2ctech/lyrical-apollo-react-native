import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage,
} from 'react-native-elements';

import query from '../queries/fetchSongs';
const mutation = gql`
  mutation AddSong($title: String) {
    createSong(title: $title) {
      id
      title
    }
  }
`;

class SongCreateScreen extends Component {
  static navigationOptions = {
    title: 'Add new song',
  }

  state = { title: '', error: '' }

  onChangeText = (text) => {
    this.setState({ title: text, error: '' });
  };

  onMutationComplete = () => {
    this.setState({ title: '', error: '' });
    this.props.navigation.goBack();
  };

  onButtonPress = () => {
    this.props.mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query }],
    }).then(this.onMutationComplete())
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <View>
        <FormLabel>Song Title</FormLabel>
        <FormInput onChangeText={this.onChangeText} value={this.state.title} />
        <FormValidationMessage>{this.state.error}</FormValidationMessage>
        <Button
          title="Submit"
          onPress={this.onButtonPress}
          backgroundColor="grey"
          icon={{ name: 'done' }}
          disabled={this.state.title === ''}
        />
      </View>
    );
  }
}

export default graphql(mutation)(SongCreateScreen);
