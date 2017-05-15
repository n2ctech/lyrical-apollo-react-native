import Expo from 'expo';
import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { StackNavigator } from 'react-navigation';

import IndexScreen from './screens/IndexScreen';
import SongCreateScreen from './screens/SongCreateScreen';
import SongDetailScreen from './screens/SongDetailScreen';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'graphql endpoint' }),
    dataIdFromObject: o => o.id,
  });

class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
      songs: { screen: IndexScreen },
      newSong: { screen: SongCreateScreen },
      songDetail: { screen: SongDetailScreen },
    });

    return (
      <ApolloProvider client={client}>
        <MainNavigator />
      </ApolloProvider>
    );
  }
}

Expo.registerRootComponent(App);
