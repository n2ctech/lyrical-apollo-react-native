import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

class LyricListItem extends Component {

  onSongPress = () => {
    if (!this.props.onSongPress) { return; }
    this.props.onSongPress(this.props.lyric.id, this.props.lyric.content);
  }

  onLike = () => {
    if (!this.props.onLike) { return; }
    const { id, likes } = this.props.lyric;
    this.props.onLike(id, likes);
  }

  render() {
    const { id, content, likes } = this.props.lyric;

    return (
      <ListItem
        key={id}
        subtitle={content}
        onPress={this.onLike}
        rightIcon={{ name: 'thumb-up', style: { marginRight: 10} }}
        badge={{
          value: likes,
        }}
      />
    );
  }
}

export default LyricListItem;
