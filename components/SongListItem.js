import React, { Component } from 'react';
import { ListItem, Icon } from 'react-native-elements';

class SongListItem extends Component {

  onSongPress = () => {
    if (!this.props.onSongPress) { return; }
    this.props.onSongPress(this.props.song.id, this.props.song.title);
  }

  onSongDelete = () => {
    if (!this.props.onSongDelete) { return; }
    this.props.onSongDelete(this.props.song.id);
  }

  render() {
    const { id, title } = this.props.song;

    return (
      <ListItem
        key={id}
        title={title}
        onPress={this.onSongPress}
        badge={{
          element: <Icon color="grey" onPress={this.onSongDelete} name="delete" />,
        }}
      />
    );
  }
}

export default SongListItem;
